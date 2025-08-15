import superagent from 'superagent';

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

/**
 * Выполняет GET-запрос к API.
 * @param endpoint - конечная точка API (например, '/auth/login')
 * @param params - объект с параметрами запроса
 * @returns Промис с данными ответа
 */
export async function apiGet<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  const response = await superagent.get(`${API_BASE_URL}${endpoint}`).query(params);
  return response.body;
}

/**
 * Выполняет POST-запрос к API.
 * @param endpoint - конечная точка API (например, '/users')
 * @param data - данные для отправки в запросе
 * @returns Промис с данными ответа
 */
export async function apiPost<T>(endpoint: string, data: any): Promise<T> {
  const response = await superagent.post(`${API_BASE_URL}${endpoint}`).send(data);
  return response.body;
}

/**
 * Выполняет PATCH-запрос к API.
 * @param endpoint - конечная точка API (например, '/users/1')
 * @param data - данные для обновления
 * @returns Промис с данными ответа
 */
export async function apiPatch<T>(endpoint: string, data: any): Promise<T> {
  const response = await superagent.patch(`${API_BASE_URL}${endpoint}`).send(data);
  return response.body;
}

/**
 * Выполняет DELETE-запрос к API.
 * @param endpoint - конечная точка API (например, '/users/1')
 * @returns Промис с данными ответа
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  const response = await superagent.delete(`${API_BASE_URL}${endpoint}`);
  return response.body;
}
