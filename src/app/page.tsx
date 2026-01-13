'use client';

import { useState } from 'react';
import DealCard from '@/components/DealCard';
import GuidelinesModal from '@/components/GuidelinesModal';
import ContractReviewModal from '@/components/ContractReviewModal';
import PerformanceModal from '@/components/PerformanceModal';
import ReplyModal from '@/components/ReplyModal';
import { mockDeals, getTodayDealsCount } from '@/data/mockDeals';
import { Deal } from '@/types/deal';

export default function BrandDealsInbox() {
  const [deals] = useState<Deal[]>(mockDeals);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const todayCount = getTodayDealsCount(deals);

  const handleReply = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      setSelectedDeal(deal);
      setIsReplyOpen(true);
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
                onCheckGuidelines={handleCheckGuidelines}
                onReviewContract={handleReviewContract}
                onSendPerformance={handleSendPerformance}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex justify-around">
            <button className="flex flex-col items-center text-blue-600">
              <span className="text-xl mb-1">📥</span>
              <span className="text-xs font-medium">Inbox</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
              <span className="text-xl mb-1">📊</span>
              <span className="text-xs">Analytics</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
              <span className="text-xl mb-1">👤</span>
              <span className="text-xs">Profile</span>
            </button>
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
    </div>
  );
}
