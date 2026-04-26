import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { ChatMessage } from '../api/types';
import { fetchMessages, postMessage } from '../api/messagesApi';
import { chatKeys } from '../lib/chatQueryKeys';
import { HIDDEN_TAB_MIN_POLL_MS, PAGE_SIZE, POLL_MS } from './chat/constants';
import { dedupeById, errorMessage } from './chat/messageUtils';

export { readStoredAuthor, writeStoredAuthor } from './chat/authorStorage';

export function useChat() {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: chatKeys.messages(),
    queryFn: async ({ client }) => {
      const key = chatKeys.messages();
      const prev = client.getQueryData<ChatMessage[]>(key);
      if (!prev?.length) {
        return dedupeById(await fetchMessages({ limit: PAGE_SIZE }));
      }
      const after = prev[prev.length - 1]!.createdAt;
      const newer = await fetchMessages({ limit: PAGE_SIZE, after });
      return dedupeById([...prev, ...newer]);
    },
    refetchInterval: () => {
      if (!navigator.onLine) return false;
      if (document.visibilityState === 'hidden') {
        return Math.max(HIDDEN_TAB_MIN_POLL_MS, POLL_MS * 3);
      }
      return POLL_MS;
    },
  });

  const sendMutation = useMutation({
    mutationFn: async ({ message, author }: { message: string; author: string }) => {
      return postMessage({ message, author });
    },
    onSuccess: (created) => {
      queryClient.setQueryData<ChatMessage[]>(chatKeys.messages(), (old) =>
        dedupeById([...(old ?? []), created]),
      );
    },
  });

  const send = useCallback(
    async (message: string, author: string) => {
      await sendMutation.mutateAsync({ message, author });
    },
    [sendMutation],
  );

  const reload = useCallback(() => messagesQuery.refetch(), [messagesQuery]);

  const setError = useCallback(
    (_value: string | null) => {
      sendMutation.reset();
    },
    [sendMutation],
  );

  const messages = messagesQuery.data ?? [];
  const loading = messagesQuery.isPending;
  const sending = sendMutation.isPending;

  const error =
    sendMutation.isError
      ? errorMessage(sendMutation.error, 'Failed to send')
      : messagesQuery.isError
        ? errorMessage(messagesQuery.error, 'Failed to load messages')
        : null;

  return {
    messages,
    loading,
    sending,
    error,
    setError,
    reload,
    send,
  };
}
