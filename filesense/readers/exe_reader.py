import pefile
from filesense.logger import logger
from filesense.readers.base import BaseReader


class ExeReader(BaseReader):
    def read(self, filepath: str) -> dict:
        text = ""
        pe = None

        try:
            pe = pefile.PE(filepath)

            if hasattr(pe, "FileInfo"):
                for file_info in pe.FileInfo:
                    for entry in file_info:
                        if hasattr(entry, "StringTable"):
                            for st in entry.StringTable:
                                for key, value in st.entries.items():
                                    key_str = key.decode(errors="ignore") if isinstance(key, bytes) else key
                                    val_str = value.decode(errors="ignore") if isinstance(value, bytes) else value
                                    text += f"{key_str}: {val_str}\n"
        except Exception as e:
            logger.error("Could not read exe metadata: %s", e)
        finally:
            if pe is not None:
                pe.close()

        return {"text": text, "metadata": {}}
