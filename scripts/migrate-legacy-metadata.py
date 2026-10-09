"""Add compatibility navigation without replacing historical lesson content."""
from pathlib import Path
import json,re,os

ROOT=Path(__file__).resolve().parents[1]
catalog=json.loads((ROOT/'knowledge-base/data/catalog.json').read_text(encoding='utf-8'))
count=0
for guide in catalog['guides']:
    for relative in guide['legacyPaths']:
        file=ROOT/relative
        text=file.read_text(encoding='utf-8')
        text=re.sub(r'^<!-- kb-legacy: .*? -->\n.*?<!-- /kb-legacy -->\n\n','',text,flags=re.S)
        destination=os.path.relpath(ROOT/guide['path'],file.parent).replace('\\','/')
        meta={'canonicalGuideId':guide['id'],'priority':guide['priority'],'status':'legacy-adapter','reviewed':'2026-10-08'}
        prefix='<!-- kb-legacy: '+json.dumps(meta,sort_keys=True)+' -->\n'
        prefix+=f'> Current knowledge-base route: [{guide["title"]}]({destination}) — {guide["priority"]}. Follow that guide for prerequisites, related concepts, reviewed resources, and practice. This preserved lesson has navigation metadata; its historical examples have not all been updated or executed.\n<!-- /kb-legacy -->\n\n'
        file.write_text(prefix+text,encoding='utf-8');count+=1
print(f'Added compatibility navigation to {count} preserved guides.')
