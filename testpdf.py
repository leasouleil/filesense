from classifier import classify
from pdfreader import extract_pdf_text

text = extract_pdf_text(
    "Downloads_Test/test.pdf"
)

category = classify(
    "test.pdf",
    text
)

print(category)