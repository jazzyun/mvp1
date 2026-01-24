'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const rewardsData: Record<string, { icon: string; color: string; points: number; type: 'reward' }> = {
  'r1': { icon: '👑', color: 'bg-gradient-to-br from-[#FF385C] to-[#D70466]', points: 5000, type: 'reward' },
  'r2': { icon: '📝', color: 'bg-gradient-to-br from-[#0066CC] to-[#004999]', points: 2500, type: 'reward' },
  'r3': { icon: '💰', color: 'bg-gradient-to-br from-[#008A05] to-[#006804]', points: 1500, type: 'reward' },
  'r4': { icon: '👕', color: 'bg-gradient-to-br from-[#FF385C] to-[#E31C5F]', points: 3000, type: 'reward' },
  'r5': { icon: '🎟️', color: 'bg-gradient-to-br from-[#B45309] to-[#8B4513]', points: 8000, type: 'reward' },
  'r6': { icon: '📞', color: 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6]', points: 10000, type: 'reward' },
};

const perksData: Record<string, { partner: string; logo: string | null; type: 'perk' }> = {
  'p1': { partner: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/512px-Adobe_Creative_Cloud_rainbow_icon.svg.png', type: 'perk' },
  'p2': { partner: 'Canva', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canva_Logo.svg/512px-Canva_Logo.svg.png', type: 'perk' },
  'p3': { partner: 'Lume Cube', logo: null, type: 'perk' },
  'p4': { partner: 'Epidemic Sound', logo: null, type: 'perk' },
  'p5': { partner: 'Later', logo: null, type: 'perk' },
  'p6': { partner: 'WeWork', logo: null, type: 'perk' },
};

export default function PerkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('benefits');
  const tCommon = useTranslations('common');
  const id = params.id as string;

  const isReward = id.startsWith('r');
  const reward = isReward ? rewardsData[id] : null;
  const perk = !isReward ? perksData[id] : null;

  if (!reward && !perk) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#717171]">Perk not found</p>
          <Link href="/community" className="text-[#FF385C] font-medium mt-2 block">
            Back to Community
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-lg font-semibold text-[#222222]">
              {isReward ? t(`rewards.${id}.title`) : t(`perks.${id}.name`)}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 sm:px-5 py-6 pb-28">
        {isReward && reward ? (
          <>
            {/* Reward Hero */}
            <div className={`${reward.color} rounded-3xl p-8 text-center mb-6`}>
              <span className="text-6xl mb-4 block">{reward.icon}</span>
              <h2 className="text-2xl font-bold text-white mb-2">{t(`rewards.${id}.title`)}</h2>
              <p className="text-white/80">{t(`rewards.${id}.description`)}</p>
            </div>

            {/* Details */}
            <div className="bg-[#F7F7F7] rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#717171]">Points Required</span>
                <span className="text-xl font-bold text-[#B45309]">{reward.points.toLocaleString()} {t('pts')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#717171]">Your Points</span>
                <span className="text-xl font-bold text-[#222222]">12,450 {t('pts')}</span>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#222222] mb-3">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F3] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF385C] font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#222222]">Redeem Points</p>
                    <p className="text-sm text-[#717171]">Click the redeem button below</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F3] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF385C] font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#222222]">Get Confirmation</p>
                    <p className="text-sm text-[#717171]">You'll receive an email with details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFF0F3] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF385C] font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#222222]">Enjoy!</p>
                    <p className="text-sm text-[#717171]">Your reward is ready to use</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full py-4 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              {t('redeem')} for {reward.points.toLocaleString()} {t('pts')}
            </button>
          </>
        ) : perk ? (
          <>
            {/* Perk Hero */}
            <div className="bg-[#F7F7F7] rounded-3xl p-8 text-center mb-6">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-white border border-[#EBEBEB] flex items-center justify-center mb-4">
                {perk.logo ? (
                  <img src={perk.logo} alt={perk.partner} className="w-16 h-16 object-contain" />
                ) : (
                  <span className="text-4xl font-bold text-[#717171]">{perk.partner[0]}</span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-[#222222] mb-2">{t(`perks.${id}.name`)}</h2>
              <p className="text-[#717171]">{t(`perks.${id}.description`)}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-[#E6F9E6] text-[#008A05] rounded-full text-sm font-medium border border-[#B8E6B8]">
                {t('free')}
              </span>
            </div>

            {/* About Partner */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#222222] mb-3">About {perk.partner}</h3>
              <p className="text-[#484848] leading-relaxed">
                {perk.partner} is a trusted partner of Haus, offering exclusive benefits to our creator community.
                This perk is available exclusively to Haus members.
              </p>
            </div>

            {/* Terms */}
            <div className="bg-[#F7F7F7] rounded-2xl p-4 mb-6">
              <h4 className="font-medium text-[#222222] mb-2">Terms & Conditions</h4>
              <ul className="text-sm text-[#717171] space-y-1">
                <li>• Valid for new accounts only</li>
                <li>• Cannot be combined with other offers</li>
                <li>• One redemption per member</li>
                <li>• Subject to partner's terms of service</li>
              </ul>
            </div>

            {/* CTA */}
            <button className="w-full py-4 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity">
              {t('claim')} Now
            </button>
          </>
        ) : null}
      </main>
    </div>
  );
}
