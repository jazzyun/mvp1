'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const signalsData = [
  {
    id: '1',
    category: 'market',
    categoryColor: 'bg-[#E6F4FF] text-[#0066CC] border-[#B3D9FF]',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    readTime: '2 min',
    isHot: true,
  },
  {
    id: '2',
    category: 'alert',
    categoryColor: 'bg-[#FFF0F3] text-[#C13515] border-[#FFCCD5]',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    readTime: '3 min',
    isHot: true,
  },
  {
    id: '3',
    category: 'guide',
    categoryColor: 'bg-[#E6F9E6] text-[#008A05] border-[#B8E6B8]',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    readTime: '4 min',
    isHot: false,
  },
  {
    id: '4',
    category: 'news',
    categoryColor: 'bg-[#F3E8FF] text-[#7C3AED] border-[#DDD6FE]',
    image: 'https://i.ibb.co/7NKQF64P/images-3.png',
    readTime: '2 min',
    isHot: false,
  },
  {
    id: '5',
    category: 'story',
    categoryColor: 'bg-[#FFF8E6] text-[#B45309] border-[#FFE4B3]',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
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
          <h2 className="text-2xl font-bold text-[#222222] tracking-tight">{t('title')}</h2>
          <p className="text-sm text-[#717171] mt-0.5">{t('subtitle')}</p>
        </div>
        <button className="text-sm text-[#FF385C] font-medium hover:text-[#E31C5F]">
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
              className="flex-shrink-0 w-72 bg-white rounded-2xl border border-[#DDDDDD] overflow-hidden cursor-pointer hover:shadow-lg hover:border-[#B0B0B0] transition-all snap-start"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={signal.image}
                  alt={t(`cards.${signal.id}.headline`)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-3 left-3 px-2.5 py-1 ${signal.categoryColor} text-[10px] font-bold rounded-full uppercase tracking-wider border`}>
                  {t(`categories.${signal.category}`)}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 drop-shadow-md">
                    {t(`cards.${signal.id}.headline`)}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-[#717171] text-xs line-clamp-2 mb-3">{t(`cards.${signal.id}.subheadline`)}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#717171]">{t(`cards.${signal.id}.author`)} · {signal.readTime}</span>
                  <button
                    onClick={(e) => toggleSave(signal.id, e)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      savedPosts.includes(signal.id) ? 'bg-[#FFF0F3] text-[#FF385C]' : 'bg-[#F7F7F7] text-[#717171]'
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
                ? 'bg-[#222222] text-white'
                : 'bg-[#F7F7F7] text-[#717171] border border-[#DDDDDD] hover:border-[#B0B0B0]'
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
            className="bg-white rounded-2xl border border-[#DDDDDD] overflow-hidden cursor-pointer hover:shadow-lg hover:border-[#B0B0B0] transition-all"
          >
            <div className="flex">
              {/* Thumbnail */}
              <div className="w-24 h-24 flex-shrink-0 relative">
                <img
                  src={signal.image}
                  alt={t(`cards.${signal.id}.headline`)}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-1.5 left-1.5 px-1.5 py-0.5 ${signal.categoryColor} text-[9px] font-bold rounded uppercase border`}>
                  {t(`categories.${signal.category}`)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-semibold text-[#222222] text-sm leading-snug line-clamp-2">
                    {t(`cards.${signal.id}.headline`)}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-[#717171]">{t('readTime', { time: signal.readTime })}</span>
                  <button
                    onClick={(e) => toggleSave(signal.id, e)}
                    className={`transition-colors ${
                      savedPosts.includes(signal.id) ? 'text-[#FF385C]' : 'text-[#B0B0B0]'
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
              <div className="px-4 pb-4 border-t border-[#EBEBEB]">
                <p className="text-[#484848] text-sm mt-3 mb-4">{t(`cards.${signal.id}.subheadline`)}</p>

                <div className="space-y-2.5 mb-4">
                  {(t.raw(`cards.${signal.id}.keyPoints`) as string[]).map((point: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#E61E4D] to-[#D70466] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-[#484848] text-sm">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F7F7F7] rounded-xl p-4 border border-[#EBEBEB]">
                  <p className="text-[10px] text-[#717171] uppercase tracking-wider font-semibold mb-1">{t('keyTakeaway')}</p>
                  <p className="text-[#222222] text-sm font-medium">{t(`cards.${signal.id}.takeaway`)}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#EBEBEB]">
                  <span className="text-xs text-[#717171]">{tCommon('by')} {t(`cards.${signal.id}.author`)}</span>
                  <button className="text-xs text-[#FF385C] font-medium">{tCommon('share')} →</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
