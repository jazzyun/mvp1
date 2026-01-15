'use client';

import { useState } from 'react';

const communityPosts = [
  {
    id: '1',
    author: 'Emma Wilson',
    handle: '@emmacreates',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    verified: true,
    content: 'Just wrapped a 6-month ambassador deal with a skincare brand. Best decision I made was asking for performance bonuses tied to sales. Ended up making 40% more than the base rate!',
    likes: 423,
    comments: 67,
    timeAgo: '1h',
  },
  {
    id: '2',
    author: 'David Kim',
    handle: '@davidkim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    verified: true,
    content: 'PSA: Started adding a "rush fee" clause to all my contracts. If brands want content in less than 7 days, it\'s +50%. Less than 3 days? +100%. Haven\'t lost a single deal over it.',
    likes: 891,
    comments: 134,
    timeAgo: '3h',
  },
  {
    id: '3',
    author: 'Lisa Park',
    handle: '@lisapark',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    verified: false,
    content: 'Finally hit my first $10K month! Took 2 years but we made it. Biggest lesson: focus on 2-3 brands you love rather than taking every deal.',
    likes: 1567,
    comments: 234,
    timeAgo: '5h',
  },
  {
    id: '4',
    author: 'James Chen',
    handle: '@jameschen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    verified: true,
    content: 'Unpopular opinion: I turn down 80% of brand deals now. Not because I don\'t need the money, but because my audience can tell when I\'m not genuine.',
    likes: 678,
    comments: 156,
    timeAgo: '8h',
  },
];

export default function CommunitySection() {
  const [showCompose, setShowCompose] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="px-5 py-6 space-y-5">
      {/* Compose Box */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            J
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="flex-1 text-left px-4 py-2.5 bg-gray-50 rounded-xl text-gray-400 text-sm hover:bg-gray-100 transition-colors"
          >
            Share something with the community...
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {communityPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Author */}
            <div className="p-4 pb-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-gray-900 text-sm">{post.author}</span>
                      {post.verified && (
                        <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{post.handle} · {post.timeAgo}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-3">
              <p className="text-gray-800 text-[15px] leading-relaxed">{post.content}</p>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 border-t border-gray-50 flex items-center gap-1">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                  likedPosts.includes(post.id)
                    ? 'bg-red-50 text-red-500'
                    : 'hover:bg-gray-50 text-gray-500'
                }`}
              >
                <svg className="w-5 h-5" fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors ml-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-500 font-medium text-sm"
              >
                Cancel
              </button>
              <span className="font-semibold text-gray-900">New Post</span>
              <button
                className="bg-violet-600 text-white px-4 py-1.5 rounded-full text-sm font-medium disabled:opacity-50"
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                J
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your wins, tips, or start a discussion..."
                className="flex-1 text-gray-900 placeholder-gray-400 resize-none focus:outline-none min-h-[120px] text-[15px]"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
