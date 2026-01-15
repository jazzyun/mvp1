'use client';

import { BrandProfile } from '@/types/deal';

interface BrandProfileModalProps {
  brandName: string;
  profile: BrandProfile;
  isOpen: boolean;
  onClose: () => void;
}

function getSentimentColor(sentiment: 'positive' | 'neutral' | 'negative') {
  switch (sentiment) {
    case 'positive':
      return 'text-green-600 bg-green-50';
    case 'negative':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

function getPaymentSpeedLabel(speed: 'fast' | 'average' | 'slow') {
  switch (speed) {
    case 'fast':
      return { label: 'Fast', color: 'text-green-600' };
    case 'average':
      return { label: 'Average', color: 'text-yellow-600' };
    case 'slow':
      return { label: 'Slow', color: 'text-red-600' };
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function BrandProfileModal({ brandName, profile, isOpen, onClose }: BrandProfileModalProps) {
  if (!isOpen) return null;

  const paymentSpeed = getPaymentSpeedLabel(profile.creatorReviews.paymentSpeed);

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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                {profile.logo}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{brandName}</h2>
                <p className="text-xs text-gray-500">{profile.industry}</p>
              </div>
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

          {/* AI Recommendation */}
          <div className={`rounded-2xl p-4 ${
            profile.aiRecommendation.shouldCollaborate
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-100'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">
                {profile.aiRecommendation.shouldCollaborate ? '✅' : '⚠️'}
              </span>
              <p className="font-bold text-gray-900">
                {profile.aiRecommendation.shouldCollaborate
                  ? 'Collaboration Recommended'
                  : 'Careful Review Needed'}
              </p>
            </div>

            <div className="space-y-2">
              {profile.aiRecommendation.reasons.map((reason, i) => (
                <p key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  {reason}
                </p>
              ))}
              {profile.aiRecommendation.warnings.map((warning, i) => (
                <p key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-amber-500">!</span>
                  {warning}
                </p>
              ))}
            </div>
          </div>

          {/* Brand Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>🏢</span> Brand Info
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <p className="text-sm text-gray-700">{profile.description}</p>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Founded</p>
                  <p className="text-sm font-medium text-gray-900">{profile.founded}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Headquarters</p>
                  <p className="text-sm font-medium text-gray-900">{profile.headquarters}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Presence */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📱</span> Social Media
            </h3>
            <div className="flex gap-2">
              {profile.socialFollowers.instagram && (
                <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center">
                  <p className="text-lg mb-1">📸</p>
                  <p className="text-sm font-bold text-gray-900">{profile.socialFollowers.instagram}</p>
                  <p className="text-xs text-gray-500">Instagram</p>
                </div>
              )}
              {profile.socialFollowers.youtube && (
                <div className="flex-1 bg-red-50 rounded-xl p-3 text-center">
                  <p className="text-lg mb-1">▶️</p>
                  <p className="text-sm font-bold text-gray-900">{profile.socialFollowers.youtube}</p>
                  <p className="text-xs text-gray-500">YouTube</p>
                </div>
              )}
              {profile.socialFollowers.tiktok && (
                <div className="flex-1 bg-gray-900 rounded-xl p-3 text-center">
                  <p className="text-lg mb-1">🎵</p>
                  <p className="text-sm font-bold text-white">{profile.socialFollowers.tiktok}</p>
                  <p className="text-xs text-gray-400">TikTok</p>
                </div>
              )}
            </div>
          </div>

          {/* Creator Reviews */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>⭐</span> Creator Reviews
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {profile.creatorReviews.avgRating.toFixed(1)}
                    </span>
                    <StarRating rating={Math.round(profile.creatorReviews.avgRating)} />
                  </div>
                  <p className="text-xs text-gray-500">
                    {profile.creatorReviews.totalReviews} creator reviews
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Payment Speed</p>
                  <p className={`text-sm font-medium ${paymentSpeed.color}`}>
                    {paymentSpeed.label}
                  </p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Communication</p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.creatorReviews.communicationRating.toFixed(1)}/5
                  </p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Re-collab Rate</p>
                  <p className="text-sm font-medium text-blue-600">
                    {profile.creatorReviews.reuseProbability}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent News */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span>📰</span> Recent News
            </h3>
            <div className="space-y-2">
              {profile.recentNews.map((news, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border ${getSentimentColor(news.sentiment)}`}
                >
                  <p className="text-sm font-medium text-gray-900 mb-1">{news.title}</p>
                  <p className="text-xs text-gray-500">
                    {news.source} · {news.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
