import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Add response type
export function fetcher<T>(url: string): Promise<T> {
  return api.get(url).then(res => res.data);
}