"use client";

import { useChat } from '@ai-sdk/react'; // AI SDK v4 UI
import { DefaultChatTransport } from 'ai';
import { useEffect, useMemo, useRef } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import type { ChatMessage } from '@/app/lib/types';
import { useChatStore } from '@/app/store/chatStore';

export default function ChatInterface() {
  const { threads, activeThreadId, addThread, addMessage } = useChatStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Ensure there is an active thread after hydration
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

  // Mirror SDK UI messages to local store for demo/state separation
  useEffect(() => {
    messages.forEach((m) => {
      // Safely map only text parts from UIMessage to our ChatMessage shape
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
      // Append if not exists
      const exists = activeMessages.some((msg) => msg.id === mapped.id);
      if (!exists) addMessage(mapped);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className="mx-auto flex h-[calc(100vh-80px)] max-w-3xl flex-col gap-4 p-4">
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-1">
        <MessageList messages={activeMessages} />
        {(status === 'submitted' || status === 'streaming') && (
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            AI가 입력 중...
          </div>
        )}
      </div>
      <div className="sticky bottom-0">
        <MessageInput
          disabled={status !== 'ready'}
          onSend={(text) => {
            sendMessage({ text });
            // auto scroll to bottom on send
            requestAnimationFrame(() => {
              scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
            });
          }}
        />
      </div>
    </div>
  );
}


