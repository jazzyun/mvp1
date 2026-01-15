'use client';

import Link from 'next/link';
import { useState } from 'react';

const profileData = {
  name: 'Jazz',
  handle: '@jazzcreates',
  email: 'jazz@example.com',
  tier: 'Pro',
  points: 2450,
  referrals: 12,
  referralCode: 'JAZZ2025',
  joinedDate: 'October 2024',
  socials: [
    { platform: 'Instagram', handle: '@jazzcreates', followers: '125K', connected: true },
    { platform: 'TikTok', handle: '@jazzcreates', followers: '89K', connected: true },
    { platform: 'YouTube', handle: 'Jazz Creates', followers: '45K', connected: true },
    { platform: 'X', handle: '@jazzcreates', followers: '12K', connected: false },
  ],
  savedPosts: [
    { id: '1', title: 'How I 3x\'d My Rates in 6 Months', type: 'Insight' },
    { id: '2', title: 'Q4 Brand Budget Trends', type: 'Signal' },
    { id: '3', title: 'Watch Out: New Perpetuity Clause Trend', type: 'Alert' },
  ],
  stats: {
    postsCreated: 23,
    helpfulMarks: 156,
    eventsAttended: 4,
  },
};

export default function CommunityProfilePage() {
  const [copied, setCopied] = useState(false);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(profileData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/community" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Profile</h1>
              <p className="text-sm text-gray-500">Your Haus account</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
            J
          </div>
          <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
          <p className="text-gray-500">{profileData.handle}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {profileData.tier} Member
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">Member since {profileData.joinedDate}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">{profileData.points.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Points</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">{profileData.referrals}</p>
            <p className="text-sm text-gray-500">Referrals</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-gray-900">{profileData.stats.helpfulMarks}</p>
            <p className="text-sm text-gray-500">Helpful</p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-amber-100">Your Referral Code</span>
            <span className="text-sm text-amber-100">+500 points per referral</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-white/20 rounded-xl px-4 py-3 font-mono text-lg font-bold">
              {profileData.referralCode}
            </div>
            <button
              onClick={copyReferralCode}
              className="px-4 py-3 bg-white text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {profileData.socials.map((social, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    {social.platform === 'Instagram' && '📸'}
                    {social.platform === 'TikTok' && '🎵'}
                    {social.platform === 'YouTube' && '📺'}
                    {social.platform === 'X' && '𝕏'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{social.platform}</p>
                    <p className="text-sm text-gray-500">
                      {social.connected ? `${social.handle} · ${social.followers}` : 'Not connected'}
                    </p>
                  </div>
                </div>
                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  social.connected
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {social.connected ? 'Connected' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Posts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Saved Posts</h3>
          <div className="space-y-3">
            {profileData.savedPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-amber-500">🔖</span>
                  <p className="text-sm text-gray-900">{post.title}</p>
                </div>
                <span className="text-xs text-gray-500">{post.type}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View all saved posts →
          </button>
        </div>

        {/* Activity Stats */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Your Activity</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xl font-bold text-gray-900">{profileData.stats.postsCreated}</p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xl font-bold text-gray-900">{profileData.stats.helpfulMarks}</p>
              <p className="text-xs text-gray-500">Helpful</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xl font-bold text-gray-900">{profileData.stats.eventsAttended}</p>
              <p className="text-xs text-gray-500">Events</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Link href="#" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <span className="text-gray-900">Account Settings</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="#" className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <span className="text-gray-900">Notification Preferences</span>
            <span className="text-gray-400">→</span>
          </Link>
          <Link href="/community/pricing" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-gray-900">Manage Subscription</span>
            <span className="text-purple-600 font-medium">{profileData.tier}</span>
          </Link>
        </div>

        {/* Sign Out */}
        <button className="w-full py-3 text-center text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors">
          Sign Out
        </button>
      </main>
    </div>
  );
}
