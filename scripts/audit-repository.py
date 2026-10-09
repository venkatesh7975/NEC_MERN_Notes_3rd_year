"""Inventory a fixed Git revision without deleting or moving learner resources."""
import hashlib,json,re,subprocess,collections
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BASELINE='bb0191f569ccb44e3d79192fbcf5eb16dd90c1a5'
entries=subprocess.check_output(['git','ls-tree','-r',BASELINE],cwd=ROOT,text=True).splitlines()
records=[]; duplicates=collections.defaultdict(list); areas=collections.Counter()
for entry in entries:
    info,name=entry.split('\t',1); mode,kind,oid=info.split()
    raw=subprocess.check_output(['git','cat-file','blob',oid],cwd=ROOT)
    extension=Path(name).suffix.lower(); text=raw.decode('utf-8',errors='replace') if extension in {'.md','.js','.jsx','.cjs','.mjs','.json','.html','.css','.sql','.yml','.yaml','.py','.txt'} else ''
    area=name.split('/')[0] if '/' in name else 'root';areas[area]+=1
    headings=re.findall(r'^#{1,3} (.+)$',text,re.M)
    digest=hashlib.sha256(raw).hexdigest();duplicates[digest].append(name)
    records.append(dict(path=name,area=area,extension=extension,bytes=len(raw),sha256=digest,headings=headings))
groups=[dict(sha256=d,paths=p) for d,p in duplicates.items() if len(p)>1]
data=dict(schemaVersion=1,baseline=BASELINE,reviewed='2026-10-08',fileCount=len(records),areas=dict(sorted(areas.items())),duplicateGroups=groups,files=records)
output=ROOT/'knowledge-base/data/legacy-inventory.json';output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(json.dumps(dict(files=len(records),markdown=sum(r['extension']=='.md' for r in records),areas=data['areas'],duplicateGroups=len(groups),duplicateCode=[g['paths'] for g in groups if any(Path(p).suffix in {'.js','.jsx','.sql','.html'} for p in g['paths'])]),indent=2))
