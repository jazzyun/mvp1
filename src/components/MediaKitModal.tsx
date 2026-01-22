'use client';

import { useEffect } from 'react';

interface MediaKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaKitModal({ isOpen, onClose }: MediaKitModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[95vh] bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#717171]">Media Kit Preview</p>
              <h2 className="text-lg font-semibold text-[#222222]">Sarah Chen</h2>
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

        {/* Media Kit Content */}
        <div className="overflow-y-auto p-5 space-y-6" style={{ maxHeight: 'calc(95vh - 80px)' }}>
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#E61E4D] via-[#E31C5F] to-[#D70466] rounded-2xl p-6 text-white text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-5xl mb-4 border-4 border-white/30">
              👩‍💻
            </div>
            <h1 className="text-2xl font-bold mb-1">Sarah Chen</h1>
            <p className="text-white/80 text-sm mb-3">@sarahcreates</p>
            <p className="text-white/90 text-sm max-w-xs mx-auto">
              Tech & lifestyle creator sharing honest reviews and daily inspiration. Based in NYC.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Tech</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Lifestyle</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Beauty</span>
            </div>
          </div>

          {/* Audience Stats */}
          <div className="bg-[#F7F7F7] rounded-2xl p-5 border border-[#DDDDDD]">
            <h3 className="font-semibold text-[#222222] mb-4 text-center">Audience Overview</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#222222]">1.3M</p>
                <p className="text-xs text-[#717171]">Total Reach</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#222222]">4.7%</p>
                <p className="text-xs text-[#717171]">Avg. Engagement</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#222222]">23</p>
                <p className="text-xs text-[#717171]">Brand Collabs</p>
              </div>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-[#DDDDDD]">
            <h3 className="font-semibold text-[#222222] mb-4">Platform Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#F7F7F7] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E61E4D] to-[#D70466] flex items-center justify-center text-white">
                    📸
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#222222]">Instagram</p>
                    <p className="text-xs text-[#717171]">@sarahcreates</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#222222]">245K</p>
                  <p className="text-xs text-[#008A05]">4.8% ER</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#F7F7F7] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#222222] to-[#484848] flex items-center justify-center text-white">
                    🎵
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#222222]">TikTok</p>
                    <p className="text-xs text-[#717171]">@sarahcreates</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#222222]">892K</p>
                  <p className="text-xs text-[#008A05]">6.2% ER</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#F7F7F7] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C13515] to-[#E61E4D] flex items-center justify-center text-white">
                    ▶️
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#222222]">YouTube</p>
                    <p className="text-xs text-[#717171]">Sarah Creates</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#222222]">156K</p>
                  <p className="text-xs text-[#008A05]">3.1% ER</p>
                </div>
              </div>
            </div>
          </div>

          {/* Audience Demographics */}
          <div className="bg-white rounded-2xl p-5 border border-[#DDDDDD]">
            <h3 className="font-semibold text-[#222222] mb-4">Audience Demographics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#717171] mb-2">Age Range</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#484848] w-12">18-24</span>
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF385C] rounded-full" style={{ width: '35%' }} />
                    </div>
                    <span className="text-xs text-[#717171]">35%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#484848] w-12">25-34</span>
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF385C] rounded-full" style={{ width: '45%' }} />
                    </div>
                    <span className="text-xs text-[#717171]">45%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#484848] w-12">35-44</span>
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF385C] rounded-full" style={{ width: '15%' }} />
                    </div>
                    <span className="text-xs text-[#717171]">15%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#484848] w-12">45+</span>
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF385C] rounded-full" style={{ width: '5%' }} />
                    </div>
                    <span className="text-xs text-[#717171]">5%</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#717171] mb-2">Gender</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#484848] w-12">Female</span>
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#E61E4D] rounded-full" style={{ width: '72%' }} />
                    </div>
                    <span className="text-xs text-[#717171]">72%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#484848] w-12">Male</span>
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#484848] rounded-full" style={{ width: '26%' }} />
                    </div>
                    <span className="text-xs text-[#717171]">26%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#484848] w-12">Other</span>
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#717171] rounded-full" style={{ width: '2%' }} />
                    </div>
                    <span className="text-xs text-[#717171]">2%</span>
                  </div>
                </div>
                <p className="text-xs text-[#717171] mt-4 mb-2">Top Locations</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-[#484848]">
                    <span>🇺🇸 United States</span>
                    <span>45%</span>
                  </div>
                  <div className="flex justify-between text-[#484848]">
                    <span>🇬🇧 United Kingdom</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between text-[#484848]">
                    <span>🇨🇦 Canada</span>
                    <span>12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#DDDDDD]">
            <h3 className="font-semibold text-[#222222] mb-4">Rate Card</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-[#FFF0F3] rounded-xl border border-[#FFCCD5]">
                <div>
                  <p className="text-sm font-medium text-[#222222]">Instagram Reel</p>
                  <span className="text-xs text-[#FF385C]">Most requested</span>
                </div>
                <p className="text-sm font-semibold text-[#222222]">$2,000 - $3,500</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F7F7F7] rounded-xl">
                <p className="text-sm font-medium text-[#222222]">Instagram Story (3x)</p>
                <p className="text-sm font-semibold text-[#222222]">$800 - $1,200</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FFF0F3] rounded-xl border border-[#FFCCD5]">
                <div>
                  <p className="text-sm font-medium text-[#222222]">TikTok Video</p>
                  <span className="text-xs text-[#FF385C]">Most requested</span>
                </div>
                <p className="text-sm font-semibold text-[#222222]">$1,500 - $2,500</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F7F7F7] rounded-xl">
                <p className="text-sm font-medium text-[#222222]">YouTube Integration</p>
                <p className="text-sm font-semibold text-[#222222]">$4,000 - $6,000</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#F7F7F7] rounded-xl">
                <p className="text-sm font-medium text-[#222222]">YouTube Dedicated</p>
                <p className="text-sm font-semibold text-[#222222]">$8,000 - $12,000</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FFF0F3] rounded-xl border border-[#FFCCD5]">
                <div>
                  <p className="text-sm font-medium text-[#222222]">Bundle (Multi-platform)</p>
                  <span className="text-xs text-[#FF385C]">Best value</span>
                </div>
                <p className="text-sm font-semibold text-[#222222]">Custom Quote</p>
              </div>
            </div>
          </div>

          {/* Past Collaborations */}
          <div className="bg-white rounded-2xl p-5 border border-[#DDDDDD]">
            <h3 className="font-semibold text-[#222222] mb-4">Past Collaborations</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Samsung', logo: '📱' },
                { name: 'Nike', logo: '👟' },
                { name: 'Glossier', logo: '💄' },
                { name: 'Apple', logo: '🍎' },
                { name: 'Spotify', logo: '🎵' },
                { name: 'Adobe', logo: '🎨' },
              ].map((brand) => (
                <div key={brand.name} className="flex items-center gap-2 px-3 py-2 bg-[#F7F7F7] rounded-full border border-[#DDDDDD]">
                  <span>{brand.logo}</span>
                  <span className="text-sm text-[#484848]">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] rounded-2xl p-5 text-white text-center">
            <h3 className="font-semibold mb-2">Let's Work Together!</h3>
            <p className="text-white/80 text-sm mb-4">
              For collaboration inquiries, reach out at:
            </p>
            <p className="font-medium">sarah@sarahcreates.com</p>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 py-2.5 bg-white text-[#E61E4D] rounded-xl text-sm font-medium">
                Download PDF
              </button>
              <button className="flex-1 py-2.5 bg-white/20 text-white rounded-xl text-sm font-medium">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
