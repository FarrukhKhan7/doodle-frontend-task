const AUTHOR_RE = /^[\w\s-]+$/;

export function validateAuthor(author: string): string | null {
  const t = author.trim();
  if (t.length < 1) return 'Author is required.';
  if (t.length > 50) return 'Author must be at most 50 characters.';
  if (!AUTHOR_RE.test(t)) {
    return 'Author can only use letters, numbers, spaces, hyphens, and underscores.';
  }
  return null;
}

export function validateMessage(message: string): string | null {
  const t = message.trim();
  if (t.length < 1) return 'Message cannot be empty.';
  if (t.length > 500) return 'Message must be at most 500 characters.';
  return null;
}
