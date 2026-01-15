'use client';

import Link from 'next/link';
import { useState } from 'react';

const creators = [
  {
    id: '1',
    name: 'Sarah Chen',
    handle: '@sarahcreates',
    avatar: '👩‍🎨',
    niche: 'Beauty & Lifestyle',
    followers: '125K',
    verified: true,
    bio: 'Beauty creator sharing honest reviews and tutorials. 3x brand award winner.',
  },
  {
    id: '2',
    name: 'Mike Johnson',
    handle: '@mikej',
    avatar: '🧔',
    niche: 'Tech & Gaming',
    followers: '89K',
    verified: true,
    bio: 'Tech reviewer and gaming enthusiast. Former software engineer turned creator.',
  },
  {
    id: '3',
    name: 'Lisa Park',
    handle: '@lisacreates',
    avatar: '👩‍💼',
    niche: 'Business & Finance',
    followers: '156K',
    verified: true,
    bio: 'Teaching creators how to build sustainable businesses. MBA + creator.',
  },
  {
    id: '4',
    name: 'David Kim',
    handle: '@davidkim',
    avatar: '🧑‍💻',
    niche: 'Productivity',
    followers: '67K',
    verified: true,
    bio: 'Helping you work smarter, not harder. Notion ambassador.',
  },
  {
    id: '5',
    name: 'Emma Wilson',
    handle: '@emmacreates',
    avatar: '👱‍♀️',
    niche: 'Fashion',
    followers: '234K',
    verified: false,
    bio: 'Sustainable fashion advocate. Thrift finds and outfit inspiration.',
  },
  {
    id: '6',
    name: 'James Chen',
    handle: '@jameschen',
    avatar: '👨‍🎤',
    niche: 'Music & Entertainment',
    followers: '178K',
    verified: true,
    bio: 'Producer and music educator. Helping artists monetize their craft.',
  },
];

const niches = ['All', 'Beauty & Lifestyle', 'Tech & Gaming', 'Business & Finance', 'Productivity', 'Fashion', 'Music & Entertainment'];

export default function DirectoryPage() {
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCreators = creators.filter(creator => {
    const matchesNiche = selectedNiche === 'All' || creator.niche === selectedNiche;
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.handle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNiche && matchesSearch;
  });

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
              <h1 className="text-xl font-bold text-gray-900">Directory</h1>
              <p className="text-sm text-gray-500">Find creators to connect with</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        {/* Niche Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {niches.map((niche) => (
            <button
              key={niche}
              onClick={() => setSelectedNiche(niche)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedNiche === niche
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {niche}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500">{filteredCreators.length} creators found</p>

        {/* Creators List */}
        <div className="space-y-3">
          {filteredCreators.map((creator) => (
            <div key={creator.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
                  {creator.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                    {creator.verified && <span className="text-blue-500">✓</span>}
                  </div>
                  <p className="text-sm text-gray-500">{creator.handle} · {creator.followers}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                    {creator.niche}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">{creator.bio}</p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                  View Profile
                </button>
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
