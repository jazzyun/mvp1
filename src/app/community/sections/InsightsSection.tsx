'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const signalsData = [
  {
    id: '1',
    category: 'market',
    categoryColor: 'from-blue-500 to-cyan-500',
    headline: 'Beauty Brands Are Spending 40% More This Quarter',
    subheadline: 'Q1 2025 is shaping up to be the best quarter for beauty creators in 3 years.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    keyPoints: [
      'Average deal size up from $2,800 to $3,900',
      'Long-term partnerships preferred over one-offs',
      'Skincare leading, makeup following'
    ],
    takeaway: 'If you\'re in beauty, now is the time to pitch. Brands have budget to spend.',
    author: 'Haus Research',
    readTime: '2 min',
    isHot: true,
  },
  {
    id: '2',
    category: 'alert',
    categoryColor: 'from-red-500 to-rose-500',
    headline: 'The "Perpetuity" Trap Is Back',
    subheadline: 'Brands are hiding unlimited usage rights in new contract language.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    keyPoints: [
      'Watch for "for the duration of the campaign"',
      '"Across all media" = they can use it anywhere forever',
      'Always ask for specific end dates in writing'
    ],
    takeaway: 'Never sign without a usage expiration date. 12-24 months is standard.',
    author: 'Legal Team',
    readTime: '3 min',
    isHot: true,
  },
  {
    id: '3',
    category: 'guide',
    categoryColor: 'from-emerald-500 to-green-500',
    headline: 'How Top Creators Get 3x Their Initial Offers',
    subheadline: 'The negotiation framework that\'s working right now.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    keyPoints: [
      'Counter 50% higher than your target',
      'Add value before adding cost',
      'Use data-driven language',
      'Have your walk-away number ready'
    ],
    takeaway: 'Brands expect you to negotiate. The first offer is never the best offer.',
    author: 'Sarah Chen',
    readTime: '4 min',
    isHot: false,
  },
  {
    id: '4',
    category: 'news',
    categoryColor: 'from-violet-500 to-purple-500',
    headline: 'TikTok Shop Commissions Dropping to 2%',
    subheadline: 'March changes will hit most creators hard.',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    keyPoints: [
      'Current 5% baseline → 2% for most',
      'Beauty & fashion staying at 5%',
      'Live shopping bonuses reduced'
    ],
    takeaway: 'Diversify now. Direct brand deals should be your primary income.',
    author: 'Haus Research',
    readTime: '2 min',
    isHot: false,
  },
  {
    id: '5',
    category: 'story',
    categoryColor: 'from-amber-500 to-orange-500',
    headline: 'From $500 to $15K: One Creator\'s Journey',
    subheadline: 'Mike stopped saying yes to everything.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    keyPoints: [
      'Turned down 80% of deals for 6 months',
      'Built quality over quantity',
      'Now averages $8K per partnership'
    ],
    takeaway: 'Being selective builds your perceived value.',
    author: 'Mike Johnson',
    readTime: '5 min',
    isHot: false,
  },
];

export default function InsightsSection() {
  const t = useTranslations('signals');
  const tCommon = useTranslations('common');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const categories = ['all', 'market', 'alert', 'guide', 'news', 'story'];

  const filteredSignals = selectedCategory === 'all'
    ? signalsData
    : signalsData.filter(post => post.category === selectedCategory);

  const toggleSave = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const hotSignals = signalsData.filter(s => s.isHot);

  return (
    <div className="px-5 py-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('title')}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{t('subtitle')}</p>
        </div>
        <button className="text-sm text-violet-600 font-medium hover:text-violet-700">
          {tCommon('seeAll')}
        </button>
      </div>

      {/* Featured Cards - Horizontal Scroll */}
      {selectedCategory === 'all' && (
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {hotSignals.map((signal) => (
            <div
              key={signal.id}
              onClick={() => setExpandedCard(expandedCard === signal.id ? null : signal.id)}
              className="flex-shrink-0 w-72 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all snap-start"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={signal.image}
                  alt={signal.headline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r ${signal.categoryColor} text-white text-[10px] font-bold rounded-full uppercase tracking-wider`}>
                  {t(`categories.${signal.category}`)}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 drop-shadow-md">
                    {signal.headline}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{signal.subheadline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{signal.author} · {signal.readTime}</span>
                  <button
                    onClick={(e) => toggleSave(signal.id, e)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      savedPosts.includes(signal.id) ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={savedPosts.includes(signal.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Signal List */}
      <div className="space-y-4">
        {(selectedCategory === 'all' ? signalsData.filter(s => !s.isHot) : filteredSignals).map((signal) => (
          <div
            key={signal.id}
            onClick={() => setExpandedCard(expandedCard === signal.id ? null : signal.id)}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:border-gray-200 transition-all"
          >
            <div className="flex">
              {/* Thumbnail */}
              <div className="w-24 h-24 flex-shrink-0 relative">
                <img
                  src={signal.image}
                  alt={signal.headline}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-gradient-to-r ${signal.categoryColor} text-white text-[9px] font-bold rounded uppercase`}>
                  {t(`categories.${signal.category}`)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                    {signal.headline}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-gray-400">{t('readTime', { time: signal.readTime })}</span>
                  <button
                    onClick={(e) => toggleSave(signal.id, e)}
                    className={`transition-colors ${
                      savedPosts.includes(signal.id) ? 'text-violet-600' : 'text-gray-300'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={savedPosts.includes(signal.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCard === signal.id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <p className="text-gray-600 text-sm mt-3 mb-4">{signal.subheadline}</p>

                <div className="space-y-2.5 mb-4">
                  {signal.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${signal.categoryColor} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-[10px] font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-gray-700 text-sm">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">{t('keyTakeaway')}</p>
                  <p className="text-gray-900 text-sm font-medium">{signal.takeaway}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{tCommon('by')} {signal.author}</span>
                  <button className="text-xs text-violet-600 font-medium">{tCommon('share')} →</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
