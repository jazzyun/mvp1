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
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
          Caution
        </span>
      );
    case 'medium':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
          Review
        </span>
      );
    case 'low':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contract Review</p>
              <h2 className="text-lg font-bold text-gray-900">{brandName}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-6" style={{ maxHeight: 'calc(90vh - 80px)' }}>

          {/* AI Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">AI Summary</p>
                <p className="text-sm text-gray-700 leading-relaxed">{contract.summary}</p>
              </div>
            </div>
          </div>

          {/* Risk Alert */}
          {highRiskCount > 0 && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-500">🚨</span>
                <p className="text-sm font-semibold text-red-700">
                  {highRiskCount} item(s) need attention
                </p>
              </div>
              <p className="text-sm text-red-600">
                Unfavorable terms were found in the contract. Please review below.
              </p>
            </div>
          )}

          {/* Deliverables */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📋</span> Deliverables
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <ul className="space-y-2">
                {contract.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
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
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>💰</span> Payment Terms
            </h3>
            <div className={`rounded-xl p-4 border ${
              contract.payment.riskLevel === 'high'
                ? 'bg-red-50 border-red-200'
                : contract.payment.riskLevel === 'medium'
                ? 'bg-amber-50 border-amber-200'
                : 'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-2xl font-bold text-gray-900">{contract.payment.amount}</p>
                {contract.payment.riskLevel && getRiskBadge(contract.payment.riskLevel)}
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Payment method: {contract.payment.method}</p>
                <p>Payment timing: {contract.payment.timing}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📅</span> Timeline
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Content deadline</p>
                <p className="text-sm font-medium text-gray-900">{contract.timeline.contentDeadline}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Review period</p>
                <p className="text-sm font-medium text-gray-900">{contract.timeline.reviewPeriod}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Campaign period</p>
                <p className="text-sm font-medium text-gray-900">{contract.timeline.campaignPeriod}</p>
              </div>
            </div>
          </div>

          {/* Usage Rights */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📜</span> Usage Rights
            </h3>
            <div className="space-y-2">
              {contract.usageRights.map((right, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 border ${
                    right.riskLevel === 'high'
                      ? 'bg-red-50 border-red-200'
                      : right.riskLevel === 'medium'
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{right.label}</p>
                    {right.riskLevel && getRiskBadge(right.riskLevel)}
                  </div>
                  <p className="text-sm text-gray-700">{right.value}</p>
                  {right.warning && (
                    <p className="text-xs text-red-600 mt-2 flex items-start gap-1">
                      <span>⚠️</span> {right.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Restrictions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🚫</span> Restrictions
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <ul className="space-y-2">
                {contract.restrictions.map((item, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <span className="text-red-400 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Notes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>💡</span> AI Analysis Notes
            </h3>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 space-y-3">
              {contract.aiNotes.map((note, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed">
                  {note}
                </p>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Generate Negotiation Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
