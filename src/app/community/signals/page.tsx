'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

export default function SignalsPage() {
  const router = useRouter();
  const t = useTranslations('signals');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  const categories = ['all', 'market', 'alert', 'guide', 'news', 'story'];

  const filteredSignals = selectedCategory === 'all'
    ? signalsData
    : signalsData.filter(post => post.category === selectedCategory);

  const toggleSave = (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 sm:px-5 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full border border-[#DDDDDD] flex items-center justify-center hover:bg-[#F7F7F7] transition-colors"
            >
              <svg className="w-5 h-5 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-[#222222]">{t('title')}</h1>
              <p className="text-xs text-[#717171]">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="max-w-lg mx-auto px-4 sm:px-5 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 sm:px-5 py-5 pb-20">
        <div className="space-y-4">
          {filteredSignals.map((signal) => (
            <Link
              key={signal.id}
              href={`/community/signals/${signal.id}`}
              className="block bg-white rounded-2xl border border-[#DDDDDD] overflow-hidden hover:shadow-lg hover:border-[#B0B0B0] transition-all"
            >
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-28 h-28 flex-shrink-0 relative">
                  <img
                    src={signal.image}
                    alt={t(`cards.${signal.id}.headline`)}
                    className="w-full h-full object-cover"
                  />
                  {signal.isHot && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#FF385C] text-white text-[9px] font-bold rounded uppercase">
                      HOT
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 ${signal.categoryColor} text-[9px] font-bold rounded uppercase border`}>
                        {t(`categories.${signal.category}`)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#222222] text-sm leading-snug line-clamp-2">
                      {t(`cards.${signal.id}.headline`)}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-[#717171]">{t('readTime', { time: signal.readTime })}</span>
                    <button
                      onClick={(e) => toggleSave(signal.id, e)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        savedPosts.includes(signal.id) ? 'bg-[#FFF0F3] text-[#FF385C]' : 'text-[#B0B0B0] hover:text-[#717171]'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={savedPosts.includes(signal.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredSignals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#717171]">No signals found in this category</p>
          </div>
        )}
      </main>
    </div>
  );
}
