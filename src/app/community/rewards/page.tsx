'use client';

import Link from 'next/link';
import { useState } from 'react';

const rewards = [
  {
    id: '1',
    name: 'Media Kit Template',
    description: 'Professional Canva template used by top creators',
    points: 500,
    icon: '📄',
    category: 'Templates',
  },
  {
    id: '2',
    name: 'Rate Calculator Access',
    description: 'Premium rate calculation tool (lifetime)',
    points: 1000,
    icon: '🧮',
    category: 'Tools',
  },
  {
    id: '3',
    name: 'Contract Review Credit',
    description: 'One professional contract review',
    points: 1500,
    icon: '📝',
    category: 'Services',
  },
  {
    id: '4',
    name: 'Haus Merch Pack',
    description: 'Exclusive t-shirt + sticker pack',
    points: 2000,
    icon: '👕',
    category: 'Merch',
  },
  {
    id: '5',
    name: '1:1 Strategy Session',
    description: '30-min call with a Haus advisor',
    points: 3000,
    icon: '💬',
    category: 'Services',
  },
  {
    id: '6',
    name: 'Pro Membership (1 month)',
    description: 'Try Pro features free for a month',
    points: 5000,
    icon: '👑',
    category: 'Membership',
  },
];

const pointsHistory = [
  { action: 'Posted in Community', points: 50, date: 'Today' },
  { action: 'Helpful mark received', points: 25, date: 'Yesterday' },
  { action: 'Referral bonus', points: 500, date: '2 days ago' },
  { action: 'Daily login streak (7)', points: 100, date: '3 days ago' },
];

export default function RewardsPage() {
  const [userPoints] = useState(2450);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Templates', 'Tools', 'Services', 'Merch', 'Membership'];

  const filteredRewards = selectedCategory === 'All'
    ? rewards
    : rewards.filter(r => r.category === selectedCategory);

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
              <h1 className="text-xl font-bold text-gray-900">Rewards</h1>
              <p className="text-sm text-gray-500">Redeem your points</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Points Balance */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white text-center">
          <p className="text-sm text-amber-100 mb-1">Your Balance</p>
          <p className="text-4xl font-bold mb-2">{userPoints.toLocaleString()}</p>
          <p className="text-sm text-amber-100">points</p>
        </div>

        {/* How to Earn */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">How to Earn Points</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="font-medium text-gray-900">+50</p>
              <p className="text-gray-500">Post in community</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="font-medium text-gray-900">+25</p>
              <p className="text-gray-500">Helpful mark</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="font-medium text-gray-900">+500</p>
              <p className="text-gray-500">Refer a creator</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="font-medium text-gray-900">+100</p>
              <p className="text-gray-500">7-day streak</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {pointsHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <span className="text-green-600 font-medium">+{item.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rewards List */}
        <div className="space-y-3">
          {filteredRewards.map((reward) => {
            const canAfford = userPoints >= reward.points;
            const progress = Math.min((userPoints / reward.points) * 100, 100);

            return (
              <div key={reward.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{reward.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-amber-600 font-bold">{reward.points}</span>
                      <span className="text-gray-400 text-sm">points</span>
                    </div>
                  </div>
                </div>

                {!canAfford && (
                  <div className="mt-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {reward.points - userPoints} more points needed
                    </p>
                  </div>
                )}

                <button
                  className={`w-full mt-4 py-2.5 rounded-xl font-medium transition-colors ${
                    canAfford
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!canAfford}
                >
                  {canAfford ? 'Redeem' : 'Not enough points'}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
