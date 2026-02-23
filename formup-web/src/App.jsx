import { AuthProvider, useAuth } from './providers/AuthProvider'
import LoginScreen from './screens/LoginScreen'
import Dashboard from './screens/Dashboard'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f1419',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, margin: '0 auto 16px',
            overflow: 'hidden',
          }}>
            <img src="/logo.png" alt="Form Up" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
          <div style={{
            width: 24, height: 24, border: '3px solid #2a3a4a',
            borderTopColor: '#c41e1e', borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    )
  }

  return user ? <Dashboard /> : <LoginScreen />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
