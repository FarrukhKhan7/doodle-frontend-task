import type { ChatMessage } from '../../api/types';

export function sortByCreatedAtAsc(a: ChatMessage, b: ChatMessage): number {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export function dedupeById(messages: ChatMessage[]): ChatMessage[] {
  const map = new Map<string, ChatMessage>();
  for (const m of messages) map.set(m._id, m);
  return [...map.values()].sort(sortByCreatedAtAsc);
}

export function errorMessage(e: unknown, fallback: string): string {
  return e instanceof Error ? e.message : fallback;
}
