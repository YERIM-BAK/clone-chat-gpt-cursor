import { create, type StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatMessage, ChatThread } from '@/app/lib/types';

interface ChatState {
  threads: ChatThread[];
  activeThreadId: string | null;
  isSending: boolean;
  setActiveThread: (threadId: string) => void;
  addThread: () => string;
  addMessage: (message: ChatMessage) => void;
  updateMessageStatus: (id: string, status: ChatMessage['status']) => void;
  clear: () => void;
}

const creator: StateCreator<ChatState> = (set, get) => ({
  threads: [],
  activeThreadId: null,
  isSending: false,

      setActiveThread: (threadId: string) => set({ activeThreadId: threadId }),

  addThread: () => {
    const id = crypto.randomUUID();
    const now = Date.now();
        const thread: ChatThread = {
      id,
      title: 'New chat',
      messages: [],
      createdAt: now,
      updatedAt: now,
    };
        set((state: ChatState) => ({ threads: [thread, ...state.threads], activeThreadId: id }));
    return id;
  },

      addMessage: (message: ChatMessage) =>
        set((state: ChatState) => {
          const threads = state.threads.map((t: ChatThread) =>
        t.id === (state.activeThreadId ?? t.id)
          ? { ...t, messages: [...t.messages, message], updatedAt: Date.now() }
          : t,
      );
      return { threads };
    }),

      updateMessageStatus: (id: string, status: ChatMessage['status']) =>
        set((state: ChatState) => {
          const threads = state.threads.map((t: ChatThread) => ({
        ...t,
            messages: t.messages.map((m: ChatMessage) => (m.id === id ? { ...m, status } : m)),
      }));
      return { threads };
    }),

      clear: () => set({ threads: [], activeThreadId: null }),
});

export const useChatStore = create<ChatState>()(
  persist(creator, 
    {
      name: 'chat-store-v1',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : undefined as any,
      ),
      partialize: (state) => ({ threads: state.threads, activeThreadId: state.activeThreadId }),
      version: 1,
    },
  ),
);


