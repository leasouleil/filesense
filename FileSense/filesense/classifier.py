from pathlib import Path

from filesense.logger import logger
from filesense.config import config
from filesense.readers import get_reader
from filesense.ai import get_backend


def classify(filepath: str) -> dict:
    """
    Extract content from `filepath` using the matching reader, send it
    to the configured AI backend, and return a result dict, e.g.:
        {"category": "Finance", "confidence": None}
    """
    ext = Path(filepath).suffix.lower()
    reader = get_reader(ext)

    if reader is None:
        logger.warning("No reader registered for extension: %s", ext)
        return {"category": "Uncategorized", "confidence": 0.0}

    try:
        extracted = reader.read(filepath)
    except Exception as e:
        logger.error("Could not read %s: %s", filepath, e)
        extracted = {"text": "", "metadata": {}}

    extracted["filename"] = Path(filepath).name

    backend = get_backend(config)
    result = backend.categorize(extracted)

    category = (result.get("category") or "").strip()
    category = category.split("\n")[0].strip()

    allowed_categories = list(config.get("categories", {}).keys())
    matched = next(
        (allowed for allowed in allowed_categories if category.lower() == allowed.lower()),
        None,
    )

    if matched is None:
        logger.warning("Unknown category returned by model: %s", category)
        matched = "Uncategorized"

    return {"category": matched, "confidence": result.get("confidence")}