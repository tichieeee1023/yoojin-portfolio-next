export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  projectIds?: string[];
};

export type ChatStreamEvent =
  | { type: 'delta'; text: string }
  | { type: 'done'; answer: string; projectIds: string[] }
  | { type: 'error'; message: string };

export const CHAT_LIMITS = {
  messageLength: 2000,
  answerLength: 8000,
  historyLength: 13,
  totalLength: 12000,
} as const;
