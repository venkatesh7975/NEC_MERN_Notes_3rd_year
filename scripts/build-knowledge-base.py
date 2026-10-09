"""Format authored lessons into Markdown, a concept graph, paths, and honest coverage."""
from pathlib import Path
from collections import Counter
import json,re,os
from kb_content import AREAS,DATE
import kb_backend,kb_engineering
import kb_practice
import kb_graph
ROOT=Path(__file__).resolve().parents[1];BASE=ROOT/'knowledge-base'
LABELS={'P0':'🔥 Essential / Master','P1':'⭐ Highly Important','P2':'📚 Useful','P3':'🧩 Advanced / Specialized','P4':'🔬 Reference / Experimental'}
def write(path,text):
    p=ROOT/path;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.rstrip()+'\n',encoding='utf-8')
def slug(value):return re.sub(r'[^a-z0-9]+','-',value.lower()).strip('-')
def links(ids):return ', '.join(f'[{AREAS[i]["title"]}]({i}.md)' for i in ids) or 'No programming prerequisites; basic file and browser use.'
# These concepts have direct worked examples in the guide. Other definitions are reference depth.
WORKED={
'foundations':['HTTP/HTTPS','APIs','JSON','Client-server architecture'],
'html':['Semantic HTML','Forms','Accessibility'],
'css':['Box model','Grid','Responsive design','Accessibility','Variables'],
'javascript':['Variables','Closures','Objects','Spread/rest','Functions'],
'async':['Promises','Event loop','Microtasks','Macrotasks'],
'browser':['DOM','Events'],
'typescript':['Types','Unions','Narrowing','TypeScript with React'],
'git':['Git fundamentals','Branching','Code review'],
'react':['State','useState','Events','Hooks'],
'state-management':['Local state','Server state','When to use which approach'],
'nextjs':['API routes'],
'nodejs':['ESM','Streams','File system'],
'express':['Routing','Validation','Authorization'],
'mongodb':['CRUD','Data modeling','Operators'],
'mongoose':['Schema','Models','Indexes'],
'sql':['CRUD','Constraints'],
'redis':['Caching'],
'api':['Error handling','Status codes'],
'security':['Authorization','Secrets'],
'realtime':['Server-Sent Events'],
'testing':['Unit testing'],
'devops':['Docker Compose'],
'cloud':['Deployment architecture'],
'engineering':['Dependency injection','Layered architecture'],
'system-design':['Consistency','Low-level design']}
LEGACY={'foundations':['01-foundations/notes.md'],'html':['notes/html.md','02-html/notes.md'],'css':['notes/css.md','03-css/notes.md'],'javascript':['notes/javascript.md','04-javascript/notes.md'],'react':['notes/react.md','05-react/notes.md'],'nodejs':['notes/node.md','06-nodejs/notes.md'],'express':['notes/express.md','07-express-rest/express/notes.md'],'mongodb':['notes/mongodb.md','08-databases/mongodb/notes.md'],'sql':['notes/mysql.md','08-databases/sql/notes.md'],'api':['notes/rest-api.md','07-express-rest/rest-api/notes.md'],'security':['notes/authentication.md','10-security/notes.md'],'devops':['notes/docker.md','notes/deployment.md','09-devops/notes.md'],'git':['notes/git.md']}
topics=[];guides=[];resources={}
for id,a in AREAS.items():
    cs=[]
    for line in a['concepts'].strip().splitlines():
        name,priority,definition=line.split('|',2);cid=f'{id}--{slug(name)}';depth='worked-example' if name in set(WORKED.get(id,[]))|kb_practice.example_names(id) else 'reference'
        c=dict(id=cid,title=name,area=id,priority=f'P{priority}',difficulty='Beginner' if int(priority)==0 else 'Intermediate' if int(priority)<3 else 'Advanced',importance=5-int(priority),definition=definition,depth=depth,path=f'knowledge-base/topics/{id}.md',anchor=slug(name),prerequisites=a['prerequisites'],related=list(dict.fromkeys([id]+a['related'])),lastVerified=DATE,resourceIds=[f'{id}-official',f'{id}-article'])
        c['difficulty']=kb_graph.difficulty(id,name)
        c['conceptPrerequisites']=kb_graph.EDGES.get(cid,[])
        c['evidencePaths']=[f'projects/knowledge-base/concept-lab/{lesson[0]}.mjs' for lesson in kb_practice.LESSONS if lesson[1]==id and name in lesson[3]]
        cs.append(c);topics.append(c)
    guide=dict(id=id,title=a['title'],priority=a['priority'],difficulty='Beginner' if a['priority']=='P0' else 'Intermediate',importance=5-int(a['priority'][1]),estimatedMinutes=180 if a['priority']=='P0' else 120,prerequisites=a['prerequisites'],related=a['related'],path=f'knowledge-base/topics/{id}.md',conceptIds=[c['id'] for c in cs],lastVerified=DATE,status='authored-guide',legacyPaths=LEGACY.get(id,[]))
    guides.append(guide)
    meta=json.dumps(guide,ensure_ascii=False,sort_keys=True)
    text=f'<!-- kb-metadata: {meta} -->\n# {a["title"]}\n\nPriority: {a["priority"]} — {LABELS[a["priority"]]}\n\nDifficulty: {guide["difficulty"]}\n\nImportance: {guide["importance"]}/5\n\nPrerequisites: {links(a["prerequisites"])}\n\nEstimated learning time: {guide["estimatedMinutes"]} minutes for explanation and initial practice; independent mastery takes repeated application.\n\n[Knowledge base](../README.md) · [Coverage](../COVERAGE.md) · [Learning paths](../paths/README.md)\n\n'
    text+='## 🎯 Learning Objectives\n\nExplain the mental model, trace the worked example, reproduce a failure, and demonstrate the acceptance checks in the mini-project. Individual concepts below have their own priorities and depth labels.\n\n'
    text+='## 🧠 What Is It?\n\n'+cs[0]['definition']+'\n\n## Concept reference and priorities\n\n'
    for c in cs:text+=f'<a id="{c["anchor"]}"></a>\n### {c["title"]}\n\n**{c["priority"]} · {LABELS[c["priority"]]} · {c["depth"]}**\n\n{c["definition"]}\n\n'
    text+='## ❓ Why Does It Exist?\n\n'+a['why']+'\n\n## ⚙️ How Does It Work?\n\n'+a['model']+'\n\n'
    text+='## 💻 Examples\n\n### 1. Trace the contract\n\n```'+a['language']+'\n'+a['example']+'\n```\n\nExpected behavior and runtime: '+a['output']+'\n\n### 2. Extend and stress the contract\n\n'+a['practice'][1]+' '+a['practice'][2]+' Record the expected result before implementation; use the failure analysis below to distinguish the broken boundary.\n\n'
    text+=kb_practice.append(id)
    text+='## 🔍 Under the Hood\n\n'+a['internals']+'\n\n## 🌍 Real-World Usage\n\n'+a['usage']+'\n\n'
    text+='## ⚠️ Common Mistakes\n\n'+''.join('- '+m+'\n' for m in a['mistakes'])+'\n'
    text+='## ✅ Best Practices\n\n'+a['usage']+' State the invariant, validate at the boundary, use the documented runtime, and keep a reproducible failure case. This guide is educational evidence; it does not certify a deployment.\n\n'
    text+='## 🧪 Practice\n\n'+''.join('- '+p+'\n' for p in a['practice'])+'\n## 🏗️ Mini Project\n\n'+a['project']+'\n\n[Project ladder and implementation status](../projects/README.md)\n\n'
    text+='## 💼 Interview Questions\n\n'
    for q,answer in a['questions']+[('Output-based: What does the worked example produce, and under which runtime?',a['output']),('Coding: What would you implement and verify next?',a['project']),('Architecture and production: Which internal boundary needs evidence?',a['internals'])]:text+=f'<details>\n<summary>{q}</summary>\n\n{answer}\n\n</details>\n\n'
    text+='[Difficulty-based interview bank](../../interview-handbook/questions/index.md) · [Scenario practice](../../interview-handbook/scenarios/README.md) · [Debugging library](../debugging/README.md)\n\n'
    text+='## 🔗 Related Concepts\n\n'+links(a['related'])+'\n\nNext: '+links(a['related'][:1])+'\n\n'
    if id in LEGACY:text+='Preserved lessons: '+', '.join(f'[{p}](../../{p})' for p in LEGACY[id])+'\n\n'
    text+='# 📚 External Resources\n\n## 🥇 Official Documentation\n\n'+f'[Primary documentation]({a["official"]}) — authoritative reference; use the installed runtime/library version.\n\n## 📘 Recommended Articles\n\n'+f'[Focused guide]({a["article"]}) — deepen the mental model and compare its examples with this guide.\n\n'
    text+='## 🎥 Recommended YouTube Videos\n\nSee the [verified media register](../resources/VIDEOS.md). A topic without a verified topical video uses written official documentation; unverified recommendations are not padded into this section.\n\n'
    text+='## 🧪 Practice Resources\n\n[Local project ladder](../projects/README.md) · [Timed exercises](../../interview-handbook/machine-coding/README.md)\n\n## 📚 Further Reading\n\n[Curated external register](../resources/README.md) — authority, level, best use, last check, and retrieval limitations.\n\n## 🔄 Last Verified\n\n'+DATE+' — documentation reviewed; example runtime and execution scope are stated above.\n'
    if id=='javascript':text+='\n[TC39 proposal register](https://github.com/tc39/proposals) — checked '+DATE+'; proposal status is not a guarantee of shipped runtime support.\n'
    write(guide['path'],text)
    for suffix,url,kind in [('official',a['official'],'official-documentation'),('article',a['article'],'focused-guide')]:
        rid=f'{id}-{suffix}';resources[rid]=dict(id=rid,area=id,type=kind,url=url,difficulty=guide['difficulty'],bestFor=a['title'],lastVerified=DATE,verification='publisher-content-reviewed',versionPolicy='Match installed dependency; review migrations before adapting older examples.')
resources['javascript-proposals']=dict(id='javascript-proposals',area='javascript',type='official-proposal-register',url='https://github.com/tc39/proposals',difficulty='Advanced',bestFor='Distinguish proposal stages from standardized and shipped JavaScript',lastVerified=DATE,verification='publisher-content-reviewed',versionPolicy='Verify proposal stage and runtime support separately.')
catalog=dict(schemaVersion=1,lastUpdated=DATE,priorities=LABELS,depthDefinitions={'worked-example':'This concept has a direct worked example in an authored guide; not a claim of API completeness or mastery.','reference':'Original definition and linked guide/resources; dedicated examples and assessments still need expansion.'},guides=guides,concepts=topics,resources=list(resources.values()))
write('knowledge-base/data/catalog.json',json.dumps(catalog,indent=2,ensure_ascii=False))
text='# Coverage status\n\nGenerated from [catalog.json](data/catalog.json). All listed concepts have original reference definitions, priorities, and connected navigation. A worked example establishes a particular contract, not complete framework coverage. Percentages measure the proportion of mapped concepts with direct worked examples; they are **not a percentage of all possible technology knowledge**.\n\n| Area | Mapped concepts | With direct worked examples | Reference depth | Example ratio |\n| --- | ---: | ---: | ---: | ---: |\n'
for g in guides:
    items=[c for c in topics if c['area']==g['id']];n=sum(c['depth']=='worked-example' for c in items)
    text+=f'| [{g["title"]}](topics/{g["id"]}.md) | {len(items)} | {n} | {len(items)-n} | {int(n/len(items)*100+0.5)}% |\n'
counts=Counter(c['priority'] for c in topics)
text+='\n## Priority distribution\n\n'+''.join(f'- {p} {LABELS[p]}: {counts[p]} mapped concepts\n' for p in LABELS)
text+='\nP4 covers proposal evaluation, not unsupported code presented as a stable API. [Remaining work](REMAINING_WORK.md) tracks depth and execution gaps.\n'
write('knowledge-base/COVERAGE.md',text)
text='# Topic and concept index\n\n[Browse and filter in the browser](explorer.html) · [Learning paths](paths/README.md) · [Coverage](COVERAGE.md)\n\n'
for g in guides:
    text+=f'## [{g["title"]}](topics/{g["id"]}.md)\n\n'
    for c in topics:
        if c['area']==g['id']:text+=f'- [{c["title"]}](topics/{g["id"]}.md#{c["anchor"]}) — {c["priority"]}, {c["difficulty"]}, {c["depth"]}\n'
    text+='\n'
write('knowledge-base/INDEX.md',text)
resourceText='# External resource register\n\nReviewed '+DATE+'. This catalog prioritizes publisher documentation and a focused guide for each major area. Each entry is chosen for topical authority, relevance, and practical use. It is not a claim that every linked page or API has been exhaustively audited. Prices and availability can change. [Verification method](POLICY.md) · [Verified media](VIDEOS.md) · [Earlier interview resource catalog](../../interview-handbook/resources/README.md)\n\n| Area | Type | Resource | Level | Best for | Last checked |\n| --- | --- | --- | --- | --- | --- |\n'
for r in resources.values():resourceText+=f'| {r["area"]} | {r["type"]} | [Publisher page]({r["url"]}) | {r["difficulty"]} | {r["bestFor"]} | {DATE} |\n'
write('knowledge-base/resources/README.md',resourceText)
from kb_paths_projects import build
build(ROOT,write,AREAS)
from kb_cheatsheets import build as build_cheatsheets
build_cheatsheets(write)
kb_practice.build(write)
print(f'Built {len(guides)} authored guides and {len(topics)} classified reference concepts; {sum(c["depth"]=="worked-example" for c in topics)} have direct worked examples.')
