'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Mock profile data
const profileData = {
  name: 'Sarah Chen',
  handle: '@sarahcreates',
  avatar: '👩‍💻',
  bio: 'Tech & lifestyle creator sharing honest reviews and daily inspiration. Based in NYC.',
  email: 'sarah@example.com',
  location: 'New York, USA',
  joinedDate: 'March 2023',
  verified: true,
  tier: 'Pro',
  connectedAccounts: [
    {
      platform: 'instagram',
      handle: '@sarahcreates',
      followers: '245K',
      engagementRate: '4.8%',
      connected: true,
      icon: '📸',
      color: 'from-purple-500 to-pink-500',
      points: 500,
    },
    {
      platform: 'tiktok',
      handle: '@sarahcreates',
      followers: '892K',
      engagementRate: '6.2%',
      connected: true,
      icon: '🎵',
      color: 'from-gray-900 to-gray-700',
      points: 500,
    },
    {
      platform: 'youtube',
      handle: 'Sarah Creates',
      followers: '156K',
      engagementRate: '3.1%',
      connected: true,
      icon: '▶️',
      color: 'from-red-500 to-red-600',
      points: 500,
    },
    {
      platform: 'twitter',
      handle: '@sarahcreates',
      followers: '45K',
      engagementRate: '2.4%',
      connected: false,
      icon: '🐦',
      color: 'from-blue-400 to-blue-500',
      points: 500,
    },
    {
      platform: 'linkedin',
      handle: '',
      followers: '',
      engagementRate: '',
      connected: false,
      icon: '💼',
      color: 'from-blue-600 to-blue-700',
      points: 300,
    },
    {
      platform: 'pinterest',
      handle: '',
      followers: '',
      engagementRate: '',
      connected: false,
      icon: '📌',
      color: 'from-red-600 to-red-700',
      points: 300,
    },
  ],
  rateCard: [
    { type: 'Instagram Reel', price: '$2,000 - $3,500', popular: true },
    { type: 'Instagram Story (3x)', price: '$800 - $1,200', popular: false },
    { type: 'TikTok Video', price: '$1,500 - $2,500', popular: true },
    { type: 'YouTube Integration', price: '$4,000 - $6,000', popular: false },
    { type: 'YouTube Dedicated', price: '$8,000 - $12,000', popular: false },
    { type: 'Bundle (Multi-platform)', price: 'Custom Quote', popular: true },
  ],
  categories: ['Tech', 'Lifestyle', 'Beauty', 'Travel'],
  achievements: [
    { icon: '🏆', title: 'Top Creator', description: 'Top 5% earnings in Tech' },
    { icon: '⚡', title: 'Quick Responder', description: 'Avg response under 2 hours' },
    { icon: '⭐', title: 'Brand Favorite', description: '15+ repeat collaborations' },
    { icon: '📈', title: 'Rising Star', description: '200% growth this year' },
  ],
  settings: {
    emailNotifications: true,
    pushNotifications: true,
    dealAlerts: true,
    weeklyDigest: true,
    autoResponse: false,
  },
};

// Points system data
const pointsData = {
  totalPoints: 12450,
  level: 8,
  levelName: 'Gold Creator',
  nextLevel: 15000,
  loginStreak: 12,
  longestStreak: 28,
  totalReferrals: 7,

  // Daily challenges
  dailyChallenges: [
    { id: '1', title: 'Daily Login', description: 'Log in today', points: 50, completed: true, icon: '🌅' },
    { id: '2', title: 'Read Haus Signals', description: 'Read 2 articles', points: 30, completed: true, icon: '📰' },
    { id: '3', title: 'Community Engagement', description: 'Like or comment on 3 posts', points: 40, completed: false, progress: 1, total: 3, icon: '💬' },
    { id: '4', title: 'Help a Creator', description: 'Mark a post as helpful', points: 25, completed: false, icon: '🤝' },
  ],

  // Ways to earn
  earnMethods: [
    { category: 'Account Setup', items: [
      { title: 'Connect Instagram', points: 500, completed: true, icon: '📸' },
      { title: 'Connect TikTok', points: 500, completed: true, icon: '🎵' },
      { title: 'Connect YouTube', points: 500, completed: true, icon: '▶️' },
      { title: 'Connect Twitter/X', points: 500, completed: false, icon: '🐦' },
      { title: 'Connect LinkedIn', points: 300, completed: false, icon: '💼' },
      { title: 'Connect Pinterest', points: 300, completed: false, icon: '📌' },
      { title: 'Complete Profile Bio', points: 200, completed: true, icon: '✍️' },
      { title: 'Upload Profile Photo', points: 100, completed: true, icon: '📷' },
      { title: 'Set Rate Card', points: 300, completed: true, icon: '💰' },
    ]},
    { category: 'Daily Activities', items: [
      { title: 'Daily Login Bonus', points: 50, completed: true, icon: '🌅', recurring: true },
      { title: '7-Day Streak Bonus', points: 200, completed: true, icon: '🔥', recurring: true },
      { title: '30-Day Streak Bonus', points: 1000, completed: false, icon: '⚡', recurring: true },
      { title: 'Read Haus Signals', points: 15, completed: true, icon: '📰', recurring: true },
      { title: 'Use Haus AI', points: 20, completed: false, icon: '🤖', recurring: true },
    ]},
    { category: 'Community', items: [
      { title: 'First Community Post', points: 150, completed: true, icon: '📝' },
      { title: 'First Anonymous Post', points: 100, completed: true, icon: '🎭' },
      { title: 'Get 10 Likes on Post', points: 50, completed: true, icon: '❤️' },
      { title: 'Get 50 Likes on Post', points: 200, completed: false, icon: '💖' },
      { title: 'Helpful Response', points: 25, completed: true, icon: '🤝', recurring: true },
      { title: 'Vote in Poll', points: 20, completed: true, icon: '🗳️', recurring: true },
    ]},
    { category: 'Referrals', items: [
      { title: 'Invite a Creator', points: 500, completed: true, icon: '👋', recurring: true },
      { title: 'Friend Joins Haus', points: 1000, completed: true, icon: '🎉', recurring: true },
      { title: 'Friend Completes First Deal', points: 2000, completed: false, icon: '🚀', recurring: true },
    ]},
    { category: 'Brand Deals', items: [
      { title: 'Complete First Deal', points: 500, completed: true, icon: '🎯' },
      { title: 'Complete 5 Deals', points: 1000, completed: true, icon: '⭐' },
      { title: 'Complete 10 Deals', points: 2500, completed: true, icon: '🏆' },
      { title: 'Complete 25 Deals', points: 5000, completed: false, icon: '👑' },
      { title: 'Quick Response Bonus', points: 30, completed: true, icon: '⚡', recurring: true },
      { title: '5-Star Brand Review', points: 100, completed: true, icon: '🌟', recurring: true },
    ]},
    { category: 'Events & Perks', items: [
      { title: 'Attend Virtual Event', points: 200, completed: true, icon: '📅', recurring: true },
      { title: 'Attend In-Person Meetup', points: 500, completed: false, icon: '🤝', recurring: true },
      { title: 'Claim a Perk', points: 50, completed: true, icon: '🎁', recurring: true },
      { title: 'Share Event on Social', points: 100, completed: false, icon: '📣', recurring: true },
    ]},
  ],

  // Recent activity
  recentActivity: [
    { title: 'Daily Login Bonus', points: 50, time: 'Just now', icon: '🌅' },
    { title: '12-Day Streak!', points: 100, time: '2 min ago', icon: '🔥' },
    { title: 'Read Haus Signal', points: 15, time: '1 hour ago', icon: '📰' },
    { title: 'Helpful Response', points: 25, time: '3 hours ago', icon: '🤝' },
    { title: 'Voted in Poll', points: 20, time: 'Yesterday', icon: '🗳️' },
    { title: 'Invited @mikecreates', points: 500, time: '2 days ago', icon: '👋' },
    { title: 'Completed Deal with Nike', points: 30, time: '3 days ago', icon: '⚡' },
  ],

  // Level tiers
  levels: [
    { level: 1, name: 'Newcomer', minPoints: 0, color: 'from-gray-400 to-gray-500' },
    { level: 3, name: 'Bronze Creator', minPoints: 1000, color: 'from-amber-600 to-amber-700' },
    { level: 5, name: 'Silver Creator', minPoints: 5000, color: 'from-gray-300 to-gray-400' },
    { level: 8, name: 'Gold Creator', minPoints: 10000, color: 'from-yellow-400 to-amber-500' },
    { level: 10, name: 'Platinum Creator', minPoints: 20000, color: 'from-cyan-300 to-blue-400' },
    { level: 15, name: 'Diamond Creator', minPoints: 50000, color: 'from-violet-400 to-purple-500' },
    { level: 20, name: 'Haus Legend', minPoints: 100000, color: 'from-rose-400 to-pink-500' },
  ],

};

// Mock analytics data
const analyticsData = {
  totalEarnings: 47500,
  thisMonth: 15300,
  lastMonth: 12200,
  pendingPayments: 8000,
  dealsCompleted: 23,
  dealsInProgress: 4,
  avgDealValue: 2065,
  responseTime: 2.4,
  conversionRate: 68,
  topBrands: [
    { name: 'Samsung', earnings: 16000, deals: 4, logo: '📱' },
    { name: 'Nike', earnings: 12500, deals: 3, logo: '👟' },
    { name: 'Glossier', earnings: 8500, deals: 5, logo: '💄' },
    { name: 'Apple', earnings: 6000, deals: 2, logo: '🍎' },
    { name: 'Spotify', earnings: 4500, deals: 3, logo: '🎵' },
  ],
  monthlyEarnings: [
    { month: 'Aug', amount: 8200 },
    { month: 'Sep', amount: 11500 },
    { month: 'Oct', amount: 9800 },
    { month: 'Nov', amount: 12200 },
    { month: 'Dec', amount: 15300 },
    { month: 'Jan', amount: 8500 },
  ],
  dealsByCategory: [
    { category: 'Tech', percentage: 35, color: 'bg-blue-500' },
    { category: 'Beauty', percentage: 28, color: 'bg-pink-500' },
    { category: 'Fashion', percentage: 20, color: 'bg-purple-500' },
    { category: 'Food', percentage: 12, color: 'bg-orange-500' },
    { category: 'Other', percentage: 5, color: 'bg-gray-400' },
  ],
  aiInsights: [
    {
      type: 'positive',
      title: 'Strong Q4 Performance',
      description: 'Your earnings increased 25% compared to Q3.',
      icon: '📈',
    },
    {
      type: 'tip',
      title: 'Optimize Response Time',
      description: 'Respond within 2 hours for 40% higher conversion.',
      icon: '⚡',
    },
    {
      type: 'opportunity',
      title: 'Beauty Niche Opportunity',
      description: 'Beauty brands have 85% acceptance rate.',
      icon: '💡',
    },
  ],
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatFollowers(count: string): string {
  return count;
}

function MiniBarChart({ data }: { data: { month: string; amount: number }[] }) {
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className="flex items-end justify-between h-24 gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-violet-500 rounded-t-sm transition-all hover:bg-violet-600"
            style={{ height: `${(item.amount / maxAmount) * 100}%` }}
          />
          <span className="text-[10px] text-gray-400">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const t = useTranslations('profile');
  const tNav = useTranslations('navigation');
  const [activeTab, setActiveTab] = useState<'overview' | 'points' | 'analytics' | 'rates' | 'settings'>('overview');
  const [settings, setSettings] = useState(profileData.settings);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Daily Activities');

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const growthPercentage = ((analyticsData.thisMonth - analyticsData.lastMonth) / analyticsData.lastMonth * 100).toFixed(1);
  const isPositiveGrowth = analyticsData.thisMonth >= analyticsData.lastMonth;

  const progressToNextLevel = ((pointsData.totalPoints - 10000) / (pointsData.nextLevel - 10000)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">{t('title')}</h1>
            <button className="px-3 py-1.5 text-sm font-medium text-violet-600 hover:bg-violet-50 rounded-lg transition-colors">
              {t('edit')}
            </button>
          </div>
        </div>
      </header>

      {/* Profile Card */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-4xl shadow-sm">
              {profileData.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-900">{profileData.name}</h2>
                {profileData.verified && (
                  <span className="w-5 h-5 rounded-full bg-violet-500 text-white text-xs flex items-center justify-center">✓</span>
                )}
                <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-medium rounded-full">
                  Lv.{pointsData.level}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{profileData.handle}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">⭐</span>
                  <span className="text-sm font-semibold text-gray-900">{pointsData.totalPoints.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">{t('stats.pts')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-orange-500">🔥</span>
                  <span className="text-sm font-semibold text-gray-900">{pointsData.loginStreak}</span>
                  <span className="text-xs text-gray-500">{t('stats.dayStreak')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">1.3M</p>
              <p className="text-xs text-gray-500">{t('stats.totalReach')}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">4.7%</p>
              <p className="text-xs text-gray-500">{t('stats.avgEngagement')}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-lg font-bold text-gray-900">23</p>
              <p className="text-xs text-gray-500">{t('stats.brandDeals')}</p>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {profileData.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {(['overview', 'points', 'analytics', 'rates', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 py-3 px-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-violet-500 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'points' ? `⭐ ${t('tabs.points')}` : t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Connected Accounts */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('overview.connectedAccounts')}</h3>
              <div className="space-y-3">
                {profileData.connectedAccounts.slice(0, 4).map((account, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      account.connected ? 'bg-gray-50' : 'bg-gray-50/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${account.color} flex items-center justify-center text-white`}>
                        {account.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 capitalize">{account.platform}</p>
                        <p className="text-xs text-gray-500">{account.handle}</p>
                      </div>
                    </div>
                    {account.connected ? (
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{formatFollowers(account.followers)}</p>
                        <p className="text-xs text-green-600">{account.engagementRate} {t('overview.er')}</p>
                      </div>
                    ) : (
                      <button className="px-3 py-1.5 text-xs font-medium text-violet-600 bg-violet-50 rounded-lg hover:bg-violet-100 transition-colors">
                        +{account.points} pts
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('overview.achievements')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <span className="text-2xl mb-2 block">{achievement.icon}</span>
                    <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Kit */}
            <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{t('overview.mediaKit')}</h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{t('overview.pdfReady')}</span>
              </div>
              <p className="text-sm text-violet-100 mb-4">
                {t('overview.mediaKitDescription')}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-white text-violet-600 rounded-xl text-sm font-medium hover:bg-violet-50 transition-colors">
                  {t('overview.preview')}
                </button>
                <button className="flex-1 py-2.5 bg-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                  {t('overview.share')}
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'points' && (
          <>
            {/* Points Overview Card */}
            <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-2xl p-5 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-amber-100 text-sm">{t('points.totalPoints')}</p>
                  <p className="text-4xl font-bold mt-1">{pointsData.totalPoints.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    {t('points.level')} {pointsData.level}
                  </div>
                  <p className="text-amber-100 text-xs mt-1">{pointsData.levelName}</p>
                </div>
              </div>

              {/* Progress to next level */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-100">{t('points.progressToLevel', { level: pointsData.level + 1 })}</span>
                  <span className="text-white font-medium">{pointsData.totalPoints.toLocaleString()} / {pointsData.nextLevel.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${progressToNextLevel}%` }}
                  />
                </div>
                <p className="text-xs text-amber-100 mt-1">{(pointsData.nextLevel - pointsData.totalPoints).toLocaleString()} {t('points.ptsToNextLevel')}</p>
              </div>

              {/* Streak & Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">🔥 {pointsData.loginStreak}</p>
                  <p className="text-xs text-amber-100">{t('points.dayStreak')}</p>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">📅 {pointsData.longestStreak}</p>
                  <p className="text-xs text-amber-100">{t('points.bestStreak')}</p>
                </div>
                <div className="bg-white/15 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold">👋 {pointsData.totalReferrals}</p>
                  <p className="text-xs text-amber-100">{t('points.referrals')}</p>
                </div>
              </div>
            </div>

            {/* Daily Challenges */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{t('points.dailyChallenges')}</h3>
                <span className="text-xs text-gray-500">{t('points.resetsIn')} 8h 32m</span>
              </div>
              <div className="space-y-3">
                {pointsData.dailyChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      challenge.completed ? 'bg-green-50 border border-green-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      challenge.completed ? 'bg-green-100' : 'bg-white'
                    }`}>
                      {challenge.completed ? '✅' : challenge.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${challenge.completed ? 'text-green-700' : 'text-gray-900'}`}>
                        {challenge.title}
                      </p>
                      <p className="text-xs text-gray-500">{challenge.description}</p>
                      {challenge.progress !== undefined && !challenge.completed && (
                        <div className="mt-1.5">
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-violet-500 rounded-full"
                              style={{ width: `${(challenge.progress / challenge.total!) * 100}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5">{challenge.progress}/{challenge.total}</p>
                        </div>
                      )}
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      challenge.completed
                        ? 'bg-green-100 text-green-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      +{challenge.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ways to Earn Points */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('points.waysToEarn')}</h3>
              <div className="space-y-3">
                {pointsData.earnMethods.map((category) => (
                  <div key={category.category} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.category ? null : category.category)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{category.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {category.items.filter(i => i.completed).length}/{category.items.length}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === category.category ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    {expandedCategory === category.category && (
                      <div className="p-3 space-y-2">
                        {category.items.map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 p-2.5 rounded-lg ${
                              item.completed ? 'bg-green-50' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <div className="flex-1">
                              <p className={`text-sm ${item.completed ? 'text-green-700' : 'text-gray-700'}`}>
                                {item.title}
                              </p>
                              {item.recurring && (
                                <span className="text-[10px] text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">Recurring</span>
                              )}
                            </div>
                            <span className={`text-xs font-semibold ${
                              item.completed ? 'text-green-500' : 'text-amber-500'
                            }`}>
                              {item.completed ? '✓' : `+${item.points}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Invite Friends CTA */}
            <div className="bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                  👋
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{t('points.inviteFriends')}</h3>
                  <p className="text-violet-100 text-sm mt-0.5">
                    {t('points.inviteReward', { points: '1,000' })}
                  </p>
                </div>
              </div>
              <button className="w-full mt-4 py-3 bg-white text-violet-600 rounded-xl font-semibold text-sm hover:bg-violet-50 transition-colors">
                {t('points.shareInviteLink')}
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('points.recentActivity')}</h3>
              <div className="space-y-3">
                {pointsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <span className="text-sm font-semibold text-green-500">+{activity.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level Progression */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('points.levelProgression')}</h3>
              <div className="space-y-3">
                {pointsData.levels.map((level, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      pointsData.level >= level.level ? 'bg-gradient-to-r ' + level.color + ' text-white' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      pointsData.level >= level.level ? 'bg-white/20' : 'bg-white'
                    }`}>
                      {level.level}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${pointsData.level >= level.level ? 'text-white' : 'text-gray-900'}`}>
                        {level.name}
                      </p>
                      <p className={`text-xs ${pointsData.level >= level.level ? 'text-white/70' : 'text-gray-500'}`}>
                        {level.minPoints.toLocaleString()} {t('points.points')}
                      </p>
                    </div>
                    {pointsData.level >= level.level ? (
                      <span className="text-white text-lg">✓</span>
                    ) : (
                      <span className="text-xs text-gray-400">🔒</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            {/* Earnings Overview Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
              <p className="text-sm text-gray-400 mb-1">{t('analytics.totalEarnings')}</p>
              <div className="flex items-end justify-between mb-4">
                <p className="text-3xl font-bold">{formatCurrency(analyticsData.totalEarnings)}</p>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  isPositiveGrowth ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  <span>{isPositiveGrowth ? '↑' : '↓'}</span>
                  <span>{growthPercentage}%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold">{formatCurrency(analyticsData.thisMonth)}</p>
                  <p className="text-xs text-gray-400">{t('analytics.thisMonth')}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold">{formatCurrency(analyticsData.pendingPayments)}</p>
                  <p className="text-xs text-gray-400">{t('analytics.pending')}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold">{analyticsData.dealsCompleted}</p>
                  <p className="text-xs text-gray-400">{t('analytics.dealsDone')}</p>
                </div>
              </div>
            </div>

            {/* Monthly Earnings Chart */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">{t('analytics.monthlyEarnings')}</h2>
                <span className="text-xs text-gray-500">{t('analytics.lastSixMonths')}</span>
              </div>
              <MiniBarChart data={analyticsData.monthlyEarnings} />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💰</span>
                  <span className="text-xs text-gray-500">{t('analytics.avgDealValue')}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(analyticsData.avgDealValue)}</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">✅</span>
                  <span className="text-xs text-gray-500">{t('analytics.conversionRate')}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs text-gray-500">{t('analytics.avgResponse')}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{analyticsData.responseTime}h</p>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔄</span>
                  <span className="text-xs text-gray-500">{t('analytics.inProgress')}</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{analyticsData.dealsInProgress}</p>
              </div>
            </div>

            {/* Deals by Category */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4">{t('analytics.dealsByCategory')}</h2>
              <div className="space-y-3">
                {analyticsData.dealsByCategory.map((cat, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{cat.category}</span>
                      <span className="text-gray-500">{cat.percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cat.color} rounded-full transition-all`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brands */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4">{t('analytics.topBrands')}</h2>
              <div className="space-y-3">
                {analyticsData.topBrands.map((brand, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg">
                        {brand.logo}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                        <p className="text-xs text-gray-500">{brand.deals} {t('analytics.deals')}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">{formatCurrency(brand.earnings)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🤖</span>
                <h2 className="font-semibold text-gray-900">{t('analytics.aiInsights')}</h2>
              </div>
              <div className="space-y-3">
                {analyticsData.aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      insight.type === 'positive'
                        ? 'bg-green-50 border-green-100'
                        : insight.type === 'tip'
                        ? 'bg-blue-50 border-blue-100'
                        : 'bg-amber-50 border-amber-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{insight.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">{insight.title}</p>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'rates' && (
          <>
            {/* Rate Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{t('rates.rateCard')}</h3>
                <button className="text-xs text-violet-600 font-medium">{t('rates.editRates')}</button>
              </div>
              <div className="space-y-2">
                {profileData.rateCard.map((rate, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      rate.popular ? 'bg-violet-50 border border-violet-100' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{rate.type}</p>
                        {rate.popular && (
                          <span className="text-xs text-violet-600">{t('rates.mostRequested')}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{rate.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rate Tips */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
              <div className="flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="font-medium text-gray-900 mb-1">{t('rates.pricingInsight')}</p>
                  <p className="text-sm text-gray-600">
                    {t('rates.pricingInsightText')}
                  </p>
                </div>
              </div>
            </div>

            {/* Negotiation Settings */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('rates.negotiationPreferences')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">{t('rates.minimumDealValue')}</label>
                  <div className="flex gap-2">
                    {['$500', '$1,000', '$2,000', '$5,000'].map((amount) => (
                      <button
                        key={amount}
                        className="flex-1 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:border-violet-500 hover:text-violet-600 transition-colors"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block">{t('rates.paymentTerms')}</label>
                  <div className="flex gap-2">
                    {['Net 15', 'Net 30', 'Net 45', 'Net 60'].map((term) => (
                      <button
                        key={term}
                        className="flex-1 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:border-violet-500 hover:text-violet-600 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            {/* Notifications */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('settingsTab.notifications')}</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: t('settingsTab.emailNotifications'), description: t('settingsTab.emailNotificationsDesc') },
                  { key: 'pushNotifications', label: t('settingsTab.pushNotifications'), description: t('settingsTab.pushNotificationsDesc') },
                  { key: 'dealAlerts', label: t('settingsTab.dealAlerts'), description: t('settingsTab.dealAlertsDesc') },
                  { key: 'weeklyDigest', label: t('settingsTab.weeklyDigest'), description: t('settingsTab.weeklyDigestDesc') },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{setting.label}</p>
                      <p className="text-xs text-gray-500">{setting.description}</p>
                    </div>
                    <button
                      onClick={() => toggleSetting(setting.key as keyof typeof settings)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings[setting.key as keyof typeof settings]
                          ? 'bg-violet-500'
                          : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                          settings[setting.key as keyof typeof settings]
                            ? 'translate-x-6'
                            : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('settingsTab.aiAssistant')}</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t('settingsTab.autoResponse')}</p>
                  <p className="text-xs text-gray-500">{t('settingsTab.autoResponseDesc')}</p>
                </div>
                <button
                  onClick={() => toggleSetting('autoResponse')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.autoResponse ? 'bg-violet-500' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      settings.autoResponse ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              {settings.autoResponse && (
                <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <p className="text-xs text-violet-700">
                    {t('settingsTab.autoResponseInfo')}
                  </p>
                </div>
              )}
            </div>

            {/* Account */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('settingsTab.account')}</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-700">{t('settingsTab.changePassword')}</span>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-700">{t('settingsTab.connectedEmail')}</span>
                  <span className="text-sm text-gray-500">{profileData.email}</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-700">{t('settingsTab.subscription')}</span>
                  <span className="text-sm text-violet-600 font-medium">{profileData.tier}</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-gray-700">{t('settingsTab.exportData')}</span>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100">
              <h3 className="font-semibold text-red-600 mb-4">{t('settingsTab.dangerZone')}</h3>
              <button className="w-full py-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                {t('settingsTab.deleteAccount')}
              </button>
            </div>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex justify-around">
            <Link href="/" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">{tNav('assistant')}</span>
            </Link>
            <Link href="/community" className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">{tNav('community')}</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-violet-600">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-medium">{tNav('profile')}</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
