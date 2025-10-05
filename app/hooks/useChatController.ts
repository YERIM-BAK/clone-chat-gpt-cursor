"use client";

import { useEffect, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { ChatMessage } from '@/app/lib/types';
import { useChatStore } from '@/app/store/chatStore';

export interface UseChatControllerResult {
  messages: ChatMessage[];
  status: 'submitted' | 'streaming' | 'ready' | 'error';
  send: (text: string) => void;
}

export function useChatController(): UseChatControllerResult {
  const { threads, activeThreadId, addThread, addMessage } = useChatStore();

  // Ensure one active thread exists after hydration
  useEffect(() => {
    if (!activeThreadId) addThread();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeThreadId]);

  const activeMessages: ChatMessage[] = useMemo(() => {
    const t = threads.find((thread) => thread.id === activeThreadId);
    return t?.messages ?? [];
  }, [threads, activeThreadId]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  // Mirror SDK UI messages to local store, text parts only
  useEffect(() => {
    messages.forEach((m) => {
      const textParts = (Array.isArray(m.parts) ? m.parts : [])
        .filter((part): part is { type: 'text'; text: string } => {
          if (!part || typeof part !== 'object') return false;
          const obj = part as Record<string, unknown>;
          return obj.type === 'text' && typeof obj.text === 'string';
        })
        .map((p) => ({ type: 'text' as const, text: p.text }));

      const mapped: ChatMessage = {
        id: m.id,
        role: m.role,
        parts: textParts,
      };
      const exists = activeMessages.some((msg) => msg.id === mapped.id);
      if (!exists) addMessage(mapped);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return {
    messages: activeMessages,
    status,
    send: (text: string) => sendMessage({ text }),
  };
}


