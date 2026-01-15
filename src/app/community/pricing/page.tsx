'use client';

import Link from 'next/link';
import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with the basics',
    features: [
      'Access to Community & Anonymous',
      'Basic Haus AI (5 messages/day)',
      'Partner perks & discounts',
      'Community voting',
      'Event RSVPs (general admission)',
    ],
    notIncluded: [
      'Haus Signals (insights)',
      'Priority brand deals',
      'Contract review',
      '1-on-1 strategy calls',
      'Pro-only events',
    ],
    cta: 'Current Plan',
    highlighted: false,
    current: true,
  },
  {
    name: 'Creator',
    price: '$9',
    period: '/month',
    description: 'For serious creators ready to level up',
    features: [
      'Everything in Free, plus:',
      'Full Haus Signals access',
      'Unlimited Haus AI',
      'Early access to brand deals',
      'Basic contract review (2/month)',
      'Rewards & points system',
      'Priority event access',
    ],
    notIncluded: [
      'Unlimited contract review',
      '1-on-1 strategy calls',
      'Pro-only events',
    ],
    cta: 'Upgrade to Creator',
    highlighted: true,
    current: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For full-time creators and agencies',
    features: [
      'Everything in Creator, plus:',
      'Priority brand deal access (48hr head start)',
      'Unlimited contract review',
      'Monthly 1-on-1 strategy call',
      'Featured creator spotlight',
      'Pro-only exclusive events',
      'Direct line to Haus team',
      'Custom AI training on your style',
    ],
    notIncluded: [],
    cta: 'Upgrade to Pro',
    highlighted: false,
    current: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
              <h1 className="text-xl font-bold text-gray-900">Pricing</h1>
              <p className="text-sm text-gray-500">Choose your plan</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-gray-200 rounded-full relative"
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform ${
              billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0.5'
            }`} />
          </button>
          <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Yearly
            <span className="ml-1 text-green-600 text-xs font-medium">Save 20%</span>
          </span>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                plan.highlighted ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-100'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-purple-500 text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">
                      {billingCycle === 'yearly' && plan.price !== '$0'
                        ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                        : plan.price}
                    </p>
                    <p className="text-sm text-gray-500">{plan.period}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 opacity-50">
                      <span className="text-gray-400 mt-0.5">✕</span>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    plan.current
                      ? 'bg-gray-100 text-gray-500 cursor-default'
                      : plan.highlighted
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                  disabled={plan.current}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Common Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900 text-sm">Can I cancel anytime?</p>
              <p className="text-sm text-gray-600 mt-1">Yes! No contracts, cancel anytime. You&apos;ll keep access until your billing period ends.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Do I need a certain follower count?</p>
              <p className="text-sm text-gray-600 mt-1">Nope. The Haus is for creators of all sizes. We don&apos;t believe in vanity metrics.</p>
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">What payment methods do you accept?</p>
              <p className="text-sm text-gray-600 mt-1">All major credit cards and PayPal. We also support regional payment methods.</p>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
            <span>🛡️</span>
            <span>30-day money back guarantee</span>
          </div>
        </div>
      </main>
    </div>
  );
}
