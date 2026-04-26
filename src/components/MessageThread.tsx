import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../api/types';
import { MessageItem } from './MessageItem';

type Props = {
  messages: ChatMessage[];
  myAuthor: string;
};

export function MessageThread({ messages, myAuthor }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const prevLen = useRef(messages.length);

  useEffect(() => {
    if (messages.length > prevLen.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    prevLen.current = messages.length;
  }, [messages.length]);

  return (
    <div className="min-h-0 flex-1 p-0" role="log" aria-relevant="additions" aria-live="polite">
      <div className="thread-scrollbar h-full max-h-[calc(100dvh-58px)] overflow-y-auto pr-0">
        <div className="mx-auto max-w-[680px] px-6 pt-4 pb-0">
          {messages.map((m) => (
            <MessageItem
              key={m._id}
              message={m}
              isOwn={myAuthor.trim().length > 0 && m.author.trim() === myAuthor.trim()}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
