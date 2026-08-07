"""
Reader registry.

Adding support for a new file type means:
1. Create readers/<type>_reader.py implementing BaseReader.read()
2. Import it below and add one line to READERS.

classifier.py never needs to change.
"""

from filesense.readers.pdf_reader import PdfReader
from filesense.readers.docx_reader import DocxReader
from filesense.readers.xlsx_reader import XlsxReader
from filesense.readers.image_reader import ImageReader
from filesense.readers.exe_reader import ExeReader

READERS = {
    ".pdf": PdfReader(),
    ".docx": DocxReader(),
    ".xlsx": XlsxReader(),
    ".jpg": ImageReader(),
    ".jpeg": ImageReader(),
    ".png": ImageReader(),
    ".exe": ExeReader(),
}


def get_reader(extension: str):
    """Return the reader instance for a given file extension, or None."""
    return READERS.get(extension.lower())
