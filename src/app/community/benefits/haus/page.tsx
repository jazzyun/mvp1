'use client';

import Link from 'next/link';

const hausBenefits = [
  {
    id: '1',
    name: 'Priority Deal Access',
    description: 'Get brand deals 48 hours before general members',
    icon: '⚡',
    available: true,
  },
  {
    id: '2',
    name: '1-on-1 Strategy Call',
    description: 'Monthly call with a Haus advisor',
    icon: '📞',
    available: true,
  },
  {
    id: '3',
    name: 'Contract Review',
    description: 'Professional review of up to 5 contracts/month',
    icon: '📝',
    available: true,
  },
  {
    id: '4',
    name: 'Featured Spotlight',
    description: 'Get featured in our newsletter (50K+ subscribers)',
    icon: '🌟',
    available: true,
  },
  {
    id: '5',
    name: 'Private Events',
    description: 'Access to exclusive Pro-only meetups',
    icon: '🎉',
    available: true,
  },
  {
    id: '6',
    name: 'AI Priority Queue',
    description: 'Faster responses from Haus AI',
    icon: '🤖',
    available: true,
  },
];

export default function HausBenefitsPage() {
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
              <h1 className="text-xl font-bold text-gray-900">Haus Benefits</h1>
              <p className="text-sm text-gray-500">Premium member perks</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Pro Badge */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">👑</span>
            <div>
              <h2 className="font-bold text-lg">Pro Member</h2>
              <p className="text-sm text-purple-200">All benefits unlocked</p>
            </div>
          </div>
          <p className="text-sm text-purple-100">
            You have access to all Haus Pro benefits. Thank you for being a premium member!
          </p>
        </div>

        {/* Benefits List */}
        <div className="space-y-3">
          {hausBenefits.map((benefit) => (
            <div key={benefit.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl">
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{benefit.name}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2.5 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-colors">
                Use Benefit
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
