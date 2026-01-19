export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export type StreamEvent =
  { type: 'token'; token: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

