"""Render the generated guide book for layout inspection; previews stay ignored."""
from pathlib import Path
from pdf2image import convert_from_path
from pypdf import PdfReader
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'knowledge-base/downloads/mern-knowledge-base.pdf'
output=ROOT/'tmp/knowledge-pdf';output.mkdir(exist_ok=True)
reader=PdfReader(source)
for index,page in enumerate(reader.pages):
    text=(page.extract_text() or '').strip()
    if len(text)<80:raise ValueError(f'Almost blank page {index+1}')
pages=convert_from_path(str(source),dpi=80,output_folder=str(output),fmt='png',paths_only=True)
for start in range(0,len(pages),12):
    canvas=Image.new('RGB',(4*330,3*470),'#c8d1df');draw=ImageDraw.Draw(canvas)
    for offset,file in enumerate(pages[start:start+12]):
        img=Image.open(file);img.thumbnail((310,430));x=(offset%4)*330+10;y=(offset//4)*470+25
        canvas.paste(img,(x,y));draw.text((x,y-18),f'Page {start+offset+1}',fill='#172945')
    canvas.save(output/f'contact-{start//12+1:02}.png')
print(f'{len(pages)} pages rendered; all contain substantive text.')
