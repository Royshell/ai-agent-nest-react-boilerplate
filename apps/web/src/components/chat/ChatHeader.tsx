export function ChatHeader() {
  return (
    <div
      style={{
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
        AI Chat Assistant
      </h1>
    </div>
  );
}
