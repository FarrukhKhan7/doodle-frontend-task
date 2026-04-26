import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { readStoredAuthor, writeStoredAuthor } from '../hooks/useChat';
import { validateAuthor } from '../utils/validation';

export type ChatSessionValue = {
  author: string;
  nameDraft: string;
  nameError: string | null;
  setNameDraft: (value: string) => void;
  submitAuthor: (event: FormEvent<HTMLFormElement>) => void;
};

const ChatSessionContext = createContext<ChatSessionValue | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export function ChatSessionProvider({ children }: ProviderProps) {
  const [author, setAuthor] = useState(() => readStoredAuthor());
  const [nameDraft, setNameDraft] = useState(() => readStoredAuthor());
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    writeStoredAuthor(author);
  }, [author]);

  const submitAuthor = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const maybeError = validateAuthor(nameDraft);
      if (maybeError) {
        setNameError(maybeError);
        return;
      }
      setNameError(null);
      setAuthor(nameDraft.trim());
    },
    [nameDraft],
  );

  const value = useMemo<ChatSessionValue>(
    () => ({
      author,
      nameDraft,
      nameError,
      setNameDraft,
      submitAuthor,
    }),
    [author, nameDraft, nameError, submitAuthor],
  );

  return <ChatSessionContext.Provider value={value}>{children}</ChatSessionContext.Provider>;
}

export function useChatSession(): ChatSessionValue {
  const ctx = useContext(ChatSessionContext);
  if (ctx == null) {
    throw new Error('useChatSession must be used within ChatSessionProvider');
  }
  return ctx;
}
