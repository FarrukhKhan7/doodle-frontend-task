import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ChatSessionProvider } from './context/ChatSessionContext';
import { createQueryClient } from './lib/queryClient';
import './styles/globals.css';

const queryClient = createQueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChatSessionProvider>
        <App />
      </ChatSessionProvider>
    </QueryClientProvider>
  </StrictMode>,
);
