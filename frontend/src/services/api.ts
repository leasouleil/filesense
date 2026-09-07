const API_BASE_URL = 'http://127.0.0.1:8000'

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    },
  )

  if (!response.ok) {
    const message = await response.text()

    throw new Error(
      message || `API request failed: ${response.status}`,
    )
  }

  return response.json()
}