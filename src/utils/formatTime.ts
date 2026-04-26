const formatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: false,
});

export function formatMessageTime(iso: string): string {
  try {
    const date = new Date(iso);
    const parts = formatter.formatToParts(date);
    const valueFor = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? '';

    const day = valueFor('day');
    const month = valueFor('month');
    const year = valueFor('year');
    const hour = valueFor('hour');
    const minute = valueFor('minute');

    return `${day} ${month} ${year} ${hour}:${minute}`.trim();
  } catch {
    return iso;
  }
}
