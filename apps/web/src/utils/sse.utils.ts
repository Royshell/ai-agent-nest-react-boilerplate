import type { StreamEvent } from '../types/chat.types';

export function parseSseLines(buffer: string): {
  events: StreamEvent[];
  rest: string;
} {
  const parts = buffer.split('\n\n');
  const rest = parts.pop() ?? '';
  const events: StreamEvent[] = [];

  for (const part of parts) {
    const lines = part.split('\n').map((l) => l.trimEnd());

    let eventName = 'message';
    const dataLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith('event:')) {
        eventName = line.slice('event:'.length).trim();
      } else if (line.startsWith('data:')) {
        dataLines.push(line.slice('data:'.length).trim());
      }
    }

    const dataStr = dataLines.join('\n');
    if (!dataStr) {
      continue;
    }

    try {
      const payload = JSON.parse(dataStr);

      if (eventName === 'done') {
        events.push({ type: 'done' });
      } else if (typeof payload?.token === 'string') {
        events.push({ type: 'token', token: payload.token });
      } else {
        events.push({ type: 'error', message: 'Unexpected SSE payload' });
      }
    } catch {
      events.push({ type: 'token', token: dataStr });
    }
  }

  return { events, rest };
}
