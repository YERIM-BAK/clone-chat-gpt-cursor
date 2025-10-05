"use client";

import { useState } from 'react';

interface MessageInputProps {
  disabled?: boolean;
  onSend: (text: string) => void;
}

export function MessageInput({ disabled, onSend }: MessageInputProps) {
  const [value, setValue] = useState('');

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const text = value.trim();
        if (!text) return;
        onSend(text);
        setValue('');
      }}
    >
      <input
        className="flex-1 rounded-md border border-input bg-background px-3 py-2 focus:outline-ring/50"
        placeholder="메시지를 입력하세요... (Enter 전송, Shift+Enter 줄바꿈)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        aria-label="메시지 입력"
      />
      <button
        className="rounded-md border border-border bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 disabled:opacity-50"
        type="submit"
        disabled={disabled}
        aria-label="메시지 전송"
      >
        전송
      </button>
    </form>
  );
}


