import { MessageThread } from '../components/MessageThread';
import { Composer } from '../components/Composer';
import { StatusBar } from '../components/StatusBar';
import { WelcomeModal } from '../components/WelcomeModal';
import { ChatStateNotice } from '../components/ChatStateNotice';
import { useChatSession } from '../context/ChatSessionContext';
import { useChat } from '../hooks/useChat';
import { COPY } from '../constants/copy';

export function ChatPage() {
  const { author, nameDraft, nameError, setNameDraft, submitAuthor } = useChatSession();
  const { messages, loading, sending, error, setError, reload, send } = useChat();

  return (
    <>
      {!author ? (
        <WelcomeModal nameDraft={nameDraft} nameError={nameError} onNameChange={setNameDraft} onSubmit={submitAuthor} />
      ) : null}

      <StatusBar error={error} onRetry={() => void reload()} />

      <main className="flex min-h-0 flex-1">
        {loading && messages.length === 0 ? <ChatStateNotice message={COPY.chat.loading} role="status" /> : null}

        {!loading && messages.length === 0 && !error ? <ChatStateNotice message={COPY.chat.empty} /> : null}

        {messages.length > 0 ? <MessageThread messages={messages} myAuthor={author} /> : null}
      </main>

      <footer className="shrink-0 grow-0 bg-primary-500 p-2">
        <Composer
          disabled={!author || loading || sending}
          onSend={async (message) => {
            setError(null);
            await send(message, author);
          }}
        />
      </footer>
    </>
  );
}
