'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DealCard from '@/components/DealCard';
import GuidelinesModal from '@/components/GuidelinesModal';
import ContractReviewModal from '@/components/ContractReviewModal';
import PerformanceModal from '@/components/PerformanceModal';
import ReplyModal from '@/components/ReplyModal';
import ConversationModal from '@/components/ConversationModal';
import BrandProfileModal from '@/components/BrandProfileModal';
import { mockDeals, getTodayDealsCount } from '@/data/mockDeals';
import { Deal } from '@/types/deal';

export default function BrandDealsInbox() {
  const t = useTranslations('home');
  const tNav = useTranslations('navigation');
  const tDeals = useTranslations('deals');
  const [deals] = useState<Deal[]>(mockDeals);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [isBrandProfileOpen, setIsBrandProfileOpen] = useState(false);
  const todayCount = getTodayDealsCount(deals);

  const handleReply = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      setSelectedDeal(deal);
      setIsReplyOpen(true);
    }
  };

  const handleViewConversation = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal && deal.conversation) {
      setSelectedDeal(deal);
      setIsConversationOpen(true);
    }
  };

  const handleCheckGuidelines = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      setSelectedDeal(deal);
      setIsGuidelinesOpen(true);
    }
  };

  const handleReviewContract = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal && deal.contract) {
      setSelectedDeal(deal);
      setIsContractOpen(true);
    }
  };

  const handleSendPerformance = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      setSelectedDeal(deal);
      setIsPerformanceOpen(true);
    }
  };

  const handleCloseGuidelines = () => {
    setIsGuidelinesOpen(false);
    setSelectedDeal(null);
  };

  const handleCloseContract = () => {
    setIsContractOpen(false);
    setSelectedDeal(null);
  };

  const handleClosePerformance = () => {
    setIsPerformanceOpen(false);
    setSelectedDeal(null);
  };

  const handleCloseReply = () => {
    setIsReplyOpen(false);
    setSelectedDeal(null);
  };

  const handleCloseConversation = () => {
    setIsConversationOpen(false);
    setSelectedDeal(null);
  };

  const handleViewBrandProfile = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal && deal.brandProfile) {
      setSelectedDeal(deal);
      setIsBrandProfileOpen(true);
    }
  };

  const handleCloseBrandProfile = () => {
    setIsBrandProfileOpen(false);
    setSelectedDeal(null);
  };

  // Sort deals: high priority first, then by received date (newest first)
  const sortedDeals = [...deals].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.receivedAt.getTime() - a.receivedAt.getTime();
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Clean Airbnb style */}
      <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 sm:px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-[#222222] tracking-tight truncate">{t('title')}</h1>
              <p className="text-sm text-[#717171] mt-0.5">
                {t('today')} <span className="font-semibold text-[#FF385C]">{todayCount}</span> new
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link
                href="/history"
                className="w-9 h-9 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center hover:border-[#222222] hover:shadow-sm transition-all"
              >
                <svg className="w-4 h-4 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="w-9 h-9 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center hover:border-[#222222] hover:shadow-sm transition-all"
              >
                <svg className="w-4 h-4 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <Link
                href="/settings"
                className="w-9 h-9 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center hover:border-[#222222] hover:shadow-sm transition-all"
              >
                <svg className="w-4 h-4 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - More whitespace */}
      <main className="max-w-lg mx-auto px-4 sm:px-5 py-6 pb-28">
        {sortedDeals.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#717171] text-lg">{t('noDeals')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onReply={handleReply}
                onViewConversation={handleViewConversation}
                onCheckGuidelines={handleCheckGuidelines}
                onReviewContract={handleReviewContract}
                onSendPerformance={handleSendPerformance}
                onViewBrandProfile={handleViewBrandProfile}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation - Clean Airbnb style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EBEBEB] z-10">
        <nav className="max-w-lg mx-auto">
          <div className="px-4 py-2">
            <div className="flex justify-around">
              <Link
                href="/"
                className="flex flex-col items-center py-2 px-4 text-[#FF385C]"
              >
                <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] font-medium">{tNav('assistant')}</span>
              </Link>
              <Link
                href="/community"
                className="flex flex-col items-center py-2 px-4 text-[#717171] hover:text-[#222222] transition-colors"
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

      {/* Reply Modal */}
      {selectedDeal && (
        <ReplyModal
          deal={selectedDeal}
          isOpen={isReplyOpen}
          onClose={handleCloseReply}
        />
      )}

      {/* Conversation Modal */}
      {selectedDeal && selectedDeal.conversation && (
        <ConversationModal
          brandName={selectedDeal.brandName}
          conversation={selectedDeal.conversation}
          isOpen={isConversationOpen}
          onClose={handleCloseConversation}
        />
      )}

      {/* Guidelines Modal */}
      {selectedDeal && (
        <GuidelinesModal
          brandName={selectedDeal.brandName}
          guidelines={selectedDeal.guidelines}
          isOpen={isGuidelinesOpen}
          onClose={handleCloseGuidelines}
        />
      )}

      {/* Contract Review Modal */}
      {selectedDeal && selectedDeal.contract && (
        <ContractReviewModal
          brandName={selectedDeal.brandName}
          contract={selectedDeal.contract}
          isOpen={isContractOpen}
          onClose={handleCloseContract}
        />
      )}

      {/* Performance Modal */}
      {selectedDeal && (
        <PerformanceModal
          brandName={selectedDeal.brandName}
          isOpen={isPerformanceOpen}
          onClose={handleClosePerformance}
        />
      )}

      {/* Brand Profile Modal */}
      {selectedDeal && selectedDeal.brandProfile && (
        <BrandProfileModal
          brandName={selectedDeal.brandName}
          profile={selectedDeal.brandProfile}
          isOpen={isBrandProfileOpen}
          onClose={handleCloseBrandProfile}
        />
      )}
    </div>
  );
}
