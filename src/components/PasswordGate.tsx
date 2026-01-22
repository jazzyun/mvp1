'use client'

import { useState, useEffect } from 'react'

const SITE_PASSWORD = '1111111'
const STORAGE_KEY = 'site_access_verified'

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const [welcomePhase, setWelcomePhase] = useState<'intro' | 'enter' | 'stay' | 'exit'>('intro')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY)
    setIsVerified(verified === 'true')
    // Show welcome screen every time for verified users
    if (verified === 'true') {
      setShowWelcome(true)
    }
  }, [])

  // Welcome animation sequence
  useEffect(() => {
    if (showWelcome) {
      // Intro phase - animated logo/rings
      const introTimer = setTimeout(() => {
        setWelcomePhase('enter')
      }, 2000)

      // Enter phase - text fades in
      const enterTimer = setTimeout(() => {
        setWelcomePhase('stay')
      }, 2100)

      // Stay phase - hold for a moment
      const stayTimer = setTimeout(() => {
        setWelcomePhase('exit')
      }, 5100)

      // Exit phase - fade to white and show content
      const exitTimer = setTimeout(() => {
        setShowWelcome(false)
      }, 6100)

      return () => {
        clearTimeout(introTimer)
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
        className={`min-h-screen flex flex-col items-center justify-center px-4 transition-all duration-1000 ease-out overflow-hidden
          ${welcomePhase === 'exit' ? 'bg-white' : 'bg-[#E11D48]'}`}
      >
        {/* Animated Intro */}
        {welcomePhase === 'intro' && (
          <div className="relative flex items-center justify-center">
            {/* Expanding rings */}
            <div className="absolute w-20 h-20 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '1.5s' }} />
            <div className="absolute w-32 h-32 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.2s' }} />
            <div className="absolute w-48 h-48 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.4s' }} />

            {/* Center icon - Heart/Home */}
            <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Welcome Text */}
        <div
          className={`text-center transition-all duration-700 ease-out
            ${welcomePhase === 'intro' ? 'opacity-0 scale-95' : ''}
            ${welcomePhase === 'enter' ? 'opacity-0 translate-y-4' : ''}
            ${welcomePhase === 'stay' ? 'opacity-100 translate-y-0' : ''}
            ${welcomePhase === 'exit' ? 'opacity-0 -translate-y-4' : ''}`}
        >
          {welcomePhase !== 'intro' && (
            <>
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

              {/* Subtitle */}
              <div
                className={`mt-10 transition-all duration-500 delay-300
                  ${welcomePhase === 'stay' ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="flex items-center justify-center gap-3 text-white text-base">
                  <span className="w-10 h-[2px] bg-white/70"></span>
                  <span className="font-light tracking-wide" style={{ fontStyle: 'italic' }}>Where everything starts and end</span>
                  <span className="w-10 h-[2px] bg-white/70"></span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // Verified - show children
  return <>{children}</>
}
