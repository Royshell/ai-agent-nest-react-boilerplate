interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
}

export function ChatInput({
  input,
  isStreaming,
  onInputChange,
  onSend,
  onStop,
}: ChatInputProps) {
  return (
    <div
      style={{
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type a message..."
          disabled={isStreaming}
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: '24px',
            border: 'none',
            fontSize: '15px',
            outline: 'none',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        {isStreaming ? (
          <button
            onClick={onStop}
            style={{
              padding: '14px 28px',
              borderRadius: '24px',
              border: 'none',
              background: '#ef4444',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Stop
          </button>
        ) : (
          <button
            onClick={onSend}
            disabled={!input.trim()}
            style={{
              padding: '14px 28px',
              borderRadius: '24px',
              border: 'none',
              background: input.trim()
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#d1d5db',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (input.trim()) {
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}
