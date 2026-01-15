'use client';

import Link from 'next/link';

const menuItems = [
  {
    section: 'Tools',
    items: [
      { name: 'Haus AI', desc: 'Your negotiation assistant', icon: '🤖', href: '/community/ai', badge: 'New' },
      { name: 'Brand Deals', desc: 'Curated opportunities', icon: '💼', href: '/community/deals', badge: '5' },
    ],
  },
  {
    section: 'Engage',
    items: [
      { name: 'Voting', desc: 'Shape the community', icon: '🗳️', href: '/community/voting', badge: '2' },
      { name: 'Rewards', desc: 'Redeem points', icon: '⭐', href: '/community/rewards', badge: null },
    ],
  },
  {
    section: 'Connect',
    items: [
      { name: 'Events', desc: 'Creator meetups', icon: '📅', href: '/community/events', badge: '1' },
      { name: 'Directory', desc: 'Find creators', icon: '👥', href: '/community/directory', badge: null },
    ],
  },
  {
    section: 'About',
    items: [
      { name: 'The Haus', desc: 'Our philosophy', icon: '🏠', href: '/community/about', badge: null },
      { name: 'Pricing', desc: 'Membership tiers', icon: '💎', href: '/community/pricing', badge: null },
    ],
  },
];

export default function MenuSection() {
  return (
    <div className="px-5 py-6 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-500/25">
            J
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Jazz</h3>
            <p className="text-sm text-gray-500">@jazzcreates</p>
          </div>
          <Link href="/community/profile" className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            View
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-gray-50 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-gray-900">2,450</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-500">Referrals</p>
          </div>
          <div className="bg-violet-50 rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-violet-600">Pro</p>
            <p className="text-xs text-gray-500">Tier</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {menuItems.map((group) => (
        <div key={group.section}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">
            {group.section}
          </h3>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {group.items.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index !== group.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 bg-violet-100 text-violet-600 rounded-full text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Sign Out */}
      <button className="w-full py-3 text-center text-red-500 font-medium text-sm hover:bg-red-50 rounded-xl transition-colors">
        Sign Out
      </button>
    </div>
  );
}
