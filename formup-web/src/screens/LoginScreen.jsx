import { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'

export default function LoginScreen() {
  const { signIn, signUp, resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [mode, setMode] = useState('login') // login | signup | forgot
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else if (mode === 'signup') {
        await signUp(email, password, fullName)
        setMessage('Check your email to confirm your account.')
        setMode('login')
      } else if (mode === 'forgot') {
        await resetPassword(email)
        setMessage('Password reset link sent to your email.')
        setMode('login')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0f1419',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18, margin: '0 auto 16px',
            overflow: 'hidden',
          }}>
            <img src="/logo.png" alt="Form Up" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
          <h1 style={{
            fontSize: 28, fontWeight: 800, color: '#fff',
            letterSpacing: -0.5, marginBottom: 4,
          }}>Form Up</h1>
          <p style={{ fontSize: 14, color: '#586878' }}>
            {mode === 'login' ? 'Sign in to your office dashboard' :
             mode === 'signup' ? 'Create your account' :
             'Reset your password'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: '#1c2a38', borderRadius: 16, padding: 28,
          border: '1px solid #2a3a4a',
        }}>
          {error && (
            <div style={{
              background: '#ef444418', border: '1px solid #ef444440',
              borderRadius: 10, padding: '10px 14px', marginBottom: 16,
              fontSize: 13, color: '#ef4444', fontWeight: 600,
            }}>{error}</div>
          )}

          {message && (
            <div style={{
              background: '#22c55e18', border: '1px solid #22c55e40',
              borderRadius: 10, padding: '10px 14px', marginBottom: 16,
              fontSize: 13, color: '#22c55e', fontWeight: 600,
            }}>{message}</div>
          )}

          {mode === 'signup' && (
            <div style={{ marginBottom: 14 }}>
              <label style={{
                fontSize: 11, fontWeight: 700, color: '#586878',
                display: 'block', marginBottom: 6, textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>Full Name</label>
              <input
                type="text" value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Pat Breen"
                required
                style={inputStyle}
              />
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={{
              fontSize: 11, fontWeight: 700, color: '#586878',
              display: 'block', marginBottom: 6, textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>Email</label>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pat@breenmasonry.com"
              required
              style={inputStyle}
            />
          </div>

          {mode !== 'forgot' && (
            <div style={{ marginBottom: 20 }}>
              <label style={{
                fontSize: 11, fontWeight: 700, color: '#586878',
                display: 'block', marginBottom: 6, textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>Password</label>
              <input
                type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={inputStyle}
              />
            </div>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px 20px', borderRadius: 12,
              background: 'linear-gradient(135deg, #c41e1e, #e63939)',
              border: 'none', color: '#fff', fontWeight: 800, fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 12px rgba(196, 30, 30, 0.3)',
              transition: 'all 0.15s ease',
            }}
          >
            {loading ? '...' :
             mode === 'login' ? 'Sign In' :
             mode === 'signup' ? 'Create Account' :
             'Send Reset Link'}
          </button>

          {/* Links */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 16, fontSize: 13,
          }}>
            {mode === 'login' ? (
              <>
                <button type="button" onClick={() => { setMode('signup'); setError('') }}
                  style={linkStyle}>Create account</button>
                <button type="button" onClick={() => { setMode('forgot'); setError('') }}
                  style={linkStyle}>Forgot password?</button>
              </>
            ) : (
              <button type="button" onClick={() => { setMode('login'); setError('') }}
                style={linkStyle}>← Back to sign in</button>
            )}
          </div>
        </form>

        <p style={{
          textAlign: 'center', fontSize: 11, color: '#3a4a5a',
          marginTop: 24,
        }}>
          Built for contractors, by contractors.
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 10,
  border: '1px solid #2a3a4a', background: '#0f1419',
  color: '#e8ecf1', fontSize: 15, fontFamily: 'inherit',
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.15s ease',
}

const linkStyle = {
  background: 'none', border: 'none', color: '#e63939',
  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
  fontSize: 13, padding: 0,
}
