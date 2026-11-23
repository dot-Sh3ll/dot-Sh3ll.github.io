"""Pied de page « Less Rules, More Play · paulmoussard.com » (gauche) et « Aide de jeu non officielle » (droite) sur chaque page d'un PDF.
usage : pdf_footer.py <source.pdf> <sortie.pdf>"""
import io, sys
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("Fira", "/usr/share/fonts/truetype/google-fonts/ofl/firasans/FiraSans-Regular.ttf"))
src, dst = sys.argv[1], sys.argv[2]
r = PdfReader(src); w = PdfWriter()
M = 7.5 * 72 / 25.4
for p in r.pages:
    W, H = float(p.mediabox.width), float(p.mediabox.height)
    buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=(W, H))
    c.setFillColorRGB(0x8a / 255, 0x75 / 255, 0x58 / 255); c.setFont("Fira", 6)
    c.drawString(M, 8, "Less Rules, More Play · paulmoussard.com")
    c.drawRightString(W - M, 8, "Aide de jeu non officielle")
    c.save(); buf.seek(0)
    p.merge_page(PdfReader(buf).pages[0]); w.add_page(p)
w.write(dst)
