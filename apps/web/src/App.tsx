import Chat from './components/chat/Chat';
import './App.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 1rem',
        background: 'transparent', // ✅ הקונטיינר החיצוני שקוף
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 720,
          height: 'calc(100vh - 7rem)', // ✅ "ארוך" באמצע המסך (4rem = padding למעלה+למטה)
        }}
      >
        <Chat
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>
    </div>
  );
}

export default App;
