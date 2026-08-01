import requests

def classify(filename, text):
    prompt = f"""
Categorize this document.

Categories:
Finance
School
Programming
Personal
Images

Filename:
{filename}

Document Content:
{text[:2000]}

Return only category.
"""

    response = requests.post("http://localhost:11434/api/generate",
                             json={"model": "llama3.2",
                                   "prompt": prompt,
                                   "stream": False})
    
    return response.json()["response"].strip()