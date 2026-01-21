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
      return 'text-[#008A05] bg-[#E6F9E6] border-[#B8E6B8]';
    case 'negative':
      return 'text-[#C13515] bg-[#FFF0F3] border-[#FFCCD5]';
    default:
      return 'text-[#484848] bg-[#F7F7F7] border-[#DDDDDD]';
  }
}

function getPaymentSpeedLabel(speed: 'fast' | 'average' | 'slow') {
  switch (speed) {
    case 'fast':
      return { label: 'Fast', color: 'text-[#008A05]' };
    case 'average':
      return { label: 'Average', color: 'text-[#B45309]' };
    case 'slow':
      return { label: 'Slow', color: 'text-[#C13515]' };
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-[#FF385C]' : 'text-[#DDDDDD]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
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
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#DDDDDD] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#F7F7F7] border border-[#DDDDDD] flex items-center justify-center text-2xl">
                {profile.logo}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#222222]">{brandName}</h2>
                <p className="text-xs text-[#717171]">{profile.industry}</p>
              </div>
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

          {/* AI Recommendation */}
          <div className={`rounded-2xl p-4 border ${
            profile.aiRecommendation.shouldCollaborate
              ? 'bg-[#E6F9E6] border-[#B8E6B8]'
              : 'bg-[#FFF0F3] border-[#FFCCD5]'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <svg className={`w-5 h-5 ${profile.aiRecommendation.shouldCollaborate ? 'text-[#008A05]' : 'text-[#B45309]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {profile.aiRecommendation.shouldCollaborate ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                )}
              </svg>
              <p className="font-semibold text-[#222222]">
                {profile.aiRecommendation.shouldCollaborate
                  ? 'Collaboration Recommended'
                  : 'Careful Review Needed'}
              </p>
            </div>

            <div className="space-y-2">
              {profile.aiRecommendation.reasons.map((reason, i) => (
                <p key={i} className="text-sm text-[#484848] flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#008A05] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {reason}
                </p>
              ))}
              {profile.aiRecommendation.warnings.map((warning, i) => (
                <p key={i} className="text-sm text-[#484848] flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#B45309] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {warning}
                </p>
              ))}
            </div>
          </div>

          {/* Brand Info */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Brand Info
            </h3>
            <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4 space-y-3">
              <p className="text-sm text-[#484848]">{profile.description}</p>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EBEBEB]">
                <div>
                  <p className="text-xs text-[#717171]">Founded</p>
                  <p className="text-sm font-medium text-[#222222]">{profile.founded}</p>
                </div>
                <div>
                  <p className="text-xs text-[#717171]">Headquarters</p>
                  <p className="text-sm font-medium text-[#222222]">{profile.headquarters}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Presence */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              Social Media
            </h3>
            <div className="flex gap-2">
              {profile.socialFollowers.instagram && (
                <div className="flex-1 bg-[#FFF0F3] border border-[#FFCCD5] rounded-xl p-3 text-center">
                  <p className="text-lg mb-1">📸</p>
                  <p className="text-sm font-bold text-[#222222]">{profile.socialFollowers.instagram}</p>
                  <p className="text-xs text-[#717171]">Instagram</p>
                </div>
              )}
              {profile.socialFollowers.youtube && (
                <div className="flex-1 bg-[#FFF0F3] border border-[#FFCCD5] rounded-xl p-3 text-center">
                  <p className="text-lg mb-1">▶️</p>
                  <p className="text-sm font-bold text-[#222222]">{profile.socialFollowers.youtube}</p>
                  <p className="text-xs text-[#717171]">YouTube</p>
                </div>
              )}
              {profile.socialFollowers.tiktok && (
                <div className="flex-1 bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-3 text-center">
                  <p className="text-lg mb-1">🎵</p>
                  <p className="text-sm font-bold text-[#222222]">{profile.socialFollowers.tiktok}</p>
                  <p className="text-xs text-[#717171]">TikTok</p>
                </div>
              )}
            </div>
          </div>

          {/* Creator Reviews */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Creator Reviews
            </h3>
            <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#222222]">
                      {profile.creatorReviews.avgRating.toFixed(1)}
                    </span>
                    <StarRating rating={Math.round(profile.creatorReviews.avgRating)} />
                  </div>
                  <p className="text-xs text-[#717171]">
                    {profile.creatorReviews.totalReviews} creator reviews
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-white border border-[#EBEBEB] rounded-lg">
                  <p className="text-xs text-[#717171] mb-1">Payment Speed</p>
                  <p className={`text-sm font-medium ${paymentSpeed.color}`}>
                    {paymentSpeed.label}
                  </p>
                </div>
                <div className="text-center p-2 bg-white border border-[#EBEBEB] rounded-lg">
                  <p className="text-xs text-[#717171] mb-1">Communication</p>
                  <p className="text-sm font-medium text-[#222222]">
                    {profile.creatorReviews.communicationRating.toFixed(1)}/5
                  </p>
                </div>
                <div className="text-center p-2 bg-white border border-[#EBEBEB] rounded-lg">
                  <p className="text-xs text-[#717171] mb-1">Re-collab Rate</p>
                  <p className="text-sm font-medium text-[#FF385C]">
                    {profile.creatorReviews.reuseProbability}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent News */}
          <div>
            <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Recent News
            </h3>
            <div className="space-y-2">
              {profile.recentNews.map((news, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border ${getSentimentColor(news.sentiment)}`}
                >
                  <p className="text-sm font-medium text-[#222222] mb-1">{news.title}</p>
                  <p className="text-xs text-[#717171]">
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
