# FileSense

AI-powered file categorization and organization tool. Watches a folder
with `watchdog`, extracts content from downloaded files, categorizes
them via a local or cloud LLM, and moves them into the right place.

## Project layout

```
filesense/
├── filesense/          # core package
│   ├── main.py          # entry point
│   ├── config.py
│   ├── database.py
│   ├── logger.py
│   ├── classifier.py
│   ├── licensing.py
│   ├── readers/          # one file per file-type, shared BaseReader interface
│   ├── ai/                # local (Ollama) vs cloud backend, chosen via config
│   └── gui/                # PySide6 tray + settings + history windows
├── config/
│   └── config.example.json
├── tests/
└── scripts/               # scratch/debug scripts, not part of the test suite
```

## Setup

```bash
pip install -e .
cp config/config.example.json config/config.json
# edit config/config.json: set watch_folder, choose ai_backend (local/cloud)
```

## Run

```bash
python -m filesense.main
```

## Tests

```bash
pytest tests/
```

## Adding a new file type reader

1. Create `filesense/readers/<type>_reader.py` implementing `BaseReader.read()`.
2. Register it in `filesense/readers/__init__.py`'s `READERS` dict.

No other file needs to change -- `classifier.py` calls readers through
the shared interface.
