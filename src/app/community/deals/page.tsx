'use client';

import Link from 'next/link';
import { useState } from 'react';

const brandDeals = [
  {
    id: '1',
    brand: 'Notion',
    title: 'Productivity Creator Campaign',
    description: 'Looking for creators to showcase Notion for content planning. Must have experience with productivity tools.',
    compensation: '$2,000 - $5,000',
    requirements: '50K+ followers, 3%+ engagement',
    deadline: 'Feb 20, 2025',
    slots: 10,
    filled: 6,
    category: 'Tech',
    isNew: true,
    applied: false,
    logo: '📝',
  },
  {
    id: '2',
    brand: 'Athletic Greens',
    title: 'Morning Routine Integration',
    description: 'Share how AG1 fits into your morning routine. Looking for authentic lifestyle creators.',
    compensation: '$3,000 + product',
    requirements: '100K+ followers, lifestyle niche',
    deadline: 'Feb 28, 2025',
    slots: 5,
    filled: 2,
    category: 'Health',
    isNew: true,
    applied: false,
    logo: '🥬',
  },
  {
    id: '3',
    brand: 'Skillshare',
    title: 'Learning Journey Series',
    description: 'Document your experience learning a new skill on Skillshare. 3-video series over 1 month.',
    compensation: '$4,500',
    requirements: '75K+ followers, any niche',
    deadline: 'Mar 5, 2025',
    slots: 8,
    filled: 5,
    category: 'Education',
    isNew: false,
    applied: true,
    applicationStatus: 'pending',
    logo: '🎓',
  },
  {
    id: '4',
    brand: 'Squarespace',
    title: 'Creator Portfolio Showcase',
    description: 'Build or refresh your portfolio using Squarespace. Perfect for creators looking to establish their brand.',
    compensation: '$2,500',
    requirements: '25K+ followers, any niche',
    deadline: 'Mar 10, 2025',
    slots: 15,
    filled: 8,
    category: 'Tech',
    isNew: false,
    applied: false,
    logo: '🖼️',
  },
  {
    id: '5',
    brand: 'Oura Ring',
    title: 'Sleep & Recovery Content',
    description: 'Share your health optimization journey with Oura. Looking for fitness and wellness creators.',
    compensation: '$3,500 + ring',
    requirements: '100K+ followers, health/fitness niche',
    deadline: 'Feb 25, 2025',
    slots: 3,
    filled: 3,
    category: 'Health',
    isNew: false,
    applied: true,
    applicationStatus: 'approved',
    logo: '💍',
  },
];

export default function DealsPage() {
  const [deals, setDeals] = useState(brandDeals);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Tech', 'Health', 'Education', 'Lifestyle'];

  const handleApply = (dealId: string) => {
    setDeals(deals.map(deal => {
      if (deal.id === dealId && !deal.applied) {
        return {
          ...deal,
          applied: true,
          applicationStatus: 'pending',
        };
      }
      return deal;
    }));
  };

  const filteredDeals = filter === 'All'
    ? deals
    : deals.filter(d => d.category === filter);

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
              <h1 className="text-xl font-bold text-gray-900">Brand Deals</h1>
              <p className="text-sm text-gray-500">Curated opportunities</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <p className="font-medium">Haus-Vetted Opportunities</p>
              <p className="text-sm text-blue-100 mt-1">Every brand has been reviewed for fair rates and creator-friendly terms.</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Deals List */}
        <div className="space-y-4">
          {filteredDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Deal Header */}
              <div className="p-5 pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                      {deal.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{deal.brand}</h3>
                        {deal.isNew && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{deal.category}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-600">{deal.compensation}</span>
                </div>

                <h4 className="font-medium text-gray-900 mb-2">{deal.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{deal.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">📋</span>
                    <span className="text-gray-700">{deal.requirements}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">📅</span>
                    <span className="text-gray-700">Apply by {deal.deadline}</span>
                  </div>
                </div>

                {/* Slots */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Spots available</span>
                    <span className={`font-medium ${deal.filled >= deal.slots ? 'text-red-600' : 'text-gray-700'}`}>
                      {deal.slots - deal.filled} of {deal.slots} left
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        deal.filled >= deal.slots ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(deal.filled / deal.slots) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="p-5 pt-0">
                {deal.applied ? (
                  <div className={`w-full py-3 rounded-xl font-medium text-center ${
                    deal.applicationStatus === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : deal.applicationStatus === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {deal.applicationStatus === 'approved'
                      ? '✓ Approved! Check your email'
                      : deal.applicationStatus === 'pending'
                      ? '⏳ Application under review'
                      : '✕ Not selected'}
                  </div>
                ) : deal.filled >= deal.slots ? (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-medium cursor-not-allowed"
                  >
                    Fully Booked
                  </button>
                ) : (
                  <button
                    onClick={() => handleApply(deal.id)}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
