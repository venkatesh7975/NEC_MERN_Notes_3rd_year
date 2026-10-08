import {MongoClient} from 'mongodb';
import {fileURLToPath} from 'node:url';
import {createApp} from './app.js';
import {MongoStore} from './store.js';
const uri=process.env.MONGODB_URI;
if (!uri || !process.env.APP_ORIGIN) throw new Error('Set MONGODB_URI and APP_ORIGIN using .env.example');
const port=Number(process.env.PORT??3000);
const origin=new URL(process.env.APP_ORIGIN).origin;
if (origin!==process.env.APP_ORIGIN) throw new Error('APP_ORIGIN must be an origin without a path or trailing slash');
const client=new MongoClient(uri,{serverSelectionTimeoutMS:5000});
await client.connect();
const store=new MongoStore(client.db(process.env.MONGODB_DATABASE??'mern_interview_workspace'));
await store.initialize();
const app=createApp({store,origin,secureCookies:origin.startsWith('https:'),staticDir:fileURLToPath(new URL('../dist/',import.meta.url))});
const server=app.listen(port,()=>console.log(`Workspace API at http://localhost:${port}`));
let closing=false;
function shutdown() {
  if (closing) return; closing=true;
  const deadline=setTimeout(()=>process.exit(1),10000); deadline.unref();
  server.close(async()=>{await client.close();clearTimeout(deadline);});
}
process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
