import requests

from filesense.logger import logger


class LocalBackend:
    def __init__(self, config: dict):
        self.config = config
        self.model = config.get("local_model", "llama3.2")
        self.base_url = config.get("local_base_url", "http://localhost:11434")

    def categorize(self, extracted: dict) -> dict:
        filename = extracted.get("filename", "")
        text = extracted.get("text", "") or ""
        categories = list(self.config.get("categories", {}).keys())

        prompt = f"""
Classify this file into one of these categories

Categories:
{chr(10).join(categories)}

Rules:
- Respond with only the category word. Nothing else.
- No explanation, no punctuation, no alternate options.
- Installer = setup/install executables (.exe, .msi) for software, drivers, or SDKs -- even if the software itself is dev-related.
- If unsure, pick the single most likely category.

Filename:
{filename}

Document Content:
{text[:2000]}

Return only the category.
"""

        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                timeout=60,
                json={"model": self.model, "prompt": prompt, "stream": False},
            )
            response.raise_for_status()
            category = response.json()["response"].strip()
            return {"category": category, "confidence": None}
        except requests.RequestException as e:
            logger.error("Ollama error: %s", e)
            return {"category": "Uncategorized", "confidence": None}
