export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessagePartText {
  type: 'text';
  text: string;
}

export type ChatMessagePart = ChatMessagePartText;

export interface ChatMessage {
  id: string;
  role: ChatRole;
  parts: ChatMessagePart[];
  createdAt?: number;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatThread {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}


