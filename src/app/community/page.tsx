'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Import community sections
import InsightsSection from './sections/InsightsSection';
import AnonymousSection from './sections/AnonymousSection';
import CommunitySection from './sections/CommunitySection';
import BenefitsSection from './sections/BenefitsSection';
import MenuSection from './sections/MenuSection';

type TabType = 'signals' | 'anonymous' | 'community' | 'benefits' | 'menu';

export default function CommunityHub() {
  const t = useTranslations('community');
  const tNav = useTranslations('navigation');
  const [activeTab, setActiveTab] = useState<TabType>('signals');

  const tabs = [
    { id: 'signals' as TabType, label: t('tabs.signals'), icon: '✦' },
    { id: 'anonymous' as TabType, label: t('tabs.anonymous'), icon: '◐' },
    { id: 'community' as TabType, label: t('tabs.feed'), icon: '◈' },
    { id: 'benefits' as TabType, label: t('tabs.perks'), icon: '✧' },
    { id: 'menu' as TabType, label: t('tabs.more'), icon: '≡' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'signals':
        return <InsightsSection />;
      case 'anonymous':
        return <AnonymousSection />;
      case 'community':
        return <CommunitySection />;
      case 'benefits':
        return <BenefitsSection />;
      case 'menu':
        return <MenuSection />;
      default:
        return <InsightsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Airbnb style */}
      <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-30">
        <div className="max-w-lg mx-auto px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E61E4D] to-[#D70466] flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#222222] tracking-tight">{t('title')}</h1>
                <p className="text-xs text-[#717171] -mt-0.5">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/community/profile" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF385C] to-[#D70466] flex items-center justify-center text-white font-semibold text-sm">
                J
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Airbnb style */}
        <div className="max-w-lg mx-auto px-5 pb-3">
          <div className="flex bg-[#F7F7F7] rounded-full p-1 border border-[#EBEBEB]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#222222] shadow-sm'
                    : 'text-[#717171] hover:text-[#484848]'
                }`}
              >
                <span className={`text-base ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pb-24">
        {renderContent()}
      </main>

      {/* Bottom Navigation - Airbnb style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EBEBEB] z-10">
        <nav className="max-w-2xl mx-auto">
          <div className="px-6 py-3">
            <div className="flex justify-around">
              <Link
                href="/"
                className="flex flex-col items-center py-2 px-6 text-[#717171] hover:text-[#222222] transition-colors"
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium">{tNav('assistant')}</span>
              </Link>
              <Link
                href="/community"
                className="flex flex-col items-center py-2 px-6 text-[#FF385C]"
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-xs font-medium">{tNav('community')}</span>
              </Link>
              <Link
                href="/profile"
                className="flex flex-col items-center py-2 px-6 text-[#717171] hover:text-[#222222] transition-colors"
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs font-medium">{tNav('profile')}</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
