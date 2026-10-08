const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8').replaceAll('\r\n','\n');
const json=p=>JSON.parse(read('knowledge-base/data/'+p+'.json'));
const catalog=json('catalog'),paths=json('paths'),projects=json('projects'),inventory=json('legacy-inventory');
const indexed=(items,label)=>{const map=new Map();for(const item of items){assert.ok(item.id,`${label} missing id`);assert.ok(!map.has(item.id),`${label} duplicate ${item.id}`);map.set(item.id,item);}return map;};
const guides=indexed(catalog.guides,'guide'),concepts=indexed(catalog.concepts,'concept'),resources=indexed(catalog.resources,'resource');
indexed(paths,'path');indexed(projects,'project');assert.equal(catalog.schemaVersion,1);
const exists=p=>{assert.ok(typeof p==='string'&&!path.isAbsolute(p)&&!p.split('/').includes('..'),'Unsafe catalog path');assert.ok(fs.existsSync(path.join(root,p)),`Missing ${p}`);};
const date=value=>assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value)),`Invalid date ${value}`);
const meta=item=>{assert.ok(Object.hasOwn(catalog.priorities,item.priority),`${item.id}: invalid priority`);assert.ok(['Beginner','Intermediate','Advanced'].includes(item.difficulty));assert.ok(Number.isInteger(item.importance)&&item.importance>=1&&item.importance<=5);date(item.lastVerified);exists(item.path);};
const sections=['🎯 Learning Objectives','🧠 What Is It?','❓ Why Does It Exist?','⚙️ How Does It Work?','💻 Examples','🔍 Under the Hood','🌍 Real-World Usage','⚠️ Common Mistakes','✅ Best Practices','🧪 Practice','🏗️ Mini Project','💼 Interview Questions','🔗 Related Concepts','🥇 Official Documentation','📘 Recommended Articles','🎥 Recommended YouTube Videos','🧪 Practice Resources','📚 Further Reading','🔄 Last Verified'];
for(const g of guides.values()){
  meta(g);assert.ok(g.estimatedMinutes>0);const text=read(g.path);
  assert.deepEqual(JSON.parse(text.match(/^<!-- kb-metadata: (.+) -->/)[1]),g,`${g.id}: metadata drift`);
  for(const section of sections)assert.ok(text.includes('## '+section+'\n'),`${g.id}: missing ${section}`);
  assert.ok((text.match(/<summary>/g)||[]).length>=8,`${g.id}: answered question categories`);
  for(const id of [...g.prerequisites,...g.related])assert.ok(guides.has(id),`${g.id}: unresolved guide ${id}`);
  for(const id of g.conceptIds)assert.equal(concepts.get(id)?.area,g.id,`${g.id}: mismatched concept`);
  assert.deepEqual(new Set(g.conceptIds),new Set(catalog.concepts.filter(c=>c.area===g.id).map(c=>c.id)));
  for(const legacy of g.legacyPaths){exists(legacy);assert.ok(read(legacy).includes('kb-legacy:'),`${legacy}: no migration navigation`);}
}
const visited=new Set(),active=new Set();
function visit(id){assert.ok(!active.has(id),`Prerequisite cycle at ${id}`);if(visited.has(id))return;active.add(id);for(const next of guides.get(id).prerequisites)visit(next);active.delete(id);visited.add(id);}
for(const id of guides.keys())visit(id);
for(const c of concepts.values()){
  meta(c);assert.ok(guides.has(c.area));assert.ok(c.definition.length>20);assert.ok(Object.hasOwn(catalog.depthDefinitions,c.depth));
  assert.ok(read(c.path).includes(`<a id="${c.anchor}"></a>`),`${c.id}: absent anchor`);
  for(const id of [...c.prerequisites,...c.related])assert.ok(guides.has(id),`${c.id}: unresolved edge`);
  for(const id of c.resourceIds)assert.ok(resources.has(id),`${c.id}: absent resource`);
}
for(const r of resources.values()){assert.ok(['https:','http:'].includes(new URL(r.url).protocol));assert.ok(guides.has(r.area));date(r.lastVerified);assert.ok(r.bestFor&&r.verification&&r.versionPolicy);}
for(const route of paths){exists(route.path);assert.ok(route.exitEvidence);for(const id of route.guideIds)assert.ok(guides.has(id),`${route.id}: absent guide`);}
for(const p of projects){exists(p.path);assert.ok(['implemented-learning','foundation-implemented','specification'].includes(p.status));if(p.status!=='specification'){exists(p.sourcePath+'/README.md');assert.ok(fs.readdirSync(path.join(root,p.sourcePath)).some(f=>/\.(js|json)$/.test(f)),'Source status without implementation');}else assert.equal(p.sourcePath,null);for(const heading of ['Requirements','Features','Architecture','Database schema','API specification','Folder structure','Implementation','Testing','Deployment','Future improvements'])assert.ok(read(p.path).includes('## '+heading+'\n'),`${p.id}: absent ${heading}`);}
assert.equal(inventory.fileCount,inventory.files.length);for(const file of inventory.files)exists(file.path);
const required=json('coverage-requirements');
for(const group of required.groups){for(const requirement of group.concepts){const key=requirement.toLowerCase();const aliases=required.aliases[key]??[key];assert.ok(catalog.concepts.some(c=>group.areas.includes(c.area)&&aliases.includes(c.title.toLowerCase())),`${group.name}: unmapped ${requirement}`);}}
const coverage=read('knowledge-base/COVERAGE.md');
for(const g of guides.values()){const items=catalog.concepts.filter(c=>c.area===g.id),n=items.filter(c=>c.depth==='worked-example').length;assert.ok(coverage.includes(`| ${items.length} | ${n} | ${items.length-n} | ${Math.round(n/items.length*100)}% |`),`${g.id}: coverage drift`);}
const cheat=fs.readdirSync(path.join(root,'knowledge-base/cheatsheets')).filter(p=>p.endsWith('.md')&&p!=='README.md');assert.equal(cheat.length,17);
assert.equal((read('knowledge-base/diagrams/README.md').match(/```mermaid/g)||[]).length,10);
for(const file of fs.readdirSync(path.join(root,'knowledge-base/debugging')).filter(p=>p!=='README.md'&&p.endsWith('.md'))){for(const heading of ['Broken code','Expected behavior','Actual behavior','Hints','Solution','Explanation','Root cause','How to prevent it'])assert.ok(read('knowledge-base/debugging/'+file).toLowerCase().includes(heading.toLowerCase()),`${file}: missing ${heading}`);}
console.log(`PASS: ${guides.size} guides, ${concepts.size} concepts, ${resources.size} resources, ${paths.length} paths, ${projects.length} project packets; metadata, sections, graph, master-prompt coverage, depth counts, and ${inventory.fileCount} preserved paths.`);
