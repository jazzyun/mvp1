'use client';

import Link from 'next/link';
import { dealHistory, getDealHistoryStats, HistoricalDeal } from '@/data/dealHistory';

function formatDate(date: Date): string {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function getStatusStyles(status: HistoricalDeal['status']) {
  switch (status) {
    case 'completed':
      return { bg: 'bg-[#E6F9E6]', text: 'text-[#008A05]', label: 'Completed' };
    case 'declined':
      return { bg: 'bg-[#FFF0F3]', text: 'text-[#C13515]', label: 'Declined' };
    case 'expired':
      return { bg: 'bg-[#F7F7F7]', text: 'text-[#717171]', label: 'Expired' };
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? 'text-[#FF385C]' : 'text-[#DDDDDD]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HistoryPage() {
  const stats = getDealHistoryStats(dealHistory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Airbnb style */}
      <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 sm:px-5 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center hover:border-[#222222] hover:shadow-sm transition-all flex-shrink-0"
            >
              <svg className="w-4 h-4 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-[#222222] tracking-tight">Deal History</h1>
          </div>
        </div>
      </header>

      {/* Stats Summary - Airbnb cards */}
      <div className="max-w-lg mx-auto px-4 sm:px-5 py-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          <div className="bg-[#F7F7F7] rounded-xl p-3 sm:p-4">
            <p className="text-xl sm:text-2xl font-bold text-[#222222]">{stats.completedDeals}</p>
            <p className="text-[10px] sm:text-xs text-[#717171] mt-0.5">Completed</p>
          </div>
          <div className="bg-[#F7F7F7] rounded-xl p-3 sm:p-4">
            <p className="text-xl sm:text-2xl font-bold text-[#008A05]">${(stats.totalEarnings / 1000).toFixed(1)}K</p>
            <p className="text-[10px] sm:text-xs text-[#717171] mt-0.5">Earned</p>
          </div>
          <div className="bg-[#F7F7F7] rounded-xl p-3 sm:p-4">
            <p className="text-xl sm:text-2xl font-bold text-[#FF385C]">{stats.avgRating.toFixed(1)}</p>
            <p className="text-[10px] sm:text-xs text-[#717171] mt-0.5">Avg Rating</p>
          </div>
        </div>

        {/* Deal List */}
        <div className="space-y-3 pb-6">
          {dealHistory.map((deal) => {
            const statusStyles = getStatusStyles(deal.status);
            return (
              <div
                key={deal.id}
                className="bg-white rounded-xl border border-[#DDDDDD] p-4 hover:shadow-lg hover:border-[#B0B0B0] transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-xl sm:text-2xl bg-[#F7F7F7] rounded-xl flex-shrink-0">
                      {deal.brandLogo}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-[#222222] truncate">{deal.brandName}</h3>
                      <p className="text-xs sm:text-sm text-[#717171]">{deal.contentType}</p>
                    </div>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${statusStyles.bg} ${statusStyles.text} flex-shrink-0`}>
                    {statusStyles.label}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-lg sm:text-xl font-bold text-[#222222]">${deal.amount.toLocaleString()}</p>
                    {deal.rating && <StarRating rating={deal.rating} />}
                  </div>
                  <p className="text-xs sm:text-sm text-[#717171]">{formatDate(deal.completedAt)}</p>
                </div>

                {deal.notes && (
                  <p className="mt-3 text-xs sm:text-sm text-[#717171] italic border-t border-[#EBEBEB] pt-3">{deal.notes}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
