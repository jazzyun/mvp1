'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const signalsData: Record<string, {
  category: string;
  categoryColor: string;
  image: string;
  readTime: string;
}> = {
  '1': {
    category: 'market',
    categoryColor: 'bg-[#E6F4FF] text-[#0066CC] border-[#B3D9FF]',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    readTime: '2 min',
  },
  '2': {
    category: 'alert',
    categoryColor: 'bg-[#FFF0F3] text-[#C13515] border-[#FFCCD5]',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    readTime: '3 min',
  },
  '3': {
    category: 'guide',
    categoryColor: 'bg-[#E6F9E6] text-[#008A05] border-[#B8E6B8]',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    readTime: '4 min',
  },
  '4': {
    category: 'news',
    categoryColor: 'bg-[#F3E8FF] text-[#7C3AED] border-[#DDD6FE]',
    image: 'https://i.ibb.co/7NKQF64P/images-3.png',
    readTime: '2 min',
  },
  '5': {
    category: 'story',
    categoryColor: 'bg-[#FFF8E6] text-[#B45309] border-[#FFE4B3]',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    readTime: '5 min',
  },
};

export default function SignalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('signals');
  const tCommon = useTranslations('common');
  const id = params.id as string;
  const [isSaved, setIsSaved] = useState(false);

  const signal = signalsData[id];

  if (!signal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#717171]">Signal not found</p>
          <Link href="/community" className="text-[#FF385C] font-medium mt-2 block">
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

  const keyPoints = t.raw(`cards.${id}.keyPoints`) as string[];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 sm:px-5 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full border border-[#DDDDDD] flex items-center justify-center hover:bg-[#F7F7F7] transition-colors"
            >
              <svg className="w-5 h-5 text-[#222222]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                  isSaved ? 'bg-[#FFF0F3] border-[#FF385C] text-[#FF385C]' : 'border-[#DDDDDD] text-[#717171] hover:bg-[#F7F7F7]'
                }`}
              >
                <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#717171] hover:bg-[#F7F7F7] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto pb-20">
        {/* Hero Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={signal.image}
            alt={t(`cards.${id}.headline`)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className={`inline-block px-3 py-1 ${signal.categoryColor} text-xs font-bold rounded-full uppercase tracking-wider border mb-3`}>
              {t(`categories.${signal.category}`)}
            </span>
            <h1 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
              {t(`cards.${id}.headline`)}
            </h1>
          </div>
        </div>

        {/* Meta Info */}
        <div className="px-4 sm:px-5 py-4 border-b border-[#EBEBEB]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF385C] to-[#D70466] flex items-center justify-center text-white font-semibold text-sm">
                H
              </div>
              <div>
                <p className="font-medium text-[#222222] text-sm">{t(`cards.${id}.author`)}</p>
                <p className="text-xs text-[#717171]">{t('readTime', { time: signal.readTime })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-4 sm:px-5 py-6 space-y-6">
          {/* Subheadline */}
          <p className="text-[#484848] text-lg leading-relaxed">
            {t(`cards.${id}.subheadline`)}
          </p>

          {/* Key Points */}
          <div>
            <h2 className="text-lg font-semibold text-[#222222] mb-4">Key Points</h2>
            <div className="space-y-4">
              {keyPoints.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#E61E4D] to-[#D70466] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-[#484848] text-base leading-relaxed pt-1">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaway Box */}
          <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FFE4E6] rounded-2xl p-5 border border-[#FFCCD5]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💡</span>
              <p className="text-xs text-[#C13515] uppercase tracking-wider font-semibold">{t('keyTakeaway')}</p>
            </div>
            <p className="text-[#222222] font-medium text-base leading-relaxed">{t(`cards.${id}.takeaway`)}</p>
          </div>

          {/* Related Signals */}
          <div>
            <h2 className="text-lg font-semibold text-[#222222] mb-4">Related Signals</h2>
            <div className="space-y-3">
              {Object.keys(signalsData)
                .filter(key => key !== id)
                .slice(0, 2)
                .map((key) => (
                  <Link
                    key={key}
                    href={`/community/signals/${key}`}
                    className="flex items-center gap-3 p-3 bg-[#F7F7F7] rounded-xl hover:bg-[#EBEBEB] transition-colors"
                  >
                    <img
                      src={signalsData[key].image}
                      alt={t(`cards.${key}.headline`)}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#222222] text-sm line-clamp-2">{t(`cards.${key}.headline`)}</p>
                      <p className="text-xs text-[#717171] mt-1">{t('readTime', { time: signalsData[key].readTime })}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="px-4 sm:px-5 py-4 border-t border-[#EBEBEB]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#717171]">Was this helpful?</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-[#F7F7F7] rounded-full text-sm font-medium text-[#484848] hover:bg-[#EBEBEB] transition-colors">
                👍 Yes
              </button>
              <button className="px-4 py-2 bg-[#F7F7F7] rounded-full text-sm font-medium text-[#484848] hover:bg-[#EBEBEB] transition-colors">
                👎 No
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
