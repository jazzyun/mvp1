'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Points-redeemable rewards
const redeemableRewards = [
  { id: 'r1', points: 5000, icon: '👑', color: 'from-violet-500 to-purple-600' },
  { id: 'r2', points: 2500, icon: '📝', color: 'from-blue-500 to-cyan-500' },
  { id: 'r3', points: 1500, icon: '💰', color: 'from-emerald-500 to-green-600' },
  { id: 'r4', points: 3000, icon: '👕', color: 'from-pink-500 to-rose-500' },
  { id: 'r5', points: 8000, icon: '🎟️', color: 'from-amber-500 to-orange-500' },
  { id: 'r6', points: 10000, icon: '📞', color: 'from-indigo-500 to-violet-600' },
];

const userPoints = 12450; // This would come from user context/state

const freePerks = [
  {
    id: 'p1',
    partner: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/512px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
  },
  {
    id: 'p2',
    partner: 'Canva',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canva_Logo.svg/512px-Canva_Logo.svg.png',
  },
  {
    id: 'p3',
    partner: 'Lume Cube',
    logo: null,
  },
  {
    id: 'p4',
    partner: 'Epidemic Sound',
    logo: null,
  },
  {
    id: 'p5',
    partner: 'Later',
    logo: null,
  },
  {
    id: 'p6',
    partner: 'WeWork',
    logo: null,
  },
];

export default function BenefitsSection() {
  const t = useTranslations('benefits');
  const tCommon = useTranslations('common');
  const [claimedPerks, setClaimedPerks] = useState<string[]>(['2', '6']);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const handleClaimPerk = (id: string) => {
    setClaimedPerks(prev => [...prev, id]);
  };

  const handleRedeemReward = (id: string) => {
    setRedeemedRewards(prev => [...prev, id]);
  };

  return (
    <div className="px-5 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('title')}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{t('subtitle')}</p>
        </div>
        <Link href="/community/benefits" className="text-sm text-violet-600 font-medium hover:text-violet-700">
          {tCommon('seeAll')}
        </Link>
      </div>

      {/* Redeem with Points - Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900">{t('redeemWithPoints')}</h3>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
              {userPoints.toLocaleString()} {t('pts')}
            </span>
          </div>
          <Link href="/profile" className="text-xs text-violet-600 font-medium">
            {t('earnMore')} →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {redeemableRewards.map((reward) => {
            const canAfford = userPoints >= reward.points;
            return (
              <div
                key={reward.id}
                className={`flex-shrink-0 w-[calc(50%-6px)] snap-start bg-white rounded-2xl border border-gray-100 overflow-hidden ${
                  !canAfford ? 'opacity-60' : ''
                }`}
              >
                <div className={`h-16 bg-gradient-to-br ${reward.color} flex items-center justify-center`}>
                  <span className="text-2xl">{reward.icon}</span>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{t(`rewards.${reward.id}.title`)}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">{t(`rewards.${reward.id}.description`)}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${canAfford ? 'text-amber-500' : 'text-gray-400'}`}>
                      {reward.points.toLocaleString()} {t('pts')}
                    </span>
                    <button
                      onClick={() => canAfford && !redeemedRewards.includes(reward.id) && handleRedeemReward(reward.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        redeemedRewards.includes(reward.id)
                          ? 'bg-gray-100 text-gray-400'
                          : canAfford
                          ? 'bg-violet-600 text-white hover:bg-violet-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!canAfford || redeemedRewards.includes(reward.id)}
                    >
                      {redeemedRewards.includes(reward.id) ? t('redeemed') : canAfford ? t('redeem') : t('locked')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Free Perks */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('freePerks')}</h3>
        <div className="space-y-3">
          {freePerks.map((perk) => (
            <div key={perk.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {perk.logo ? (
                    <img src={perk.logo} alt={perk.partner} className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-gray-400 font-bold text-lg">{perk.partner[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">{t(`perks.${perk.id}.name`)}</h4>
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[10px] font-medium">
                      {t('free')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{t(`perks.${perk.id}.description`)}</p>
                </div>
                <button
                  onClick={() => !claimedPerks.includes(perk.id) && handleClaimPerk(perk.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    claimedPerks.includes(perk.id)
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-violet-600 text-white hover:bg-violet-700'
                  }`}
                  disabled={claimedPerks.includes(perk.id)}
                >
                  {claimedPerks.includes(perk.id) ? t('claimed') : t('claim')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
