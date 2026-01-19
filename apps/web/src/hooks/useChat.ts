import type { Message } from './../types/chat.types';
import { useRef, useState } from 'react';
import { parseSseLines } from '../utils/sse.utils';

export function useChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! How can I help you today?',
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');

  const abortControllerRef = useRef<AbortController | null>(null);

  const send = async () => {
    const prompt = input.trim();
    if (!prompt || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setStreamingContent('');
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = '';
      let fullContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parsed = parseSseLines(buffer);
        buffer = parsed.rest;

        for (const event of parsed.events) {
          if (event.type === 'token') {
            fullContent += event.token;
            setStreamingContent(fullContent);
          } else if (event.type === 'error') {
            fullContent += `\n\n[Error] ${event.message}`;
            setStreamingContent(fullContent);
          }
        }
      }

      if (fullContent) {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: fullContent,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Error: ${error.message}`,
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsStreaming(false);
      setStreamingContent('');
      abortControllerRef.current = null;
    }
  };

  const stop = () => {
    abortControllerRef.current?.abort();
  };

  return {
    input,
    setInput,
    messages,
    isStreaming,
    streamingContent,
    send,
    stop,
  };
}
