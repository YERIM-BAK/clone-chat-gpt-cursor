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
              <div className="size-8 shrink-0 rounded-full bg-muted text-foreground/80 flex items-center justify-center text-xs font-medium">AI</div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${isUser ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'}`}>
              {m.parts.map((p, i) => (p.type === 'text' ? <span key={i}>{p.text}</span> : null))}
              <div className={`mt-1 text-xs ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{time}</div>
            </div>
            {isUser && (
              <div className="size-8 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">U</div>
            )}
          </div>
        );
      })}
    </div>
  );
}


