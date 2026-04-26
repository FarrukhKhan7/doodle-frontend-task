import type { ChatMessage } from '../api/types';
import { formatMessageTime } from '../utils/formatTime';
import { cn } from '../lib/cn';

type Props = {
  message: ChatMessage;
  isOwn: boolean;
};

export function MessageItem({ message, isOwn }: Props) {
  const time = formatMessageTime(message.createdAt);

  return (
    <article
      className={cn('mb-4 flex', isOwn ? 'justify-end' : 'justify-start')}
      aria-label={`${message.author} at ${time}`}
    >
      <div className="max-w-[min(70vw,420px)]">
        <div
          className={cn(
            'rounded-lg shadow-sm',
            isOwn ? 'bg-warning-100 p-2' : 'bg-white p-4',
          )}
        >
          {!isOwn && (
            <div className="mb-1 flex items-baseline text-sm leading-tight text-slate-400">
              <span className="leading-none font-bold text-slate-300">{message.author}</span>
            </div>
          )}
          <p
            className={cn(
              'm-0 whitespace-pre-wrap text-base leading-relaxed text-slate-700 wrap-anywhere',
              isOwn && 'px-2 pt-2 pb-0',
            )}
          >
            {message.message}
          </p>
          <div
            className={cn(
              'mt-1.5 flex items-baseline text-sm leading-tight text-slate-400',
              isOwn ? 'justify-end pl-2' : 'justify-start',
            )}
          >
            <span className="text-xs text-slate-400">{time}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
