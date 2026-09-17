const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const errors = [];
const readText = file => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (['.git', 'node_modules', 'tmp', 'dist', '__pycache__'].includes(e.name)) return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const all = walk(root);
const markdown = all.filter(p => p.endsWith('.md'));
for (const file of markdown) {
  const text = readText(file).replace(/```[\s\S]*?```/g, '');
  for (const match of text.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1].replace(/^<|>$/g, '');
    if (/^(?:[a-z]+:|#|\/\/)/i.test(target)) continue;
    const filePart = target.split('#')[0].split('?')[0];
    if (!filePart) continue;
    let decoded;
    try { decoded = decodeURIComponent(filePart); } catch { errors.push('Invalid link: ' + target); continue; }
    const dest = path.resolve(path.dirname(file), decoded);
    if (!dest.startsWith(root + path.sep) && dest !== root) errors.push('Link leaves repository: ' + target);
    else if (!fs.existsSync(dest)) errors.push(path.relative(root, file) + ': missing ' + target);
  }
}
const map = JSON.parse(fs.readFileSync(path.join(root, 'resources/learning-map.json'), 'utf8'));
if (map.modules.length !== 10 || map.modules.reduce((sum, m) => sum + m.hours, 0) !== 120) errors.push('Official module/hour mismatch');
const projectSections = ['Difficulty','Technology','Learning Objectives','Problem Statement','Features','Functional Requirements','Technical Requirements','UI Requirements','API Requirements','Database Requirements','Validation Requirements','Expected Input','Expected Output','Edge Cases','Folder Structure','How to Run','Testing Checklist','Learning Outcomes','Extension Challenges','Interview Questions'];
const taskSections = ['Objective','Background','Problem statement','Requirements','Functional requirements','Technical requirements','Restrictions','Expected output','Example','Edge cases','Deliverables','Submission instructions','Evaluation criteria','Common mistakes','Bonus requirements','Learning outcomes'];
const ids = new Set();
let projectCount = 0, dayCount = 0;
const index = fs.readFileSync(path.join(root, 'PROJECT_INDEX.md'), 'utf8');
for (const track of map.tracks) {
  for (const target of [track.path+'/README.md',track.path+'/notes.md',track.dailyPractice+'/README.md',track.assignment+'/README.md',track.projects+'/README.md',track.capstone,track.interview]) {
    if (!fs.existsSync(path.join(root,target))) errors.push('Missing learning path: '+target);
  }
  const projects = markdown.filter(p => path.relative(root,p).replaceAll('\\','/').startsWith(track.projects + '/') && path.basename(p)==='README.md' && path.basename(path.dirname(p))!==track.id);
  if (projects.length !== 10) errors.push(track.id + ': expected 10 projects, got ' + projects.length);
  for (const p of projects) {
    projectCount++;
    const text = readText(p);
    const id = text.match(/^ID:\s*([^\.\s]+)/m)?.[1];
    if (!id || ids.has(id)) errors.push('Missing/duplicate ID: '+p);
    ids.add(id);
    if (!index.includes('| '+id+' |')) errors.push('Project absent from index: '+id);
    for (const section of projectSections) if (!text.includes('## '+section+'\n')) errors.push(id+': missing '+section);
    for(const name of ['requirements.md','task.md']) if(!fs.existsSync(path.join(path.dirname(p),name))) errors.push(id+': missing '+name);
  }
  for(let day=1;day<=3;day++) {
    const file=path.join(root,track.dailyPractice,'day-0'+day,'README.md');
    if(!fs.existsSync(file)){errors.push('Missing practice day: '+file);continue;}
    dayCount++;
    const text=readText(file);
    for(const h of ['Learning objective','Concepts','Difficulty','Coding exercises','Expected output','Challenge problem','Expected learning outcome'])
      if(!text.includes('## '+h+'\n')) errors.push(file+': missing '+h);
  }
}
for(const file of markdown.filter(p=>/tasks[\\/](?:course-|task-)\w/.test(p)&&path.basename(p)==='README.md')) {
 const text=readText(file);
 for(const section of taskSections) if(!text.toLowerCase().includes('## '+section.toLowerCase()+'\n')) errors.push(file+': missing '+section);
 for(const name of ['requirements.md','evaluation.md','submission.md']) if(!fs.existsSync(path.join(path.dirname(file),name))) errors.push(file+': missing '+name);
}
if(projectCount!==150)errors.push('Expected 150 project briefs, got '+projectCount);
if(errors.length){ console.error(errors.join('\n')); process.exitCode=1; }
else console.log('PASS: '+markdown.length+' Markdown files; internal file links; 10 modules/120 hours; '+projectCount+' project briefs; '+dayCount+' practice days; assignment sections.');
