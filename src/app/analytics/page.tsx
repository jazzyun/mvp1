'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock analytics data
const analyticsData = {
  totalEarnings: 47500,
  thisMonth: 15300,
  lastMonth: 12200,
  pendingPayments: 8000,
  dealsCompleted: 23,
  dealsInProgress: 4,
  avgDealValue: 2065,
  responseTime: 2.4, // hours
  conversionRate: 68, // percentage
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
      description: 'Your earnings increased 25% compared to Q3. Tech brand deals drove most of the growth.',
      icon: '📈',
    },
    {
      type: 'tip',
      title: 'Optimize Response Time',
      description: 'Brands that received responses within 2 hours had 40% higher conversion rates.',
      icon: '⚡',
    },
    {
      type: 'opportunity',
      title: 'Beauty Niche Opportunity',
      description: 'Beauty brands in your inbox have 85% acceptance rate. Consider focusing here.',
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

function MiniBarChart({ data }: { data: { month: string; amount: number }[] }) {
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <div className="flex items-end justify-between h-32 gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600"
            style={{ height: `${(item.amount / maxAmount) * 100}%` }}
          />
          <span className="text-xs text-gray-500">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  const growthPercentage = ((analyticsData.thisMonth - analyticsData.lastMonth) / analyticsData.lastMonth * 100).toFixed(1);
  const isPositiveGrowth = analyticsData.thisMonth >= analyticsData.lastMonth;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
              <p className="text-sm text-gray-500">Your performance insights</p>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(['month', 'quarter', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    timeRange === range
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Earnings Overview Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
          <p className="text-sm text-gray-400 mb-1">Total Earnings</p>
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
              <p className="text-xs text-gray-400">This Month</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold">{formatCurrency(analyticsData.pendingPayments)}</p>
              <p className="text-xs text-gray-400">Pending</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-lg font-bold">{analyticsData.dealsCompleted}</p>
              <p className="text-xs text-gray-400">Deals Done</p>
            </div>
          </div>
        </div>

        {/* Monthly Earnings Chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Monthly Earnings</h2>
            <span className="text-xs text-gray-500">Last 6 months</span>
          </div>
          <MiniBarChart data={analyticsData.monthlyEarnings} />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💰</span>
              <span className="text-xs text-gray-500">Avg. Deal Value</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(analyticsData.avgDealValue)}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span className="text-xs text-gray-500">Conversion Rate</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{analyticsData.conversionRate}%</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="text-xs text-gray-500">Avg. Response</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{analyticsData.responseTime}h</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔄</span>
              <span className="text-xs text-gray-500">In Progress</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{analyticsData.dealsInProgress}</p>
          </div>
        </div>

        {/* Deals by Category */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-4">Deals by Category</h2>
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
          <h2 className="font-semibold text-gray-900 mb-4">Top Brands</h2>
          <div className="space-y-3">
            {analyticsData.topBrands.map((brand, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg">
                    {brand.logo}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                    <p className="text-xs text-gray-500">{brand.deals} deals</p>
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
            <h2 className="font-semibold text-gray-900">AI Insights</h2>
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
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-bottom">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex justify-around">
            <Link href="/" className="flex flex-col items-center text-gray-400">
              <span className="text-xl mb-1">📥</span>
              <span className="text-xs">Inbox</span>
            </Link>
            <Link href="/analytics" className="flex flex-col items-center text-blue-600">
              <span className="text-xl mb-1">📊</span>
              <span className="text-xs font-medium">Analytics</span>
            </Link>
            <Link href="/community" className="flex flex-col items-center text-gray-400">
              <span className="text-xl mb-1">👥</span>
              <span className="text-xs">Community</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-gray-400">
              <span className="text-xl mb-1">👤</span>
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
