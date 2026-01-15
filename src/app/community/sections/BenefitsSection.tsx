'use client';

import { useState } from 'react';
import Link from 'next/link';

// Points-redeemable rewards
const redeemableRewards = [
  { id: 'r1', title: 'Free Month Pro', description: 'Unlock all Pro features for 30 days', points: 5000, icon: '👑', color: 'from-violet-500 to-purple-600' },
  { id: 'r2', title: 'Contract Review', description: 'AI-powered contract analysis', points: 2500, icon: '📝', color: 'from-blue-500 to-cyan-500' },
  { id: 'r3', title: 'Rate Calculator', description: 'Advanced pricing tool access', points: 1500, icon: '💰', color: 'from-emerald-500 to-green-600' },
  { id: 'r4', title: 'Haus Merch', description: '$25 off exclusive creator gear', points: 3000, icon: '👕', color: 'from-pink-500 to-rose-500' },
  { id: 'r5', title: 'VIP Event Access', description: 'Early access to meetups & events', points: 8000, icon: '🎟️', color: 'from-amber-500 to-orange-500' },
  { id: 'r6', title: '1:1 Rate Coaching', description: '30-min call with negotiation expert', points: 10000, icon: '📞', color: 'from-indigo-500 to-violet-600' },
];

const userPoints = 12450; // This would come from user context/state

const benefits = [
  {
    id: '1',
    name: 'Adobe Creative Cloud',
    description: '40% off annual subscription',
    partner: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/512px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
    category: 'Software',
    savings: '$240/yr',
    claimed: false,
    featured: true,
  },
  {
    id: '2',
    name: 'Canva Pro',
    description: '3 months free trial',
    partner: 'Canva',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canva_Logo.svg/512px-Canva_Logo.svg.png',
    category: 'Design',
    savings: '$39',
    claimed: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Ring Light Kit',
    description: '25% off professional lighting',
    partner: 'Lume Cube',
    logo: null,
    category: 'Equipment',
    savings: '$50',
    claimed: false,
    featured: false,
  },
  {
    id: '4',
    name: 'Epidemic Sound',
    description: '30 days free music licensing',
    partner: 'Epidemic Sound',
    logo: null,
    category: 'Audio',
    savings: '$15',
    claimed: false,
    featured: false,
  },
  {
    id: '5',
    name: 'Later Pro',
    description: '50% off first 3 months',
    partner: 'Later',
    logo: null,
    category: 'Scheduling',
    savings: '$30',
    claimed: false,
    featured: false,
  },
  {
    id: '6',
    name: 'WeWork Hot Desk',
    description: '2 free day passes per month',
    partner: 'WeWork',
    logo: null,
    category: 'Workspace',
    savings: '$60/mo',
    claimed: true,
    featured: false,
  },
];

const categories = ['All', 'Software', 'Design', 'Equipment', 'Audio', 'Workspace'];

export default function BenefitsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [claimedBenefits, setClaimedBenefits] = useState<string[]>(['2', '6']);

  const filteredBenefits = selectedCategory === 'All'
    ? benefits
    : benefits.filter(b => b.category === selectedCategory);

  const featuredBenefits = benefits.filter(b => b.featured);

  const handleClaim = (id: string) => {
    setClaimedBenefits(prev => [...prev, id]);
  };

  return (
    <div className="px-5 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Perks</h2>
          <p className="text-sm text-gray-500 mt-0.5">Exclusive benefits for members</p>
        </div>
        <Link href="/community/benefits" className="text-sm text-violet-600 font-medium hover:text-violet-700">
          See all
        </Link>
      </div>

      {/* Redeem with Points - Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900">Redeem with Points</h3>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
              {userPoints.toLocaleString()} pts
            </span>
          </div>
          <Link href="/profile" className="text-xs text-violet-600 font-medium">
            Earn more →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {redeemableRewards.map((reward) => {
            const canAfford = userPoints >= reward.points;
            return (
              <div
                key={reward.id}
                className={`flex-shrink-0 w-[calc(50%-6px)] snap-start bg-white rounded-2xl border border-gray-100 overflow-hidden ${
                  !canAfford ? 'opacity-60' : ''
                }`}
              >
                <div className={`h-16 bg-gradient-to-br ${reward.color} flex items-center justify-center`}>
                  <span className="text-2xl">{reward.icon}</span>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{reward.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">{reward.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${canAfford ? 'text-amber-500' : 'text-gray-400'}`}>
                      {reward.points.toLocaleString()} pts
                    </span>
                    <button
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        canAfford
                          ? 'bg-violet-600 text-white hover:bg-violet-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!canAfford}
                    >
                      {canAfford ? 'Redeem' : 'Locked'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-violet-200 text-sm">Your Savings</p>
            <p className="text-3xl font-bold mt-1">$2,400+</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{claimedBenefits.length}</p>
            <p className="text-xs text-violet-200">Claimed</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">{benefits.length - claimedBenefits.length}</p>
            <p className="text-xs text-violet-200">Available</p>
          </div>
        </div>
      </div>

      {/* Featured Benefits - Horizontal Scroll */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Featured Partners</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {featuredBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex-shrink-0 w-64 bg-white rounded-2xl border border-gray-100 p-4 snap-start"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                  {benefit.logo ? (
                    <img src={benefit.logo} alt={benefit.partner} className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-gray-400 font-bold text-lg">{benefit.partner[0]}</span>
                  )}
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  Save {benefit.savings}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">{benefit.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{benefit.description}</p>
              <button
                onClick={() => !claimedBenefits.includes(benefit.id) && handleClaim(benefit.id)}
                className={`w-full mt-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  claimedBenefits.includes(benefit.id)
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-violet-600 text-white hover:bg-violet-700'
                }`}
                disabled={claimedBenefits.includes(benefit.id)}
              >
                {claimedBenefits.includes(benefit.id) ? 'Claimed ✓' : 'Claim Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Benefits List */}
      <div className="space-y-3">
        {filteredBenefits.filter(b => !b.featured || selectedCategory !== 'All').map((benefit) => (
          <div key={benefit.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                {benefit.logo ? (
                  <img src={benefit.logo} alt={benefit.partner} className="w-8 h-8 object-contain" />
                ) : (
                  <span className="text-gray-400 font-bold text-lg">{benefit.partner[0]}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{benefit.name}</h4>
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium">
                    {benefit.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{benefit.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-emerald-600 text-xs font-semibold">{benefit.savings}</span>
                <button
                  onClick={() => !claimedBenefits.includes(benefit.id) && handleClaim(benefit.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    claimedBenefits.includes(benefit.id)
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                  }`}
                  disabled={claimedBenefits.includes(benefit.id)}
                >
                  {claimedBenefits.includes(benefit.id) ? 'Claimed' : 'Claim'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Haus Benefits CTA */}
      <Link href="/community/benefits/haus" className="block">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-xs font-medium uppercase tracking-wider">Premium</p>
              <h3 className="text-lg font-bold mt-1">Haus Benefits</h3>
              <p className="text-amber-100 text-sm mt-1">Unlock exclusive premium perks →</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
