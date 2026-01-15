'use client';

import Link from 'next/link';
import { useState } from 'react';

const votingTopics = [
  {
    id: '1',
    question: 'What topic should our next masterclass cover?',
    description: 'Help us decide the focus for February\'s exclusive workshop',
    options: [
      { id: 'a', text: 'Advanced Rate Negotiation', votes: 234 },
      { id: 'b', text: 'Building Long-term Brand Partnerships', votes: 189 },
      { id: 'c', text: 'Tax & Finance for Creators', votes: 156 },
      { id: 'd', text: 'Content Repurposing Strategies', votes: 98 },
    ],
    totalVotes: 677,
    endsIn: '3 days',
    status: 'active',
    userVote: null,
  },
  {
    id: '2',
    question: 'Which city should host our next Unplug event?',
    description: 'We\'re planning Q2 creator meetups',
    options: [
      { id: 'a', text: 'Austin, TX', votes: 312 },
      { id: 'b', text: 'Miami, FL', votes: 287 },
      { id: 'c', text: 'Denver, CO', votes: 198 },
      { id: 'd', text: 'Seattle, WA', votes: 156 },
    ],
    totalVotes: 953,
    endsIn: '5 days',
    status: 'active',
    userVote: 'a',
  },
  {
    id: '3',
    question: 'Should we add a Discord community?',
    description: 'In addition to in-app discussions',
    options: [
      { id: 'a', text: 'Yes, I\'d use it daily', votes: 445 },
      { id: 'b', text: 'Yes, but only occasionally', votes: 312 },
      { id: 'c', text: 'No, keep everything in-app', votes: 234 },
    ],
    totalVotes: 991,
    endsIn: 'Ended',
    status: 'ended',
    userVote: 'b',
  },
];

export default function VotingPage() {
  const [topics, setTopics] = useState(votingTopics);

  const handleVote = (topicId: string, optionId: string) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId && !topic.userVote && topic.status === 'active') {
        return {
          ...topic,
          userVote: optionId,
          totalVotes: topic.totalVotes + 1,
          options: topic.options.map(opt =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      }
      return topic;
    }));
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
              <h1 className="text-xl font-bold text-gray-900">Voting</h1>
              <p className="text-sm text-gray-500">Shape the community together</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">🗳️</span>
            <div>
              <p className="text-sm font-medium text-blue-900">Your voice matters</p>
              <p className="text-xs text-blue-700 mt-1">Vote on community decisions. One vote per topic. Results are transparent.</p>
            </div>
          </div>
        </div>

        {/* Voting Topics */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  topic.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {topic.status === 'active' ? `Ends in ${topic.endsIn}` : 'Voting ended'}
                </span>
                <span className="text-sm text-gray-500">{topic.totalVotes} votes</span>
              </div>

              {/* Question */}
              <h3 className="font-semibold text-gray-900 mb-1">{topic.question}</h3>
              <p className="text-sm text-gray-600 mb-4">{topic.description}</p>

              {/* Options */}
              <div className="space-y-2">
                {topic.options.map((option) => {
                  const percentage = Math.round((option.votes / topic.totalVotes) * 100) || 0;
                  const isSelected = topic.userVote === option.id;
                  const showResults = topic.userVote || topic.status === 'ended';

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleVote(topic.id, option.id)}
                      disabled={!!topic.userVote || topic.status === 'ended'}
                      className={`w-full p-3 rounded-xl border transition-all text-left relative overflow-hidden ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${topic.userVote || topic.status === 'ended' ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {showResults && (
                        <div
                          className={`absolute inset-0 ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isSelected && <span className="text-blue-600">✓</span>}
                          <span className={`text-sm ${isSelected ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                            {option.text}
                          </span>
                        </div>
                        {showResults && (
                          <span className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                            {percentage}%
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {topic.userVote && topic.status === 'active' && (
                <p className="text-xs text-green-600 mt-3 text-center">
                  ✓ Your vote has been recorded
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
