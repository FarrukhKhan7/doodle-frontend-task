import type { ChatMessage, CreateMessagePayload } from './types';
import { getApiConfig } from './config';

function authHeaders(): HeadersInit {
  const { token } = getApiConfig();
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
}

export async function fetchMessages(params?: {
  limit?: number;
  after?: string;
  before?: string;
}): Promise<ChatMessage[]> {
  const { baseUrl } = getApiConfig();
  const search = new URLSearchParams();
  if (params?.limit != null) search.set('limit', String(params.limit));
  if (params?.after) search.set('after', params.after);
  if (params?.before) search.set('before', params.before);
  const qs = search.toString();
  const url = `${baseUrl}/api/v1/messages${qs ? `?${qs}` : ''}`;
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to load messages (${res.status})`);
  }
  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) throw new Error('Unexpected messages response');
  return data as ChatMessage[];
}

export async function postMessage(
  body: CreateMessagePayload
): Promise<ChatMessage> {
  const { baseUrl } = getApiConfig();
  const res = await fetch(`${baseUrl}/api/v1/messages`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Failed to send message (${res.status})`);
  }
  return (await res.json()) as ChatMessage;
}
