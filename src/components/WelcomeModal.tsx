import type { FormEvent } from 'react';
import { COPY } from '../constants/copy';
import { buttonVariants, inputVariants } from './ui/styles';
import { cn } from '../lib/cn';

type Props = {
  nameDraft: string;
  nameError: string | null;
  onNameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function WelcomeModal({ nameDraft, nameError, onNameChange, onSubmit }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/45 p-4 max-[640px]:p-3"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <form className="w-[min(94vw,400px)] rounded-xl bg-white px-4 pt-4 pb-4 shadow-xl max-[640px]:w-full" onSubmit={onSubmit}>
        <h1 id="welcome-title" className="mb-2 text-2xl leading-tight text-slate-700">
          {COPY.welcome.title}
        </h1>
        <p className="mb-3 text-sm text-slate-500">{COPY.welcome.subtitle}</p>
        <label className="visually-hidden" htmlFor="welcome-name">
          {COPY.welcome.nameLabel}
        </label>
        <input
          id="welcome-name"
          className={inputVariants()}
          name="author"
          maxLength={50}
          placeholder={COPY.welcome.namePlaceholder}
          value={nameDraft}
          onChange={(e) => onNameChange(e.target.value)}
          autoFocus
        />
        {nameError ? (
          <p className="mt-2 text-xs text-red-700" role="alert">
            {nameError}
          </p>
        ) : null}
        <button className={cn(buttonVariants({ intent: 'primary', size: 'sm', width: 'full' }), 'mt-3')} type="submit">
          {COPY.welcome.enterAction}
        </button>
      </form>
    </div>
  );
}
