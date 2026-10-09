"""Export the complete authored guide text and honest depth labels, not publisher books."""
from pathlib import Path
from html import escape
import json,re,textwrap
from reportlab.platypus import SimpleDocTemplate,Paragraph,Preformatted,PageBreak,Spacer,KeepTogether
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
ROOT=Path(__file__).resolve().parents[1]
out=ROOT/'knowledge-base/downloads';out.mkdir(exist_ok=True)
catalog=json.loads((ROOT/'knowledge-base/data/catalog.json').read_text(encoding='utf-8'))
font=Path('C:/Windows/Fonts/arial.ttf')
if font.exists():
    for name,file in [('KB','arial.ttf'),('KB-Bold','arialbd.ttf'),('KB-Italic','ariali.ttf')]:pdfmetrics.registerFont(TTFont(name,str(font.parent/file)))
    pdfmetrics.registerFontFamily('KB',normal='KB',bold='KB-Bold',italic='KB-Italic',boldItalic='KB-Bold')
else:
    pdfmetrics.registerFont(TTFont('KB','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'));pdfmetrics.registerFont(TTFont('KB-Bold','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'));pdfmetrics.registerFontFamily('KB',normal='KB',bold='KB-Bold',italic='KB',boldItalic='KB-Bold')
styles=getSampleStyleSheet()
for name in ['Title','Heading1','Heading2','Heading3','BodyText']:styles[name].fontName='KB-Bold' if name in ['Title','Heading1','Heading2','Heading3'] else 'KB'
styles['Title'].fontSize=25;styles['Title'].leading=32
styles['Heading1'].fontSize=18;styles['Heading1'].leading=24
styles['Heading2'].fontSize=13;styles['Heading2'].leading=18
styles['Heading3'].fontSize=11;styles['Heading3'].leading=16
styles['BodyText'].fontSize=9;styles['BodyText'].leading=13;styles['BodyText'].spaceAfter=7
mono=Path('C:/Windows/Fonts/consola.ttf')
pdfmetrics.registerFont(TTFont('KBMono',str(mono) if mono.exists() else '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
styles.add(ParagraphStyle(name='KBCode',fontName='KBMono',fontSize=7.2,leading=10,backColor=colors.HexColor('#eef2f7'),borderPadding=6,spaceAfter=10))
def clean(value):return re.sub('[\U00010000-\U0010ffff\u2300-\u27ff\ufe0f]','',value).strip()
def inline(value):
    value=clean(value);value=escape(value)
    value=re.sub(r'\[([^\]]+)\]\((https?://[^\s)]+)\)',lambda m:f'<link href="{m[2]}">{m[1]}</link>',value)
    value=re.sub(r'\[([^\]]+)\]\(([^)]+)\)',r'\1',value)
    value=re.sub(r'\*\*([^*]+)\*\*',r'<b>\1</b>',value);value=re.sub(r'`([^`]+)`',r'\1',value)
    return value
story=[]
def paragraph(value,style='BodyText'):story.append(Paragraph(inline(value),styles[style]))
paragraph('MERN Stack Knowledge Base','Title');paragraph('Authored guides and connected practical study')
paragraph('This offline edition contains the full authored text of the 25 canonical guides, including the 375 concept definitions, priorities, mental models, examples, exercises, answered interview prompts, and resource links. Depth labels distinguish worked examples from reference definitions. It does not reproduce external publisher books or certify every referenced API.')
paragraph('Use the repository for runnable source, browser practice, project requirements, current corrections, and downloads. Code lines may wrap visually here; copy runnable code from its source file.')
paragraph('Exported 2026-10-09. Source review dates remain the dates recorded in the catalog.','BodyText')
paragraph('Contents','Heading1')
for g in catalog['guides']:paragraph(g['title'])
for g in catalog['guides']:
    story.append(PageBreak());lines=(ROOT/g['path']).read_text(encoding='utf-8').splitlines();code=False;buffer=[];external_start=None
    for line in lines:
        if line.startswith('```'):
            if code:
                wrapped='\n'.join('\n'.join(textwrap.wrap(clean(row),width=91,replace_whitespace=False,drop_whitespace=False,subsequent_indent='  ')) or '' for row in buffer)
                story.append(Preformatted(wrapped,styles['KBCode']));buffer=[]
            code=not code;continue
        if code:buffer.append(line);continue
        if not line.strip() or line.startswith('<!--') or line.startswith('<a id=') or line in ['<details>','</details>']:continue
        if line.startswith('<summary>'):paragraph(re.sub('</?summary>','',line),'Heading3');continue
        if line.startswith('# 📚 External Resources'):external_start=len(story)
        heading=re.match(r'^(#{1,6}) (.+)$',line)
        if heading:paragraph(heading[2],['Heading1','Heading2','Heading3'][min(len(heading[1]),3)-1]);continue
        paragraph(line)
    if external_start is not None:
        resource_block=story[external_start:];del story[external_start:];story.append(KeepTogether(resource_block))
def footer(canvas,doc):
    canvas.saveState();canvas.setFont('KB',8);canvas.setFillColor(colors.HexColor('#52627a'));canvas.drawString(42,25,'MERN knowledge base | Authored reference | 2026-10-09');canvas.drawRightString(A4[0]-42,25,str(doc.page));canvas.restoreState()
SimpleDocTemplate(str(out/'mern-knowledge-base.pdf'),pagesize=A4,leftMargin=42,rightMargin=42,topMargin=38,bottomMargin=42,title='MERN Stack Knowledge Base',author='MERN repository contributors').build(story,onFirstPage=footer,onLaterPages=footer)
print('Exported all 25 authored guides to the knowledge-base PDF.')
