'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/community" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">The Haus</h1>
              <p className="text-sm text-gray-500">Our philosophy</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white text-center">
          <span className="text-5xl mb-4 block">🏠</span>
          <h2 className="text-2xl font-bold mb-2">Welcome to The Haus</h2>
          <p className="text-gray-400">A creator operating system built by creators, for creators.</p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            We believe creators deserve better than endless DMs, confusing contracts, and unfair rates.
            The Haus is your command center - where AI handles the busywork so you can focus on creating.
          </p>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">What We Stand For</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl">
                🚫
              </div>
              <div>
                <p className="font-medium text-gray-900">No Vanity Metrics</p>
                <p className="text-sm text-gray-600">We don&apos;t care about your follower count. We care about your craft and your community.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                🤝
              </div>
              <div>
                <p className="font-medium text-gray-900">Creator-First Always</p>
                <p className="text-sm text-gray-600">Every feature, every decision is made with creators in mind. We&apos;re on your side.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                🔒
              </div>
              <div>
                <p className="font-medium text-gray-900">Privacy & Trust</p>
                <p className="text-sm text-gray-600">Your data is yours. We never sell it. Anonymous means anonymous.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <p className="font-medium text-gray-900">AI as Your Partner</p>
                <p className="text-sm text-gray-600">AI should augment your creativity, not replace it. We build tools that make you more powerful.</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Vision */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">The Vision</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Imagine a world where creators don&apos;t have to be business experts to succeed. Where fair pay is the norm,
            not the exception. Where community support is just a tap away.
          </p>
          <p className="text-gray-600 leading-relaxed">
            That&apos;s what we&apos;re building. One feature at a time. Together.
          </p>
        </div>

        {/* Team */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Built By Creators</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            The Haus team has collectively earned over $2M from brand deals. We&apos;ve felt the pain of bad contracts,
            late payments, and creative burnout. That&apos;s why we built this.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs">J</div>
              <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">S</div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs">M</div>
              <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-xs">K</div>
            </div>
            <p className="text-sm text-gray-500">& the growing Haus community</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">Ready to join us?</p>
          <Link
            href="/community/pricing"
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            View Membership Options
          </Link>
        </div>
      </main>
    </div>
  );
}
