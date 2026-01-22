'use client'

import { useState, useEffect } from 'react'

const SITE_PASSWORD = '1111111'
const STORAGE_KEY = 'site_access_verified'

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const [welcomePhase, setWelcomePhase] = useState<'enter' | 'stay' | 'exit'>('enter')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY)
    setIsVerified(verified === 'true')
  }, [])

  // Welcome animation sequence
  useEffect(() => {
    if (showWelcome) {
      // Enter phase - text fades in
      const enterTimer = setTimeout(() => {
        setWelcomePhase('stay')
      }, 100)

      // Stay phase - hold for a moment
      const stayTimer = setTimeout(() => {
        setWelcomePhase('exit')
      }, 2000)

      // Exit phase - fade to white and show content
      const exitTimer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)

      return () => {
        clearTimeout(enterTimer)
        clearTimeout(stayTimer)
        clearTimeout(exitTimer)
      }
    }
  }, [showWelcome])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setIsVerified(true)
      setShowWelcome(true)
      setError(false)
    } else {
      setError(true)
      setPassword('')
    }
  }

  // Loading state
  if (isVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    )
  }

  // Password form
  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
              Access Required
            </h1>
            <p className="text-neutral-500 text-sm">
              Enter the password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                placeholder="Password"
                className={`w-full px-4 py-3 border rounded-lg text-center text-lg tracking-widest
                  ${error
                    ? 'border-red-500 bg-red-50'
                    : 'border-neutral-200 focus:border-neutral-900'
                  }
                  outline-none transition-colors`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Incorrect password
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-neutral-900 text-white rounded-lg font-medium
                hover:bg-neutral-800 active:scale-[0.98] transition-all"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Welcome splash screen
  if (showWelcome) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-1000 ease-out
          ${welcomePhase === 'exit' ? 'bg-white' : 'bg-[#E11D48]'}`}
      >
        <div
          className={`text-center transition-all duration-700 ease-out
            ${welcomePhase === 'enter' ? 'opacity-0 translate-y-4' : ''}
            ${welcomePhase === 'stay' ? 'opacity-100 translate-y-0' : ''}
            ${welcomePhase === 'exit' ? 'opacity-0 -translate-y-4' : ''}`}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Welcome home,
          </h1>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl text-white font-medium tracking-tight mt-2"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
              fontStyle: 'italic',
            }}
          >
            Hanna!
          </h1>

          {/* Subtle indicator */}
          <div
            className={`mt-12 transition-all duration-500 delay-300
              ${welcomePhase === 'stay' ? 'opacity-60' : 'opacity-0'}`}
          >
            <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
              <span className="w-8 h-[1px] bg-white/50"></span>
              <span style={{ fontStyle: 'italic' }}>your journey begins</span>
              <span className="w-8 h-[1px] bg-white/50"></span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Verified - show children
  return <>{children}</>
}
