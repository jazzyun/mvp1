'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Import community sections
import InsightsSection from './sections/InsightsSection';
import AnonymousSection from './sections/AnonymousSection';
import CommunitySection from './sections/CommunitySection';
import BenefitsSection from './sections/BenefitsSection';

type TabType = 'signals' | 'anonymous' | 'community' | 'benefits';

export default function CommunityHub() {
  const t = useTranslations('community');
  const tNav = useTranslations('navigation');
  const [activeTab, setActiveTab] = useState<TabType>('signals');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabs = [
    { id: 'signals' as TabType, label: t('tabs.signals'), icon: 'NEW' },
    { id: 'anonymous' as TabType, label: t('tabs.anonymous'), icon: '◐' },
    { id: 'community' as TabType, label: t('tabs.feed'), icon: '◈' },
    { id: 'benefits' as TabType, label: t('tabs.perks'), icon: '✧' },
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
      default:
        return <InsightsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Airbnb style */}
      <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-30">
        <div className="max-w-lg mx-auto px-4 sm:px-5 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#E61E4D] to-[#D70466] flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">H</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-[#222222] tracking-tight truncate">{t('title')}</h1>
                <p className="text-[10px] sm:text-xs text-[#717171] -mt-0.5 truncate">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#FF385C] to-[#D70466] flex items-center justify-center text-white font-semibold text-xs sm:text-sm"
                >
                  J
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#EBEBEB] py-2 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      <svg className="w-5 h-5 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Change Profile
                    </Link>
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        // Handle sign out logic here
                        window.location.href = '/';
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                    >
                      <svg className="w-5 h-5 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Airbnb style */}
        <div className="max-w-lg mx-auto px-4 sm:px-5 pb-2.5">
          <div className="flex bg-[#F7F7F7] rounded-full p-0.5 sm:p-1 border border-[#EBEBEB]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#222222] shadow-sm'
                    : 'text-[#717171] hover:text-[#484848]'
                }`}
              >
                {tab.icon === 'NEW' ? (
                  <span className={`text-[8px] sm:text-[9px] font-bold px-1 py-0.5 rounded bg-[#FF385C] text-white ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`}>NEW</span>
                ) : (
                  <span className={`text-sm sm:text-base ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>{tab.icon}</span>
                )}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation - Airbnb style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EBEBEB] z-10">
        <nav className="max-w-lg mx-auto">
          <div className="px-4 py-2">
            <div className="flex justify-around">
              <Link
                href="/"
                className="flex flex-col items-center py-2 px-4 text-[#717171] hover:text-[#222222] transition-colors"
              >
                <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] font-medium">{tNav('assistant')}</span>
              </Link>
              <Link
                href="/community"
                className="flex flex-col items-center py-2 px-4 text-[#FF385C]"
              >
                <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-[10px] font-medium">{tNav('community')}</span>
              </Link>
              <Link
                href="/profile"
                className="flex flex-col items-center py-2 px-4 text-[#717171] hover:text-[#222222] transition-colors"
              >
                <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[10px] font-medium">{tNav('profile')}</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
