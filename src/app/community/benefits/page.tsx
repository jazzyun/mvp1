'use client';

import Link from 'next/link';

const benefits = [
  {
    id: '1',
    name: 'Adobe Creative Cloud',
    description: '40% off annual subscription',
    partner: 'Adobe',
    icon: '🎨',
    category: 'Software',
    claimed: false,
  },
  {
    id: '2',
    name: 'Canva Pro',
    description: '3 months free trial',
    partner: 'Canva',
    icon: '✨',
    category: 'Design',
    claimed: true,
  },
  {
    id: '3',
    name: 'Ring Light Kit',
    description: '25% off professional lighting',
    partner: 'Lume Cube',
    icon: '💡',
    category: 'Equipment',
    claimed: false,
  },
  {
    id: '4',
    name: 'Epidemic Sound',
    description: '30 days free music licensing',
    partner: 'Epidemic Sound',
    icon: '🎵',
    category: 'Audio',
    claimed: false,
  },
  {
    id: '5',
    name: 'Later Pro',
    description: '50% off first 3 months',
    partner: 'Later',
    icon: '📅',
    category: 'Scheduling',
    claimed: false,
  },
  {
    id: '6',
    name: 'WeWork Hot Desk',
    description: '2 free day passes per month',
    partner: 'WeWork',
    icon: '🏢',
    category: 'Workspace',
    claimed: true,
  },
];

export default function BenefitsPage() {
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
              <h1 className="text-xl font-bold text-gray-900">Partner Perks</h1>
              <p className="text-sm text-gray-500">Exclusive discounts for members</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">$2,400+</p>
            <p className="text-sm text-gray-500">Total savings available</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-500">Benefits claimed</p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-3">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.name}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{benefit.description}</p>
                    <p className="text-xs text-gray-400 mt-1">by {benefit.partner}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  {benefit.category}
                </span>
              </div>
              <button
                className={`w-full mt-4 py-2.5 rounded-xl font-medium transition-colors ${
                  benefit.claimed
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                disabled={benefit.claimed}
              >
                {benefit.claimed ? 'Already Claimed' : 'Claim Benefit'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
