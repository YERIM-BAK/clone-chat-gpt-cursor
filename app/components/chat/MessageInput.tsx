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
        className="flex-1 rounded-md border px-3 py-2 bg-transparent"
        placeholder="메시지를 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button
        className="rounded-md border px-4 py-2 disabled:opacity-50"
        type="submit"
        disabled={disabled}
      >
        전송
      </button>
    </form>
  );
}


