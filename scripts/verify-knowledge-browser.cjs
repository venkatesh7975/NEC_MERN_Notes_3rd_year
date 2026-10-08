// Optional integration check: npm install --no-save playwright, then install a browser.
// BROWSER_CHANNEL=msedge uses an installed Edge; otherwise Playwright Chromium is used.
const {chromium}=require('playwright');
const {createServer}=require('node:http');
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.md':'text/plain','.svg':'image/svg+xml'};
const server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost'),relative=decodeURIComponent(url.pathname).replace(/^\//,'');let file=path.resolve(root,relative);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}if((await fs.stat(file)).isDirectory())file=path.join(file,'index.html');res.setHeader('Content-Type',types[path.extname(file)]??'application/octet-stream');res.end(await fs.readFile(file));}catch{res.writeHead(404);res.end();}});
const contains=async(page,id,text)=>{await page.waitForFunction(({id,text})=>document.getElementById(id)?.textContent.includes(text),{id,text});};
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url=`http://127.0.0.1:${server.address().port}`;let browser;
  try{
    browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
    const context=await browser.newContext({viewport:{width:1280,height:900},acceptDownloads:true});const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(url+'/knowledge-base/explorer.html');await contains(page,'count','375 of 375');
    await page.keyboard.press('Tab');assert.equal(await page.locator('.skip').evaluate(n=>n===document.activeElement),true);await page.keyboard.press('Enter');
    await page.locator('#priority').selectOption('P4');await contains(page,'count','1 of 375');assert.match(await page.locator('#results').innerText(),/TC39/);
    await page.locator('#priority').selectOption('');await page.locator('#area').selectOption('async');await page.locator('#search').fill('Promises');await contains(page,'count','1 of 375');
    await page.getByRole('button',{name:'Read Promises',exact:true}).click();await page.waitForSelector('#reader pre');assert.match(await page.locator('#reader').innerText(),/Why Does It Exist/);assert.equal(await page.locator('#reader strong').count()>0,true);
    await page.getByRole('checkbox',{name:'Reviewed Promises (async)',exact:true}).check();await page.reload();await contains(page,'count','375 of 375');await page.locator('#progress-filter').selectOption('reviewed');await contains(page,'count','1 of 375');
    const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise,csv=await fs.readFile(await download.path(),'utf8');assert.equal(csv.trim().split('\r\n').length,376);assert.match(csv,/async--promises/);
    await fs.mkdir(path.join(root,'tmp/knowledge-browser'),{recursive:true});await page.screenshot({path:path.join(root,'tmp/knowledge-browser/explorer-desktop.png')});
    await page.goto(url+'/projects/knowledge-base/learning-lab/');await page.waitForSelector('#quiz fieldset');
    await page.locator('#calculator [name=left]').fill('1.5');await page.locator('#calculator [name=operator]').selectOption('*');await page.locator('#calculator [name=right]').fill('2');await page.locator('#calculator button').click();await contains(page,'calculation','Result: 3');
    await page.locator('#calculator [name=operator]').selectOption('/');await page.locator('#calculator [name=right]').fill('0');await page.locator('#calculator button').click();await contains(page,'calculation','zero');assert.equal(await page.locator('#calculator [name=left]').inputValue(),'1.5');
    await page.locator('#todo-form input').fill('Boundary task');await page.locator('#todo-form input').press('Enter');assert.equal(await page.locator('#todos li').count(),1);
    await page.getByRole('button',{name:'Toggle Boundary task',exact:true}).click();await page.locator('#todo-filter').selectOption('active');assert.equal(await page.locator('#todos li').count(),0);await page.locator('#todo-filter').selectOption('done');assert.equal(await page.locator('#todos li').count(),1);
    await page.getByRole('button',{name:'Delete task Boundary task',exact:true}).click();assert.equal(await page.locator('#undo').evaluate(n=>n===document.activeElement),true);await page.locator('#undo').click();assert.equal(await page.locator('#todos li').count(),1);
    for(const id of ['q1','q2','q3'])await page.locator(`#quiz input[name=${id}][value="1"]`).check();await page.locator('#quiz button').click();await contains(page,'quiz-status','Score: 3/3');await page.locator('#quiz-reset').click();assert.equal(await page.locator('#quiz input:checked').count(),0);
    await page.locator('#weather button').click();await contains(page,'weather-status','22.5');
    await page.route('https://api.open-meteo.com/**',async route=>{const lat=new URL(route.request().url()).searchParams.get('latitude');if(lat==='10')await new Promise(r=>setTimeout(r,250));try{await route.fulfill({json:lat==='30'?{broken:true}:{current:{temperature_2m:Number(lat),time:'fixture'}}});}catch{}});
    await page.locator('#weather [name=mode]').selectOption('live');await page.locator('#weather [name=latitude]').fill('10');await page.locator('#weather button').click();await page.locator('#weather [name=latitude]').fill('20');await page.locator('#weather button').click();await contains(page,'weather-status','20 °C');await page.waitForTimeout(400);assert.match(await page.locator('#weather-status').innerText(),/^20 °C/);
    await page.locator('#weather [name=latitude]').fill('30');await page.locator('#weather button').click();await contains(page,'weather-status','unexpected shape');
    const title='<img src=x onerror="window.injected=true">';await page.locator('#note-form [name=title]').fill(title);await page.locator('#note-form textarea').fill('Plain text body');await page.locator('#note-form button').first().click();assert.equal(await page.locator('#notes img').count(),0);assert.equal(await page.evaluate(()=>window.injected),undefined);
    await page.reload();await page.waitForSelector('#notes li');assert.match(await page.locator('#notes').innerText(),/<img/);await page.locator('#notes button').first().click();assert.equal(await page.locator('#note-form textarea').inputValue(),'Plain text body');await page.locator('#notes button').last().click();assert.equal(await page.locator('#notes li').count(),0);
    for(const amount of ['0.10','0.20']){await page.locator('#expense-form [name=amount]').fill(amount);await page.locator('#expense-form button').click();}await contains(page,'expense-total','0.30');await page.locator('#expense-filter').selectOption('travel');await contains(page,'expense-total','0.00');await page.locator('#expense-filter').selectOption('');await page.locator('#expenses button').first().click();await contains(page,'expense-total','0.20');
    await page.screenshot({path:path.join(root,'tmp/knowledge-browser/learning-desktop.png'),fullPage:true});
    await page.setViewportSize({width:375,height:812});for(const pathname of ['/projects/knowledge-base/learning-lab/','/knowledge-base/explorer.html?guide=javascript#closures']){await page.goto(url+pathname);await page.waitForSelector(pathname.includes('explorer')?'#reader pre':'#quiz fieldset');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Mobile overflow: ${pathname}`);await page.screenshot({path:path.join(root,'tmp/knowledge-browser/'+(pathname.includes('explorer')?'explorer-mobile':'learning-mobile')+'.png'),fullPage:true});}
    const unavailable=await context.newPage();await unavailable.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error('Unavailable');};});await unavailable.goto(url+'/knowledge-base/explorer.html');await contains(unavailable,'count','375 of 375');await unavailable.locator('#results input').first().check();await contains(unavailable,'error','could not be saved');await unavailable.close();
    assert.deepEqual(errors,[]);console.log('PASS: browser filters, guides, progress/reload/export, storage failure, six apps, race/error recovery, safe notes, keyboard focus, mobile overflow, and no page errors. Weather used fixtures.');
  }finally{await browser?.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
