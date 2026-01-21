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
      <div className="bg-white rounded-3xl border border-[#DDDDDD] p-5 hover:shadow-lg transition-all">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF385C] to-[#D70466] flex items-center justify-center text-white text-xl font-bold shadow-lg">
            J
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#222222]">Jazz</h3>
            <p className="text-sm text-[#717171]">@jazzcreates</p>
          </div>
          <Link href="/community/profile" className="px-4 py-2 bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl text-sm font-medium text-[#484848] hover:bg-[#EBEBEB] hover:text-[#222222] transition-colors">
            View
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-[#222222]">2,450</p>
            <p className="text-xs text-[#717171]">Points</p>
          </div>
          <div className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-[#222222]">12</p>
            <p className="text-xs text-[#717171]">Referrals</p>
          </div>
          <div className="bg-[#FFF0F3] border border-[#FFCCD5] rounded-2xl p-3 text-center">
            <p className="text-lg font-bold text-[#FF385C]">Pro</p>
            <p className="text-xs text-[#717171]">Tier</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {menuItems.map((group) => (
        <div key={group.section}>
          <h3 className="text-xs font-semibold text-[#717171] uppercase tracking-wider mb-3 px-1">
            {group.section}
          </h3>
          <div className="bg-white rounded-2xl border border-[#DDDDDD] overflow-hidden">
            {group.items.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 p-4 hover:bg-[#F7F7F7] transition-colors ${
                  index !== group.items.length - 1 ? 'border-b border-[#EBEBEB]' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] border border-[#EBEBEB] flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#222222] text-sm">{item.name}</p>
                  <p className="text-xs text-[#717171]">{item.desc}</p>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 bg-[#FFF0F3] text-[#FF385C] rounded-full text-xs font-semibold border border-[#FFCCD5]">
                    {item.badge}
                  </span>
                )}
                <svg className="w-5 h-5 text-[#B0B0B0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Sign Out */}
      <button className="w-full py-3 text-center text-[#C13515] font-medium text-sm hover:bg-[#FFF0F3] rounded-xl transition-colors">
        Sign Out
      </button>
    </div>
  );
}
