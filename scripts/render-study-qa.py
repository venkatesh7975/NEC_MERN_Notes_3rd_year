from pathlib import Path
from pdf2image import convert_from_path
from pypdf import PdfReader
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
for label,source in [('handbook',ROOT/'interview-handbook/downloads/mern-interview-handbook.pdf'),('study-plan',ROOT/'tmp/docx-render/mern-study-plan.pdf')]:
    output=ROOT/'tmp'/f'{label}-qa';output.mkdir(parents=True,exist_ok=True)
    reader=PdfReader(source)
    for index,page in enumerate(reader.pages):
        if not (page.extract_text() or '').strip():raise ValueError(f'{label} blank page {index+1}')
    pages=convert_from_path(str(source),dpi=100,output_folder=str(output),fmt='png',paths_only=True)
    for start in range(0,len(pages),8):
        canvas=Image.new('RGB',(4*430,2*640),'#c8d1df');draw=ImageDraw.Draw(canvas)
        for offset,file in enumerate(pages[start:start+8]):
            img=Image.open(file);img.thumbnail((410,590));x=(offset%4)*430+10;y=(offset//4)*640+30
            canvas.paste(img,(x,y));draw.text((x,y-20),f'{label} page {start+offset+1}',fill='#172945')
        canvas.save(output/f'contact-{start//8+1:02}.png')
    print(f'{label}: {len(pages)} rendered pages, all with extracted text.')
