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
      high: { bg: 'bg-[#FFF0F3]', text: 'text-[#C13515]' },
      medium: { bg: 'bg-[#FFF8E6]', text: 'text-[#B45309]' },
      low: { bg: 'bg-[#F7F7F7]', text: 'text-[#717171]' },
    };
    return { ...styles[priority], label: t(`priority.${priority}`) };
  };

  const priorityStyles = getPriorityStyles(deal.priority);

  return (
    <div className="bg-white rounded-xl border border-[#DDDDDD] p-6 hover:shadow-lg hover:border-[#B0B0B0] transition-all duration-200 group">
      {/* Header: Priority + Time */}
      <div className="flex items-center justify-between mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${priorityStyles.bg} ${priorityStyles.text}`}>
          {priorityStyles.label}
        </span>
        <span className="text-sm text-[#717171]">{formatTimeAgo(deal.receivedAt)}</span>
      </div>

      {/* Brand Info */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          {deal.brandProfile?.logo && (
            <span className="w-12 h-12 flex items-center justify-center text-2xl bg-[#F7F7F7] rounded-xl flex-shrink-0">{deal.brandProfile.logo}</span>
          )}
          <div className="flex-1">
            <button
              onClick={() => onViewBrandProfile(deal.id)}
              className="text-lg font-semibold text-[#222222] hover:text-[#FF385C] transition-colors flex items-center gap-2"
            >
              {deal.brandKey ? t(`brands.${deal.brandKey}`) : deal.brandName}
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#F7F7F7] hover:bg-[#FF385C]/10 transition-colors">
                <svg className="w-3 h-3 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-[#717171] flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF385C] mr-2"></span>
                {formatChannel(deal.channel)}
              </span>
              {deal.conversation && (
                <button
                  onClick={() => onViewConversation(deal.id)}
                  className="text-sm text-[#FF385C] hover:text-[#E31C5F] flex items-center gap-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{t('threads')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Offer Details - Card style */}
      <div className="bg-[#F7F7F7] rounded-xl p-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-[#717171] uppercase tracking-wider mb-1 font-medium">{t('proposedAmount')}</p>
            <p className="text-2xl font-bold text-[#222222]">{formatAmount(deal.offeredAmount, t('toBeDiscussed'))}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#717171] uppercase tracking-wider mb-1 font-medium">{t('content')}</p>
            <p className="text-sm font-medium text-[#484848]">{deal.contentTypeKey ? t(`contentTypes.${deal.contentTypeKey}`) : deal.offeredDetails}</p>
          </div>
        </div>
      </div>

      {/* Risk Warnings - Airbnb amber style */}
      {deal.risks.length > 0 && (
        <div className="mb-5 space-y-1">
          {deal.risks.map((risk, index) => (
            <p key={index} className="text-sm text-[#B45309] italic">
              ! {t(`risks.${risk.type}`)}
            </p>
          ))}
        </div>
      )}

      {/* Action Buttons - Airbnb style */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => onReply(deal.id)}
          className="flex-1 min-w-[100px] px-5 py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold text-sm hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all text-center"
        >
          {t('reply')}
        </button>
        {deal.hasGuidelines && (
          <button
            onClick={() => onCheckGuidelines(deal.id)}
            className="flex-1 min-w-[100px] px-5 py-3 bg-white border border-[#222222] text-[#222222] rounded-lg font-semibold text-sm hover:bg-[#F7F7F7] transition-all text-center"
          >
            {t('checkGuidelines')}
          </button>
        )}
        {deal.hasContract && (
          <button
            onClick={() => onReviewContract(deal.id)}
            className="flex-1 min-w-[100px] px-5 py-3 bg-white border border-[#222222] text-[#222222] rounded-lg font-semibold text-sm hover:bg-[#F7F7F7] transition-all text-center"
          >
            {t('reviewContract')}
          </button>
        )}
        {deal.requiresPerformance && (
          <button
            onClick={() => onSendPerformance(deal.id)}
            className="flex-1 min-w-[100px] px-5 py-3 bg-white border border-[#222222] text-[#222222] rounded-lg font-semibold text-sm hover:bg-[#F7F7F7] transition-all text-center"
          >
            {t('sendPerformance')}
          </button>
        )}
      </div>
    </div>
  );
}
