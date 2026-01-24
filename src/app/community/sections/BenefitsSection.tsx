'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Points-redeemable rewards
const redeemableRewards = [
  { id: 'r1', points: 5000, icon: '👑', color: 'bg-gradient-to-br from-[#FF385C] to-[#D70466]' },
  { id: 'r2', points: 2500, icon: '📝', color: 'bg-gradient-to-br from-[#0066CC] to-[#004999]' },
  { id: 'r3', points: 1500, icon: '💰', color: 'bg-gradient-to-br from-[#008A05] to-[#006804]' },
  { id: 'r4', points: 3000, icon: '👕', color: 'bg-gradient-to-br from-[#FF385C] to-[#E31C5F]' },
  { id: 'r5', points: 8000, icon: '🎟️', color: 'bg-gradient-to-br from-[#B45309] to-[#8B4513]' },
  { id: 'r6', points: 10000, icon: '📞', color: 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6]' },
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
    <div className="px-4 sm:px-5 py-5 space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#222222] tracking-tight">{t('title')}</h2>
          <p className="text-sm text-[#717171] mt-0.5">{t('subtitle')}</p>
        </div>
        <Link href="/community/benefits" className="text-sm text-[#FF385C] font-medium hover:text-[#E31C5F]">
          {tCommon('seeAll')}
        </Link>
      </div>

      {/* Redeem with Points - Horizontal Scroll */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#222222]">{t('redeemWithPoints')}</h3>
            <span className="px-2 py-0.5 bg-[#FFF8E6] text-[#B45309] rounded-full text-xs font-semibold border border-[#FFE4B3]">
              {userPoints.toLocaleString()} {t('pts')}
            </span>
          </div>
          <Link href="/profile" className="text-xs text-[#FF385C] font-medium">
            {t('earnMore')} →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-5 sm:px-5 snap-x snap-mandatory scrollbar-hide">
          {redeemableRewards.map((reward) => {
            const canAfford = userPoints >= reward.points;
            return (
              <Link
                key={reward.id}
                href={`/community/perks/${reward.id}`}
                className={`flex-shrink-0 w-[calc(50%-6px)] snap-start bg-white rounded-2xl border border-[#DDDDDD] overflow-hidden ${
                  !canAfford ? 'opacity-60' : 'hover:shadow-lg hover:border-[#B0B0B0]'
                } transition-all`}
              >
                <div className={`h-16 ${reward.color} flex items-center justify-center`}>
                  <span className="text-2xl">{reward.icon}</span>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-[#222222] text-sm mb-0.5">{t(`rewards.${reward.id}.title`)}</h4>
                  <p className="text-xs text-[#717171] line-clamp-1 mb-2">{t(`rewards.${reward.id}.description`)}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${canAfford ? 'text-[#B45309]' : 'text-[#717171]'}`}>
                      {reward.points.toLocaleString()} {t('pts')}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        redeemedRewards.includes(reward.id)
                          ? 'bg-[#F7F7F7] text-[#717171]'
                          : canAfford
                          ? 'bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white'
                          : 'bg-[#F7F7F7] text-[#717171]'
                      }`}
                    >
                      {redeemedRewards.includes(reward.id) ? t('redeemed') : canAfford ? t('redeem') : t('locked')}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Free Perks */}
      <div>
        <h3 className="text-sm font-semibold text-[#222222] mb-3">{t('freePerks')}</h3>
        <div className="space-y-3">
          {freePerks.map((perk) => (
            <Link
              key={perk.id}
              href={`/community/perks/${perk.id}`}
              className="block bg-white rounded-2xl border border-[#DDDDDD] p-4 hover:shadow-lg hover:border-[#B0B0B0] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F7F7F7] border border-[#EBEBEB] flex items-center justify-center flex-shrink-0">
                  {perk.logo ? (
                    <img src={perk.logo} alt={perk.partner} className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-[#717171] font-bold text-lg">{perk.partner[0]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[#222222] text-sm truncate">{t(`perks.${perk.id}.name`)}</h4>
                    <span className="px-1.5 py-0.5 bg-[#E6F9E6] text-[#008A05] rounded text-[10px] font-medium border border-[#B8E6B8]">
                      {t('free')}
                    </span>
                  </div>
                  <p className="text-xs text-[#717171] mt-0.5">{t(`perks.${perk.id}.description`)}</p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    claimedPerks.includes(perk.id)
                      ? 'bg-[#F7F7F7] text-[#717171]'
                      : 'bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white'
                  }`}
                >
                  {claimedPerks.includes(perk.id) ? t('claimed') : t('claim')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
