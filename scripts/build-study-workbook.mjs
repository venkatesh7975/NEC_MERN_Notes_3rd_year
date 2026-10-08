import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data=JSON.parse(await fs.readFile(path.join(root,'interview-handbook/data/study-data.json'),'utf8'));
const resources=JSON.parse(await fs.readFile(path.join(root,'interview-handbook/resources/catalog.json'),'utf8'));
const wb=Workbook.create();
const summary=wb.worksheets.add('Summary'),questions=wb.worksheets.add('Questions'),machine=wb.worksheets.add('Machine coding'),roadmap=wb.worksheets.add('Roadmap'),links=wb.worksheets.add('Resources');
function setup(sheet,title,headers,rows,widths) {
  sheet.showGridLines=false;sheet.getRange('A2').values=[[title]];sheet.getRange('A2').format.font={name:'Calibri',size:20,bold:true,color:'#172945'};sheet.getRange('A2').format.rowHeight=38;
  const end=String.fromCharCode(64+headers.length),last=rows.length+5;
  sheet.getRange(`A5:${end}5`).values=[headers];sheet.getRange(`A6:${end}${last}`).values=rows;
  sheet.getRange(`A5:${end}${last}`).format.font={name:'Calibri',size:11,color:'#172945'};
  sheet.getRange(`A5:${end}${last}`).format.verticalAlignment='center';sheet.getRange(`A5:${end}${last}`).format.wrapText=true;
  sheet.getRange(`A5:${end}5`).format={fill:'#214EA2',font:{name:'Calibri',size:11,bold:true,color:'#FFFFFF'},rowHeight:38};
  sheet.getRange(`A6:${end}${last}`).format.rowHeight=66;
  for(let i=0;i<widths.length;i++)sheet.getRange(`${String.fromCharCode(65+i)}5:${String.fromCharCode(65+i)}${last}`).format.columnWidth=widths[i];
  for(let row=6;row<=last;row+=2)sheet.getRange(`A${row}:${end}${row}`).format.fill='#F1F5FB';
  sheet.freezePanes.freezeRows(5);sheet.freezePanes.freezeColumns(1);
}
setup(questions,'Question recall tracker',['ID','Topic','Difficulty','Question','Score 0 to 3','Status','Last reviewed','Next review','Evidence or weakness'],data.questions.map(q=>[q.id,q.topic,q.difficulty,q.question,null,'Not started',null,null,'']),[10,24,14,64,17,19,19,19,45]);
questions.getRange('A3').values=[['Score 0 cannot explain, 1 definition only, 2 correct with example, 3 tradeoff and failure case. Editable fields are pale amber.']];
questions.getRange('E6:G105').format.fill='#FFF4D5';questions.getRange('I6:I105').format.fill='#FFF4D5';
questions.getRange('E6:E105').dataValidation={rule:{type:'whole',operator:'between',formula1:0,formula2:3}};
questions.getRange('F6:F105').dataValidation={rule:{type:'list',values:['Not started','In progress','Reviewed']}};
questions.getRange('G6:H105').setNumberFormat('yyyy-mm-dd');
questions.getRange('H6:H105').formulas=data.questions.map((_,i)=>[`=IF(G${i+6}="","",G${i+6}+Summary!$B$4)`]);
setup(machine,'Timed machine coding attempts',['ID','Difficulty','Suggested minutes','Exercise','Score out of 100','Status','Attempt date','Evidence and next action'],data.machine.map(m=>[m.id,m.level,m.minutes,m.title,null,'Not started',null,'']),[10,15,23,40,22,20,20,65]);
machine.getRange('A3').values=[['Use the handbook rubric; a score is supported by acceptance evidence.']];
machine.getRange('E6:H21').format.fill='#FFF4D5';machine.getRange('E6:E21').dataValidation={rule:{type:'whole',operator:'between',formula1:0,formula2:100}};
machine.getRange('F6:F21').dataValidation={rule:{type:'list',values:['Not started','In progress','Completed']}};machine.getRange('G6:G21').setNumberFormat('yyyy-mm-dd');
const weeks=[['Web and HTML','Trace a request and complete a semantic form'],['CSS and accessibility','Responsive layout at 320px and 200 percent zoom'],['JavaScript values and functions','Explain five outputs and an immutable update'],['Async and algorithms','Utility tests and explicit failure behavior'],['React state','Explain owners and preserve form drafts'],['React async and coding','Latest query wins in a timed build'],['Node and Express','Protected API rejects invalid requests'],['MongoDB','Real concurrent write and index evidence'],['Security and integration','Two-user isolation and session revocation'],['Testing and delivery','Clean build and browser failure recovery'],['Design and company prep','Project trace and a justified alternative'],['Mock interviews','Redo one observed weak exercise']];
setup(roadmap,'Twelve week study plan',['Week','Focus','Exit evidence','Status','Your next action'],weeks.map(([focus,exit],i)=>[i+1,focus,exit,'Not started','']),[10,35,70,20,55]);roadmap.getRange('D6:E17').format.fill='#FFF4D5';roadmap.getRange('D6:D17').dataValidation={rule:{type:'list',values:['Not started','In progress','Completed']}};
setup(links,'Learning resources reviewed 2026-10-08',['Topic','Resource','URL','Level','Access','Use'],resources.map(r=>[r.topic,r.name,r.url,r.level,r.access,r.use]),[23,42,85,30,40,75]);links.getRange('A3').values=[['Sources are the linked publishers. Pricing and availability can change; consult the repository catalog for partial checks.']];
summary.showGridLines=false;summary.tabColor='#214EA2';summary.getRange('A2').values=[['MERN preparation progress']];summary.getRange('A2').format.font={name:'Calibri',size:22,bold:true,color:'#172945'};summary.getRange('A2').format.rowHeight=42;
summary.getRange('A4:B4').values=[['Next review interval days',3]];summary.getRange('B4').format.fill='#FFF4D5';summary.getRange('B4').dataValidation={rule:{type:'whole',operator:'between',formula1:1,formula2:30}};
summary.getRange('A6:B10').values=[['Questions in bank',data.questions.length],['Questions scored',null],['Questions with score 2 or 3',null],['Timed exercises attempted',null],['Weeks marked completed',null]];
summary.getRange('B7:B10').formulas=[['=COUNT(Questions!E6:E105)'],['=COUNTIFS(Questions!E6:E105,">=2")'],["=COUNT('Machine coding'!E6:E21)"],['=COUNTIFS(Roadmap!D6:D17,"Completed")']];
summary.getRange('A13:C16').values=[['Difficulty','Questions','Score 2 or 3'],['Easy',null,null],['Medium',null,null],['Hard',null,null]];
summary.getRange('B14:C16').formulas=['Easy','Medium','Hard'].map((_,i)=>[`=COUNTIFS(Questions!C6:C105,A${i+14})`,`=COUNTIFS(Questions!C6:C105,A${i+14},Questions!E6:E105,">=2")`]);
summary.getRange('A19').values=[['Record observed behavior and review weak answers. Scores do not predict company selection.']];
summary.getRange('A4:C19').format.font={name:'Calibri',size:11,color:'#172945'};summary.getRange('A4:A19').format.columnWidth=45;summary.getRange('B4:C19').format.columnWidth=22;summary.getRange('A13:C13').format={fill:'#214EA2',font:{bold:true,color:'#FFFFFF'},rowHeight:30};summary.getRange('A4:C19').format.rowHeight=28;
wb.recalculate();
// Perturb one input to prove dependent summaries recalculate, then restore it.
questions.getRange('E6').values=[[2]];wb.recalculate();
if(summary.getRange('B7').values[0][0]!==1||summary.getRange('B8').values[0][0]!==1)throw new Error('Recall summary did not recalculate');
questions.getRange('E6').values=[[null]];wb.recalculate();
console.log((await wb.inspect({kind:'region',sheetId:'Summary',range:'A6:C16',maxChars:2000,tableMaxRows:11,tableMaxCols:3})).ndjson);
const previewDir=path.join(root,'tmp/workbook');await fs.mkdir(previewDir,{recursive:true});
for(const [sheetName,range] of [['Summary','A1:C19'],['Questions','A1:I10'],['Machine coding','A1:H10'],['Roadmap','A1:E10'],['Resources','A1:F10']]){
  const preview=await wb.render({sheetName,range,scale:1.5,format:'png'});
  await fs.writeFile(path.join(previewDir,`${sheetName.replaceAll(' ','-')}.png`),new Uint8Array(await preview.arrayBuffer()));
}
const output=await SpreadsheetFile.exportXlsx(wb);await output.save(path.join(root,'interview-handbook/downloads/mern-preparation-tracker.xlsx'));
console.log('Exported tracker with 100 questions, 16 exercises, 12 weeks, 28 resources, validation and live summaries.');
