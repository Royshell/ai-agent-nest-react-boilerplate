import type { Message } from '../../types/chat.types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <div
        style={{
          width: '500px',
          padding: '1rem 1.5rem',
          borderRadius: '18px',
          background:
            message.role === 'user'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'white',
          color: message.role === 'user' ? 'white' : '#1f2937',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          textAlign: 'left',
        }}
      >
        {message.content}
      </div>
    </div>
  );
}
