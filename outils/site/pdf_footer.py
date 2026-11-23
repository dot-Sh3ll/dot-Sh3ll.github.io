"""Ajoute « paulmoussard.com » en bas de chaque page d'un PDF existant ; efface d'éventuelles zones (x0,top,x1,bottom) sur la 1re page."""
import io, sys
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
src, dst = sys.argv[1], sys.argv[2]
erase = [tuple(map(float, e.split(','))) for e in sys.argv[3:]]
r = PdfReader(src); w = PdfWriter()
for i, p in enumerate(r.pages):
    W, H = float(p.mediabox.width), float(p.mediabox.height)
    buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=(W, H))
    if i == 0:
        for x0, t, x1, b in erase:
            c.setFillColorRGB(1, 1, 1); c.rect(x0 - 1, H - b - 1, x1 - x0 + 2, b - t + 2, stroke=0, fill=1)
    c.setFillColorRGB(.45, .45, .45); c.setFont("Helvetica", 6.5)
    c.drawCentredString(W / 2, 6.5, "paulmoussard.com")
    c.save(); buf.seek(0)
    p.merge_page(PdfReader(buf).pages[0]); w.add_page(p)
w.write(dst)
