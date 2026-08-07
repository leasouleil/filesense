import json
import shutil
from pathlib import Path

CONFIG_DIR = Path(__file__).resolve().parent.parent / "config"
CONFIG_PATH = CONFIG_DIR / "config.json"
CONFIG_EXAMPLE_PATH = CONFIG_DIR / "config.example.json"

DEFAULT_CONFIG = {
    "watch_folder": "",
    "sorted_folder": "Sorted",
    "db_path": "filesense.db",
    "log_level": "INFO",
    "ai_backend": "local",
    "local_model": "llama3.2",
    "local_base_url": "http://localhost:11434",
    "cloud_provider": "",
    "cloud_api_key": "",
    # category label (sent to/expected from the LLM) -> destination
    # subfolder name under sorted_folder. Ported from the original
    # project's flat `allowed_categories` list; kept as a dict here so
    # a category's folder name can later diverge from its label.
    "categories": {
        "Finance": "Finance",
        "School": "School",
        "Programming": "Programming",
        "Personal": "Personal",
        "Forms": "Forms",
        "Installer": "Installer",
    },
}


def _load() -> dict:
    if not CONFIG_PATH.exists():
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        if CONFIG_EXAMPLE_PATH.exists():
            shutil.copy(CONFIG_EXAMPLE_PATH, CONFIG_PATH)
        else:
            with open(CONFIG_PATH, "w", encoding="utf-8") as f:
                json.dump(DEFAULT_CONFIG, f, indent=4)

    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


config = _load()


def save_config(updated_config: dict = None) -> None:
    """Persist changes back to config/config.json (e.g. from the settings GUI)."""
    global config
    if updated_config is not None:
        config = updated_config
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=4)
