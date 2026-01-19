export function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 2, padding: '1rem 1.5rem' }}>
      <style>
        {`
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-8px); }
          }
          .dot {
            width: 8px;
            height: 8px;
            background: #94a3b8;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out;
          }
          .dot:nth-child(1) { animation-delay: 0s; }
          .dot:nth-child(2) { animation-delay: 0.2s; }
          .dot:nth-child(3) { animation-delay: 0.4s; }
        `}
      </style>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
}
