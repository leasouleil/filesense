from pypdf import PdfReader as _PyPdfReader
from filesense.readers.base import BaseReader


class PdfReader(BaseReader):
    def read(self, filepath: str) -> dict:
        reader = _PyPdfReader(filepath)

        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted

        return {"text": text, "metadata": {}}