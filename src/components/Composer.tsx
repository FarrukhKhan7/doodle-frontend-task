import { useId, useState, type FormEvent } from 'react';
import { buttonVariants, inputVariants } from './ui/styles';
import { cn } from '../lib/cn';
import { COPY } from '../constants/copy';
import { validateMessage } from '../utils/validation';

type Props = {
  disabled: boolean;
  onSend: (message: string) => Promise<void>;
};

export function Composer({ disabled, onSend }: Props) {
  const [text, setText] = useState('');
  const messageId = useId();
  const canSend = validateMessage(text) === null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const messageError = validateMessage(text);
    if (messageError) {
      return;
    }

    try {
      await onSend(text.trim());
      setText('');
    } catch {}
  }

  return (
    <form className="mx-auto max-w-[632px]" onSubmit={handleSubmit}>
      <div className="flex w-full items-center gap-2">
        <label className="visually-hidden" htmlFor={messageId}>
          {COPY.chat.messageLabel}
        </label>
        <input
          id={messageId}
          className={cn(inputVariants({ intent: 'chat' }), 'min-w-0 flex-1 px-2')}
          name="message"
          maxLength={500}
          placeholder={COPY.chat.messagePlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
        />
        <button
          className={cn(
            buttonVariants({ intent: 'accent' }),
            'w-[86px] shrink-0 rounded-md font-mono text-base leading-none max-[640px]:w-[78px]',
          )}
          type="submit"
          disabled={disabled || !canSend}
        >
          {COPY.chat.sendAction}
        </button>
      </div>
    </form>
  );
}
