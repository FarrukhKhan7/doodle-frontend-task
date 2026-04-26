import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function ChatLayout({ children }: Props) {
  return <div className="app-bg flex min-h-dvh flex-col bg-slate-300">{children}</div>;
}
