"use client";

import type { ChatMessage } from '@/app/lib/types';

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((m) => {
        const isUser = m.role === 'user';
        const time = m.createdAt ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        return (
          <div key={m.id} className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
              <div className="size-8 shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">AI</div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${isUser ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-sm'}`}>
              {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
              <div className={`mt-1 text-[10px] ${isUser ? 'text-emerald-100/80' : 'text-gray-500'}`}>{time}</div>
            </div>
            {isUser && (
              <div className="size-8 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-medium">U</div>
            )}
          </div>
        );
      })}
    </div>
  );
}


