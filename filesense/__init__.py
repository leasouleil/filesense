"""
FileSense
=========

AI-powered file categorization and organization tool.

This package contains the core application logic:
- config.py        : loads/saves JSON configuration
- database.py       : SQLite persistence layer
- logger.py          : application-wide logging setup
- classifier.py      : orchestrates reading + AI categorization
- readers/            : per-file-type content extraction
- gui/                : PySide6 desktop UI (tray, settings, history)
"""

__version__ = "0.1.0"