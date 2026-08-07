from PIL import Image
import pytesseract
from filesense.readers.base import BaseReader

# NOTE: ported from the original imagereader.py, which hardcoded the
# Windows Tesseract install path below. If tesseract is already on
# PATH on this machine, this line can be deleted; otherwise update it
# to match your local install.
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


class ImageReader(BaseReader):
    def read(self, filepath: str) -> dict:
        image = Image.open(filepath)
        text = pytesseract.image_to_string(image)

        return {"text": text, "metadata": {}}
