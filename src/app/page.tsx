'use client';

import { useState } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Brand Deals</h1>
              <p className="text-sm text-gray-500">
                Today <span className="font-semibold text-blue-600">{todayCount}</span>
              </p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg">⚙️</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {sortedDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No deals to review</p>
          </div>
        ) : (
          <div>
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex justify-around">
            <Link href="/" className="flex flex-col items-center text-violet-600">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">Assistant</span>
            </Link>
            <Link href="/community" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">Community</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </nav>

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
