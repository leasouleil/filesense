import requests
from logger import logger

def classify(filename, text):
    prompt = f"""
Classify this file into one of these categories

Categories:
Finance
School
Programming
Personal
Installer

Rules:
- Respond with only the category word. Nothing else.
- No explanation, no punctuation, no alternate options.
- Installer = setup/install executables (.exe, .msi) for software, drivers, or SDKs — even if the software itself is dev-related.
- If unsure, pick the single most likely category.

Filename:
{filename}

Document Content:
{text[:2000]}

Return only the category.
"""

    try:
        response = requests.post("http://localhost:11434/api/generate", timeout=60,
                                json={"model": "llama3.2",
                                    "prompt": prompt,
                                    "stream": False})
        response.raise_for_status()
        return response.json()["response"].strip()

    except requests.RequestException as e:
        logger.error(f"Ollama error: {e}")
        return "Uncategorized"