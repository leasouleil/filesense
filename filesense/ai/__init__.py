"""
AI backend abstraction: local (Ollama) vs cloud (proxy/API) model
calls, chosen via config["ai_backend"]. classifier.py should depend
only on get_backend(), never import local.py/cloud.py directly.
"""

from filesense.ai.local import LocalBackend
from filesense.ai.cloud import CloudBackend


def get_backend(config: dict):
    backend = config.get("ai_backend", "local")
    if backend == "cloud":
        return CloudBackend(config)
    return LocalBackend(config)
