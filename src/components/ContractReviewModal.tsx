'use client';

import { ContractDetails, RiskLevel } from '@/types/deal';

interface ContractReviewModalProps {
  brandName: string;
  contract: ContractDetails;
  isOpen: boolean;
  onClose: () => void;
}

function getRiskBadge(level: RiskLevel) {
  switch (level) {
    case 'high':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FFF0F3] text-[#C13515] border border-[#FFCCD5]">
          Caution
        </span>
      );
    case 'medium':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FFF8E6] text-[#B45309] border border-[#FFE4B3]">
          Review
        </span>
      );
    case 'low':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#E6F9E6] text-[#008A05] border border-[#B8E6B8]">
          Good
        </span>
      );
  }
}

export default function ContractReviewModal({ brandName, contract, isOpen, onClose }: ContractReviewModalProps) {
  if (!isOpen) return null;

  const highRiskCount = contract.usageRights.filter(r => r.riskLevel === 'high').length +
    (contract.payment.riskLevel === 'high' ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#DDDDDD] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#717171]">Contract Review</p>
              <h2 className="text-lg font-semibold text-[#222222]">{brandName}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-6" style={{ maxHeight: 'calc(90vh - 80px)' }}>

          {/* AI Summary */}
          <div className="bg-[#FFF0F3] border border-[#FFCCD5] rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#222222] mb-1">AI Summary</p>
                <p className="text-sm text-[#484848] leading-relaxed">{contract.summary}</p>
              </div>
            </div>
          </div>

          {/* Risk Alert */}
          {highRiskCount > 0 && (
            <div className="bg-[#FFF0F3] border border-[#FFCCD5] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-[#C13515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-semibold text-[#C13515]">
                  {highRiskCount} item(s) need attention
                </p>
              </div>
              <p className="text-sm text-[#717171]">
                Unfavorable terms were found in the contract. Please review below.
              </p>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Deliverables
            </h3>
            <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4">
              <ul className="space-y-2">
                {contract.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-[#484848]">
                    <span className="w-5 h-5 rounded-full bg-white border border-[#DDDDDD] text-[#717171] text-xs flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Payment Terms
            </h3>
            <div className={`rounded-xl p-4 border ${
              contract.payment.riskLevel === 'high'
                ? 'bg-[#FFF0F3] border-[#FFCCD5]'
                : contract.payment.riskLevel === 'medium'
                ? 'bg-[#FFF8E6] border-[#FFE4B3]'
                : 'bg-[#E6F9E6] border-[#B8E6B8]'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-2xl font-bold text-[#222222]">{contract.payment.amount}</p>
                {contract.payment.riskLevel && getRiskBadge(contract.payment.riskLevel)}
              </div>
              <div className="space-y-1 text-sm text-[#484848]">
                <p>Payment method: {contract.payment.method}</p>
                <p>Payment timing: {contract.payment.timing}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Timeline
            </h3>
            <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#717171]">Content deadline</p>
                <p className="text-sm font-medium text-[#222222]">{contract.timeline.contentDeadline}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#717171]">Review period</p>
                <p className="text-sm font-medium text-[#222222]">{contract.timeline.reviewPeriod}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#717171]">Campaign period</p>
                <p className="text-sm font-medium text-[#222222]">{contract.timeline.campaignPeriod}</p>
              </div>
            </div>
          </div>

          {/* Usage Rights */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Usage Rights
            </h3>
            <div className="space-y-2">
              {contract.usageRights.map((right, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 border ${
                    right.riskLevel === 'high'
                      ? 'bg-[#FFF0F3] border-[#FFCCD5]'
                      : right.riskLevel === 'medium'
                      ? 'bg-[#FFF8E6] border-[#FFE4B3]'
                      : 'bg-[#F7F7F7] border-[#DDDDDD]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-[#222222]">{right.label}</p>
                    {right.riskLevel && getRiskBadge(right.riskLevel)}
                  </div>
                  <p className="text-sm text-[#484848]">{right.value}</p>
                  {right.warning && (
                    <p className="text-xs text-[#C13515] mt-2 flex items-start gap-1">
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {right.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Restrictions */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Restrictions
            </h3>
            <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4">
              <ul className="space-y-2">
                {contract.restrictions.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-[#484848]">
                    <span className="text-[#C13515] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Notes */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Analysis Notes
            </h3>
            <div className="bg-[#FFF0F3] border border-[#FFCCD5] rounded-xl p-4 space-y-3">
              {contract.aiNotes.map((note, index) => (
                <p key={index} className="text-sm text-[#484848] leading-relaxed">
                  {note}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white border border-[#222222] text-[#222222] rounded-lg font-semibold hover:bg-[#F7F7F7] transition-all"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all"
            >
              Generate Negotiation Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
