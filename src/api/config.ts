const baseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'http://localhost:3000';

const token = import.meta.env.VITE_API_TOKEN || 'super-secret-doodle-token';

export function getApiConfig(): { baseUrl: string; token: string } {
  return { baseUrl, token };
}
