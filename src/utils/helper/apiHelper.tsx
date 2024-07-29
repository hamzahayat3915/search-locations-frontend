const BASE_URL = 'http://localhost:4000';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
  body?: any;
}

export async function apiRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, body?: any, headers?: { [key: string]: string }): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: (method === 'GET' || method === 'DELETE') ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
}
