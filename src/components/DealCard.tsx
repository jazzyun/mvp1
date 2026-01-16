'use client';

import { useTranslations } from 'next-intl';
import { Deal, DealChannel, DealPriority } from '@/types/deal';

interface DealCardProps {
  deal: Deal;
  onReply: (dealId: string) => void;
  onViewConversation: (dealId: string) => void;
  onCheckGuidelines: (dealId: string) => void;
  onReviewContract: (dealId: string) => void;
  onSendPerformance: (dealId: string) => void;
  onViewBrandProfile: (dealId: string) => void;
}

function formatAmount(amount: number | null, toBeDiscussedText: string): string {
  if (amount === null) return toBeDiscussedText;
  return `$${amount.toLocaleString()}`;
}

export default function DealCard({ deal, onReply, onViewConversation, onCheckGuidelines, onReviewContract, onSendPerformance, onViewBrandProfile }: DealCardProps) {
  const t = useTranslations('deals');

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return t('time.daysAgo', { days: diffDays });
    } else if (diffHours > 0) {
      return t('time.hoursAgo', { hours: diffHours });
    } else {
      return t('time.justNow');
    }
  };

  const formatChannel = (channel: DealChannel): string => {
    return t(`channel.${channel}`);
  };

  const getPriorityStyles = (priority: DealPriority): { bg: string; text: string; label: string } => {
    const styles: Record<DealPriority, { bg: string; text: string }> = {
      high: { bg: 'bg-red-100', text: 'text-red-700' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
      low: { bg: 'bg-gray-100', text: 'text-gray-600' },
    };
    return { ...styles[priority], label: t(`priority.${priority}`) };
  };

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
          <button
            onClick={() => onViewBrandProfile(deal.id)}
            className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
          >
            {deal.brandKey ? t(`brands.${deal.brandKey}`) : deal.brandName}
            <span className="text-xs text-gray-400">ⓘ</span>
          </button>
          <span className="text-sm text-gray-500">{formatTimeAgo(deal.receivedAt)}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="inline-flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              {formatChannel(deal.channel)}
            </span>
          </p>
          {deal.conversation && (
            <button
              onClick={() => onViewConversation(deal.id)}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>💬</span>
              <span>{t('messages', { count: deal.conversation.messages.length })}</span>
            </button>
          )}
        </div>
      </div>

      {/* Offer Details */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('proposedAmount')}</p>
            <p className="text-xl font-bold text-gray-900">{formatAmount(deal.offeredAmount, t('toBeDiscussed'))}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">{t('content')}</p>
            <p className="text-sm font-medium text-gray-700">{deal.contentTypeKey ? t(`contentTypes.${deal.contentTypeKey}`) : deal.offeredDetails}</p>
          </div>
        </div>
      </div>

      {/* Risk Warnings */}
      {deal.risks.length > 0 && (
        <div className="mb-4 space-y-2">
          {deal.risks.map((risk, index) => (
            <div key={index} className="flex items-start text-sm">
              <span className="text-amber-500 mr-2 flex-shrink-0">⚠️</span>
              <span className="text-gray-700">{t(`risks.${risk.type}`)}</span>
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
          {t('reply')}
        </button>
        {deal.hasGuidelines && (
          <button
            onClick={() => onCheckGuidelines(deal.id)}
            className="flex-1 min-w-[100px] px-4 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-100 transition-colors"
          >
            {t('checkGuidelines')}
          </button>
        )}
        {deal.hasContract && (
          <button
            onClick={() => onReviewContract(deal.id)}
            className="flex-1 min-w-[100px] px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            {t('reviewContract')}
          </button>
        )}
        {deal.requiresPerformance && (
          <button
            onClick={() => onSendPerformance(deal.id)}
            className="flex-1 min-w-[100px] px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            {t('sendPerformance')}
          </button>
        )}
      </div>
    </div>
  );
}
