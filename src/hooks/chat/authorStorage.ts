import { AUTHOR_KEY } from './constants';

export function readStoredAuthor(): string {
  try {
    return (localStorage.getItem(AUTHOR_KEY) ?? '').trim();
  } catch {
    return '';
  }
}

export function writeStoredAuthor(value: string): void {
  try {
    localStorage.setItem(AUTHOR_KEY, value);
  } catch {}
}
