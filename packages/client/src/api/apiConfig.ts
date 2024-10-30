type RequestConfig = {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  data?: Record<string, any>
}

async function fetchWithConfig<T>(
  url: string,
  { method, data }: RequestConfig
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.reason || `Ошибка: ${response.status}`)
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return await response.json()
  }

  return (await response.text()) as unknown as T
}

export default fetchWithConfig
