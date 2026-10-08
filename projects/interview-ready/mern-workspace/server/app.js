import express from 'express';
import {randomBytes,createHash,scrypt as scryptCallback,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {ApiError,fail,credentials,task,bookmark,expense} from './validation.js';
const scrypt=promisify(scryptCallback);
const options={N:32768,r:8,p:1,maxmem:64*1024*1024};
const digest=value=>createHash('sha256').update(value).digest('hex');
async function hashPassword(password) {
  const salt=randomBytes(16).toString('hex');
  return `${salt}:${(await scrypt(password,salt,64,options)).toString('hex')}`;
}
async function checkPassword(password,encoded) {
  const [salt,hex]=encoded.split(':');
  const actual=await scrypt(password,salt,64,options);
  const expected=Buffer.from(hex,'hex');
  return actual.length===expected.length && timingSafeEqual(actual,expected);
}
function tokenFrom(req) {
  const match=req.headers.cookie?.match(/(?:^|;\s*)session=([a-f0-9]{64})(?:;|$)/);
  return match?.[1];
}
// Deliberately per-process. Use a shared limiter when deploying multiple instances.
function authLimiter() {
  const entries=new Map();
  return (req,res,next)=>{
    const now=Date.now(), key=req.ip;
    for (const [ip,entry] of entries) if (entry.until<=now) entries.delete(ip);
    let entry=entries.get(key);
    if (!entry) {
      if (entries.size>=10000) return res.status(429).json({error:'RATE_LIMIT',message:'Try again later'});
      entry={count:0,until:now+60000}; entries.set(key,entry);
    }
    if (++entry.count>20) return res.status(429).json({error:'RATE_LIMIT',message:'Try again later'});
    next();
  };
}
export function createApp({store,origin,secureCookies=false,staticDir}) {
  const app=express(); app.disable('x-powered-by');
  app.use((req,res,next)=>{
    res.set({'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','X-Frame-Options':'DENY'});
    if (staticDir) res.set('Content-Security-Policy',"default-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
    if (req.path.startsWith('/api')) res.set('Cache-Control','no-store');
    next();
  });
  app.use('/api',(req,res,next)=>{
    if (!['GET','HEAD','OPTIONS'].includes(req.method)) {
      if (req.get('origin')!==origin) return res.status(403).json({error:'ORIGIN',message:'Write requests require the configured application Origin'});
      if (['POST','PATCH','PUT'].includes(req.method) && !req.is('application/json')) return res.status(415).json({error:'CONTENT_TYPE',message:'JSON is required'});
    }
    next();
  });
  app.use(express.json({limit:'16kb'}));
  app.get('/api/health',(req,res)=>res.json({ok:true}));
  const cookieOptions={httpOnly:true,sameSite:'strict',secure:secureCookies,path:'/'};
  async function signIn(res,user) {
    const token=randomBytes(32).toString('hex');
    await store.createSession(digest(token),user);
    res.cookie('session',token,{...cookieOptions,maxAge:86400_000});
    return user;
  }
  const limit=authLimiter();
  app.post('/api/auth/register',limit,async(req,res)=>{
    const {email,password}=credentials(req.body);
    const user=await store.createUser(email,await hashPassword(password));
    res.status(201).json(await signIn(res,user));
  });
  app.post('/api/auth/login',limit,async(req,res)=>{
    const {email,password}=credentials(req.body);
    const row=await store.userByEmail(email);
    // Perform equivalent hash work for an unknown account to reduce a simple timing signal.
    const valid=row ? await checkPassword(password,row.passwordHash) : (await hashPassword(password), false);
    if (!valid) fail(401,'LOGIN','Invalid email or password');
    const oldToken=tokenFrom(req); if (oldToken) await store.revoke(digest(oldToken));
    res.json(await signIn(res,{id:row._id.toHexString(),email:row.email}));
  });
  app.post('/api/auth/logout',async(req,res)=>{
    const token=tokenFrom(req); if (token) await store.revoke(digest(token));
    res.clearCookie('session',cookieOptions); res.status(204).end();
  });
  app.use('/api',async(req,res,next)=>{
    const token=tokenFrom(req), session=token && await store.session(digest(token));
    if (!session) return res.status(401).json({error:'AUTH',message:'Sign in to continue'});
    req.user=session.user; next();
  });
  app.get('/api/auth/me',(req,res)=>res.json(req.user));
  for (const [kind,validate] of [['tasks',task],['bookmarks',bookmark],['expenses',expense]]) {
    app.get(`/api/${kind}`,async(req,res)=>res.json(await store.list(kind,req.user.id)));
    app.post(`/api/${kind}`,async(req,res)=>res.status(201).json(await store.create(kind,req.user.id,validate(req.body))));
    app.delete(`/api/${kind}/:id`,async(req,res)=>{await store.remove(kind,req.user.id,req.params.id);res.status(204).end();});
  }
  app.patch('/api/tasks/:id',async(req,res)=>res.json(await store.updateTask(req.user.id,req.params.id,task(req.body,true))));
  app.get('/api/expenses-summary',async(req,res)=>res.json(await store.expenseSummary(req.user.id)));
  app.use('/api',(req,res)=>res.status(404).json({error:'NOT_FOUND',message:'Unknown API route'}));
  if (staticDir) app.use(express.static(staticDir));
  app.use((error,req,res,next)=>{
    if (res.headersSent) return next(error);
    if (error.code===11000) return res.status(409).json({error:'DUPLICATE',message:'This account or URL already exists'});
    if (error instanceof ApiError) return res.status(error.status).json({error:error.code,message:error.message});
    if (error.type==='entity.parse.failed') return res.status(400).json({error:'JSON',message:'Malformed JSON'});
    if (error.type==='entity.too.large') return res.status(413).json({error:'SIZE',message:'Request body too large'});
    console.error('Unexpected API error:',error.name);
    res.status(500).json({error:'INTERNAL',message:'Unexpected server error'});
  });
  return app;
}
