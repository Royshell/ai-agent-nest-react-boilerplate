import { useEffect, useRef } from 'react';
import { useChat } from '../../hooks/useChat';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';

type ChatProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function Chat({ className, style }: ChatProps) {
  const {
    input,
    setInput,
    messages,
    isStreaming,
    streamingContent,
    send,
    stop,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, isStreaming]);

  return (
    <div
      className={className}
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        ...style,
      }}
    >
      <ChatHeader />

      {/* Messages Container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Streaming Message */}
        {isStreaming && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              animation: 'slideIn 0.3s ease-out',
            }}
          >
            <div
              style={{
                maxWidth: 500,
                width: '100%',
                borderRadius: '18px',
                background: 'white',
                color: '#1f2937',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
              }}
            >
              {streamingContent ? (
                <div
                  style={{
                    padding: '1rem 1.5rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    textAlign: 'left',
                  }}
                >
                  {streamingContent}
                </div>
              ) : (
                <TypingIndicator />
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        input={input}
        isStreaming={isStreaming}
        onInputChange={setInput}
        onSend={send}
        onStop={stop}
      />

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
