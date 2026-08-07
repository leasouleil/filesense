from docx import Document
from filesense.readers.base import BaseReader


class DocxReader(BaseReader):
    def read(self, filepath: str) -> dict:
        doc = Document(filepath)

        text = ""
        for para in doc.paragraphs:
            if para.text:
                text += para.text + "\n"

        return {"text": text, "metadata": {}}