from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
MAPS={
'mern-overview':('MERN learning path',[
('Web foundations',['HTTP and browser','Semantic HTML','CSS and accessibility']),
('JavaScript',['Values and closures','DOM and events','Promises and concurrency']),
('React',['State and identity','Effects and cleanup','Async UI and failures']),
('API',['Node resources','Express middleware','Validation and ownership']),
('Persistence',['Access patterns','Indexes and queries','Atomicity and versions']),
('Delivery',['Tests and builds','Security and sessions','Projects and interviews'])]),
'javascript':('JavaScript reasoning',[
('Values',['Primitives and identity','Coercion and equality','Copying and mutation']),
('Scope',['Lexical environment','Closures and retention','Temporal dead zone']),
('Functions',['Invocation and this','Arrows and bind','Pure transformations']),
('Async',['Tasks and microtasks','Promise outcomes','Cancellation and limits']),
('Browser',['DOM and delegation','Focus and forms','Listeners and cleanup']),
('Practice',['Debounce and emitter','LRU and promise pool','Complexity and boundaries'])]),
'react':('React application model',[
('Inputs',['Props are snapshots','Stable keys','Controlled form drafts']),
('State',['One owner per fact','Derived values','Reducers and transitions']),
('Effects',['External synchronization','Correct dependencies','Cleanup and cancellation']),
('Remote data',['Loading empty error','Latest request wins','Mutation recovery']),
('Performance',['Measure before optimizing','Pagination or windowing','Memoization tradeoffs']),
('Verification',['Accessible roles','Keyboard and focus','Build and browser tests'])]),
'api-security':('Authenticated API flow',[
('Boundary',['JSON and payload limits','Allowed scalar fields','Safe error responses']),
('Identity',['Password verifier','Session token digest','Expiration and revocation']),
('Authorization',['Trusted user id','Owner in every query','Cross-user tests']),
('Browser writes',['Same-origin deployment','Origin validation','Cookie and CSRF policy']),
('Operations',['Bounded requests','Rate limit scope','Safe logs and shutdown']),
('Threats',['Injection and assignment','XSS and token exposure','SSRF and unsafe uploads'])]),
'mongodb':('MongoDB correctness',[
('Model',['Read and write patterns','Embed bounded data','Reference shared entities']),
('Indexes',['Equality sort range','Unique constraints','Write and storage cost']),
('Queries',['Bound result counts','Explain realistic data','Cursor tie-breakers']),
('Writes',['Single document atomic','Expected version filter','Conditional stock update']),
('Transactions',['Multi-document invariant','Replica set requirement','Retry and idempotency']),
('Evidence',['Real database tests','Concurrent operations','Indexes and persistence'])]),
'interview-loop':('Preparation with evidence',[
('Learn',['One primary resource','Explain without notes','Implement a small example']),
('Recall',['Difficulty-wise answers','Tradeoff and follow-up','Review weak scores']),
('Machine coding',['Clarify acceptance','Finish one core flow','Failure and keyboard checks']),
('Scenarios',['Collect evidence','Hypothesis and fix','Regression verification']),
('Portfolio',['Trace a full request','State your contribution','Demonstrate limitations']),
('Company',['Official role guidance','Confirm format','Truthful behavioral stories'])])
}
out=ROOT/'interview-handbook/mindmaps';out.mkdir(parents=True,exist_ok=True)
index=['# Mind maps\n\n[Handbook](../README.md)\n\nSVG maps render without a Mermaid dependency. Each companion Markdown file includes an editable Mermaid mind map and a text outline. Recreate a map from memory, then explain one failure case at each branch.']
for slug,(title,branches) in MAPS.items():
    nodes=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 820" role="img" aria-labelledby="title desc">',f'<title id="title">{escape(title)}</title><desc id="desc">Six branches with three study concepts per branch. A text outline is available in the companion Markdown file.</desc>', '<rect width="1200" height="820" fill="#f3f6fb"/>',f'<text x="48" y="53" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#172945">{escape(title)}</text>', '<text x="48" y="83" font-family="Arial,sans-serif" font-size="16" fill="#52627a">Explain each relationship and demonstrate one boundary case.</text>']
    for i,(heading,leaves) in enumerate(branches):
        x=48 if i<3 else 798;y=125+(i%3)*220
        nodes.append(f'<path d="M {x+330 if i<3 else x} {y+90} L 600 400" stroke="#94acd0" stroke-width="2" fill="none"/>')
    nodes+=['<rect x="425" y="357" width="350" height="86" rx="18" fill="#214ea2"/>',f'<text x="600" y="408" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="white">{escape(title)}</text>']
    for i,(heading,leaves) in enumerate(branches):
        x=48 if i<3 else 798;y=125+(i%3)*220
        nodes.append(f'<rect x="{x}" y="{y}" width="354" height="178" rx="14" fill="white" stroke="#b9c9e0"/>')
        nodes.append(f'<text x="{x+20}" y="{y+36}" font-family="Arial,sans-serif" font-size="21" font-weight="700" fill="#172945">{escape(heading)}</text>')
        for j,leaf in enumerate(leaves):nodes.append(f'<text x="{x+20}" y="{y+73+j*32}" font-family="Arial,sans-serif" font-size="18" fill="#344968">{escape(leaf)}</text>')
    nodes.append('</svg>');(out/f'{slug}.svg').write_text('\n'.join(nodes),encoding='utf-8')
    mermaid='mindmap\n  root(('+title+'))\n'+''.join('    '+heading+'\n'+''.join('      '+leaf+'\n' for leaf in leaves) for heading,leaves in branches)
    text=f'# {title}\n\n![{title}]({slug}.svg)\n\n## Editable mind map\n\n```mermaid\n{mermaid}```\n\n## Text outline\n\n'+''.join(f'### {heading}\n\n'+''.join('- '+leaf+'\n' for leaf in leaves)+'\n' for heading,leaves in branches)
    (out/f'{slug}.md').write_text(text.rstrip()+'\n',encoding='utf-8');index.append(f'\n- [{title}]({slug}.md) · [SVG]({slug}.svg)')
(out/'README.md').write_text('\n'.join(index)+'\n',encoding='utf-8')
print('Generated six SVG and Mermaid mind maps.')
