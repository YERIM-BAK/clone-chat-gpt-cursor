"use client";

import { useEffect, useRef } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatController } from '@/app/hooks/useChatController';

export default function ChatInterface() {
  const { messages, status, send } = useChatController();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === 'streaming' || status === 'ready') {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [status, messages]);

  return (
    <div className="mx-auto flex h-[calc(100vh-80px)] max-w-3xl flex-col gap-4 p-4">
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-1">
        <MessageList messages={messages} />
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
            send(text);
            requestAnimationFrame(() => {
              scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
            });
          }}
        />
      </div>
    </div>
  );
}


