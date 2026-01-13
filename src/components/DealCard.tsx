'use client';

import { Deal, DealChannel, DealPriority } from '@/types/deal';

interface DealCardProps {
  deal: Deal;
  onReply: (dealId: string) => void;
  onCheckGuidelines: (dealId: string) => void;
  onReviewContract: (dealId: string) => void;
  onSendPerformance: (dealId: string) => void;
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  } else if (diffHours > 0) {
    return `${diffHours}시간 전`;
  } else {
    return '방금 전';
  }
}

function formatChannel(channel: DealChannel): string {
  const channelMap: Record<DealChannel, string> = {
    instagram_dm: 'Instagram DM',
    email: 'Email',
    whatsapp: 'WhatsApp',
    other: 'Other',
  };
  return channelMap[channel];
}

function formatAmount(amount: number | null): string {
  if (amount === null) return '협의 필요';
  return `$${amount.toLocaleString()}`;
}

function getPriorityStyles(priority: DealPriority): { bg: string; text: string; label: string } {
  const styles: Record<DealPriority, { bg: string; text: string; label: string }> = {
    high: { bg: 'bg-red-100', text: 'text-red-700', label: 'HIGH PRIORITY' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'MEDIUM' },
    low: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'LOW' },
  };
  return styles[priority];
}

export default function DealCard({ deal, onReply, onCheckGuidelines, onReviewContract, onSendPerformance }: DealCardProps) {
  const priorityStyles = getPriorityStyles(deal.priority);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
      {/* Priority Badge */}
      <div className="mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${priorityStyles.bg} ${priorityStyles.text}`}>
          {priorityStyles.label}
        </span>
      </div>

      {/* Brand Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-gray-900">{deal.brandName}</h3>
          <span className="text-sm text-gray-500">{formatTimeAgo(deal.receivedAt)}</span>
        </div>
        <p className="text-sm text-gray-500">
          <span className="inline-flex items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            {formatChannel(deal.channel)}
          </span>
        </p>
      </div>

      {/* Offer Details */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">제안 금액</p>
            <p className="text-xl font-bold text-gray-900">{formatAmount(deal.offeredAmount)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">컨텐츠</p>
            <p className="text-sm font-medium text-gray-700">{deal.offeredDetails}</p>
          </div>
        </div>
      </div>

      {/* Risk Warnings */}
      {deal.risks.length > 0 && (
        <div className="mb-4 space-y-2">
          {deal.risks.map((risk, index) => (
            <div key={index} className="flex items-start text-sm">
              <span className="text-amber-500 mr-2 flex-shrink-0">⚠️</span>
              <span className="text-gray-700">{risk.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onReply(deal.id)}
          className="flex-1 min-w-[100px] px-4 py-3 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
        >
          Reply
        </button>
        {deal.hasGuidelines && (
          <button
            onClick={() => onCheckGuidelines(deal.id)}
            className="flex-1 min-w-[100px] px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors"
          >
            Check Guidelines
          </button>
        )}
        {deal.hasContract && (
          <button
            onClick={() => onReviewContract(deal.id)}
            className="flex-1 min-w-[100px] px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Review Contract
          </button>
        )}
        {deal.requiresPerformance && (
          <button
            onClick={() => onSendPerformance(deal.id)}
            className="flex-1 min-w-[100px] px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Send Performance
          </button>
        )}
      </div>
    </div>
  );
}
