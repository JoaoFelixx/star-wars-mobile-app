const API_URL = 'https://swapi.dev/api';


export async function api<T>(
  endpoint: string
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const jsonData: T = await response.json()

  return jsonData;
}