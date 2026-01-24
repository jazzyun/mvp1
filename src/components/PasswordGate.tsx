'use client'

import { useState, useEffect, useRef } from 'react'

const SITE_PASSWORD = '1111111'
const STORAGE_KEY = 'site_access_verified'
const INTRO_SHOWN_KEY = 'intro_shown_session'

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [showIntro, setShowIntro] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY)
    const introShown = sessionStorage.getItem(INTRO_SHOWN_KEY)
    setIsVerified(verified === 'true')
    // Show intro video only once per session
    if (verified === 'true' && !introShown) {
      setShowIntro(true)
      sessionStorage.setItem(INTRO_SHOWN_KEY, 'true')
    }
  }, [])

  // Try to play video when intro shows
  useEffect(() => {
    if (showIntro && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay failed, user will need to tap
      })
    }
  }, [showIntro])

  const handleVideoEnd = () => {
    setShowIntro(false)
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true')
      sessionStorage.setItem(INTRO_SHOWN_KEY, 'true')
      setIsVerified(true)
      setShowIntro(true)
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

  // Video intro
  if (showIntro) {
    return (
      <div
        className="fixed inset-0 bg-black cursor-pointer"
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          controls={false}
          src="/intro.mp4"
        />
      </div>
    )
  }

  // Verified - show children (main app)
  return <>{children}</>
}
