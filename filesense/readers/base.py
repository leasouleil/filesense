from abc import ABC, abstractmethod


class BaseReader(ABC):
    @abstractmethod
    def read(self, filepath: str) -> dict:
        """
        Extract content/metadata used for AI categorization.

        Should return a dict, e.g.:
            {
                "text": "...",          # extracted/represented text, if any
                "metadata": {...},      # file-type-specific metadata
            }
        Keep this fast and bounded (e.g. cap extracted text length) --
        this runs on every file the watcher sees.
        """
        raise NotImplementedError
