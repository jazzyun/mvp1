'use client';

import { useState } from 'react';

const anonymousPosts = [
  {
    id: '1',
    content: 'Has anyone worked with FashionBrand X? They offered $8K for a campaign but want me to sign an NDA that prevents me from ever mentioning I worked with them. Is this normal?',
    category: 'Contract',
    categoryColor: 'from-blue-400 to-blue-600',
    likes: 156,
    comments: 67,
    timeAgo: '2h',
    helpfulCount: 45,
  },
  {
    id: '2',
    content: 'I\'m pregnant and worried about telling brands. One campaign I\'m in the middle of wants "lifestyle" content and idk if they\'ll drop me. Anyone been through this?',
    category: 'Personal',
    categoryColor: 'from-pink-400 to-rose-600',
    likes: 234,
    comments: 89,
    timeAgo: '4h',
    helpfulCount: 78,
  },
  {
    id: '3',
    content: 'Feeling burnt out. Posted consistently for 3 years, finally hit 500K, but now I dread creating. Taking brand deals just to pay bills but my heart isn\'t in it. How do you guys deal?',
    category: 'Wellness',
    categoryColor: 'from-violet-400 to-purple-600',
    likes: 567,
    comments: 156,
    timeAgo: '6h',
    helpfulCount: 123,
  },
  {
    id: '4',
    content: 'Agency reached out claiming they can 10x my brand deals. Asking for 30% commission + 6 month exclusivity. They represent some big names but this feels steep. Thoughts?',
    category: 'Agency',
    categoryColor: 'from-amber-400 to-orange-600',
    likes: 189,
    comments: 92,
    timeAgo: '8h',
    helpfulCount: 34,
  },
  {
    id: '5',
    content: 'Brand is 60 days late on payment ($12K). They keep saying "processing" but I\'m starting to worry. Do I go public? Hire a lawyer? What\'s worked for others?',
    category: 'Payment',
    categoryColor: 'from-red-400 to-red-600',
    likes: 423,
    comments: 134,
    timeAgo: '12h',
    helpfulCount: 89,
  },
];

export default function AnonymousSection() {
  const [showCompose, setShowCompose] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [helpfulPosts, setHelpfulPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleHelpful = (postId: string) => {
    setHelpfulPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const toggleLike = (postId: string) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="bg-[#0D0D0F] min-h-screen -mt-6 pt-6">
      <div className="px-5 py-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Anonymous</h2>
            <p className="text-sm text-gray-500 mt-0.5">Safe space for real talk</p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            + Post
          </button>
        </div>

        {/* Privacy Badge */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-medium">Identity Protected</p>
            <p className="text-gray-500 text-xs">Your posts are completely anonymous</p>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {anonymousPosts.map((post) => (
            <div key={post.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="p-4 pb-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-white text-sm font-medium">Anonymous</span>
                    <span className="text-gray-500 text-xs ml-2">· {post.timeAgo}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 bg-gradient-to-r ${post.categoryColor} text-white text-[10px] font-bold rounded-full uppercase tracking-wider`}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-gray-200 text-[15px] leading-relaxed">{post.content}</p>
              </div>

              {/* Actions */}
              <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                      likedPosts.includes(post.id)
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:bg-white/5 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm">{post.comments}</span>
                  </button>
                </div>
                <button
                  onClick={() => toggleHelpful(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    helpfulPosts.includes(post.id)
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Helpful · {post.helpfulCount + (helpfulPosts.includes(post.id) ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="bg-[#1A1A1D] w-full max-w-lg rounded-t-3xl p-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-400 font-medium text-sm"
              >
                Cancel
              </button>
              <span className="font-semibold text-white">Post Anonymously</span>
              <button
                className="bg-white text-gray-900 px-4 py-1.5 rounded-full text-sm font-semibold disabled:opacity-50"
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-violet-500/10 rounded-xl mb-4">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-violet-300 text-xs">Your identity is completely hidden</span>
            </div>

            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share something you can't post publicly..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-violet-500/50 min-h-[120px] text-[15px]"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
}
