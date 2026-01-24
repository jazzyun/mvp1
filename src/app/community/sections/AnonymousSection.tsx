'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const anonymousPosts = [
  {
    id: '1',
    categoryKey: 'contract',
    categoryColor: 'bg-[#E6F4FF] text-[#0066CC] border-[#B3D9FF]',
    upvotes: 156,
    downvotes: 8,
    replies: 67,
    timeAgo: '2h',
    helpfulCount: 45,
  },
  {
    id: '2',
    categoryKey: 'personal',
    categoryColor: 'bg-[#FFF0F3] text-[#FF385C] border-[#FFCCD5]',
    upvotes: 234,
    downvotes: 12,
    replies: 89,
    timeAgo: '4h',
    helpfulCount: 78,
  },
  {
    id: '3',
    categoryKey: 'wellness',
    categoryColor: 'bg-[#F3E8FF] text-[#7C3AED] border-[#DDD6FE]',
    upvotes: 567,
    downvotes: 23,
    replies: 156,
    timeAgo: '6h',
    helpfulCount: 123,
  },
  {
    id: '4',
    categoryKey: 'agency',
    categoryColor: 'bg-[#FFF8E6] text-[#B45309] border-[#FFE4B3]',
    upvotes: 189,
    downvotes: 15,
    replies: 92,
    timeAgo: '8h',
    helpfulCount: 34,
  },
  {
    id: '5',
    categoryKey: 'payment',
    categoryColor: 'bg-[#FFF0F3] text-[#C13515] border-[#FFCCD5]',
    upvotes: 423,
    downvotes: 18,
    replies: 134,
    timeAgo: '12h',
    helpfulCount: 89,
  },
];

export default function AnonymousSection() {
  const t = useTranslations('anonymous');
  const tCommon = useTranslations('common');
  const tFeed = useTranslations('feed');
  const [showCompose, setShowCompose] = useState(false);
  const [showReplies, setShowReplies] = useState<string | null>(null);
  const [newPost, setNewPost] = useState('');
  const [newReply, setNewReply] = useState('');
  const [helpfulPosts, setHelpfulPosts] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  const toggleHelpful = (postId: string) => {
    setHelpfulPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setVotes(prev => ({
      ...prev,
      [postId]: prev[postId] === type ? null : type
    }));
  };

  const getVoteCount = (post: typeof anonymousPosts[0]) => {
    const vote = votes[post.id];
    let upvotes = post.upvotes;
    let downvotes = post.downvotes;
    if (vote === 'up') upvotes += 1;
    if (vote === 'down') downvotes += 1;
    return upvotes - downvotes;
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen -mt-6 pt-6">
      <div className="px-4 sm:px-5 py-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('title')}</h2>
            <p className="text-sm text-[#A0A0A0] mt-0.5">{t('subtitle')}</p>
          </div>
          <button
            onClick={() => setShowCompose(true)}
            className="bg-white text-[#0A0A0A] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#E5E5E5] transition-colors"
          >
            {t('postButton')}
          </button>
        </div>

        {/* Privacy Badge */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A]">
          <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-medium">{t('identityProtected')}</p>
            <p className="text-[#808080] text-xs">{t('identityProtectedDesc')}</p>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {anonymousPosts.map((post) => (
            <div key={post.id} className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] overflow-hidden hover:border-[#3A3A3A] transition-all">
              {/* Header */}
              <div className="p-4 pb-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center border border-[#3A3A3A]">
                    <svg className="w-5 h-5 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-white text-sm font-medium">{t('title')}</span>
                    <span className="text-[#606060] text-xs ml-2">· {post.timeAgo}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 ${post.categoryColor} text-[10px] font-bold rounded-full uppercase tracking-wider border`}>
                  {t(`categories.${post.categoryKey}`)}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-[#E0E0E0] text-[15px] leading-relaxed">{t(`posts.${post.id}.content`)}</p>
              </div>

              {/* Actions - Upvote/Downvote + Replies */}
              <div className="px-4 py-3 border-t border-[#2A2A2A] flex items-center gap-2">
                {/* Upvote/Downvote */}
                <div className="flex items-center bg-[#2A2A2A] rounded-full">
                  <button
                    onClick={() => handleVote(post.id, 'up')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-l-full transition-colors ${
                      votes[post.id] === 'up'
                        ? 'bg-[#1A2A1A] text-[#4ADE80]'
                        : 'hover:bg-[#3A3A3A] text-[#808080]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <span className={`text-sm font-semibold px-2 ${
                    votes[post.id] === 'up' ? 'text-[#4ADE80]' : votes[post.id] === 'down' ? 'text-[#FF6B6B]' : 'text-[#A0A0A0]'
                  }`}>
                    {getVoteCount(post)}
                  </span>
                  <button
                    onClick={() => handleVote(post.id, 'down')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-r-full transition-colors ${
                      votes[post.id] === 'down'
                        ? 'bg-[#2A1A1A] text-[#FF6B6B]'
                        : 'hover:bg-[#3A3A3A] text-[#808080]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Reply Button */}
                <button
                  onClick={() => setShowReplies(showReplies === post.id ? null : post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    showReplies === post.id
                      ? 'bg-[#3A3A3A] text-white'
                      : 'bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#808080]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">{post.replies}</span>
                </button>

                {/* Helpful Button */}
                <button
                  onClick={() => toggleHelpful(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors ml-auto ${
                    helpfulPosts.includes(post.id)
                      ? 'bg-[#1A2A1A] text-[#4ADE80]'
                      : 'bg-[#2A2A2A] text-[#808080] hover:bg-[#3A3A3A]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{post.helpfulCount + (helpfulPosts.includes(post.id) ? 1 : 0)}</span>
                </button>
              </div>

              {/* Chat-style Replies Section */}
              {showReplies === post.id && (
                <div className="border-t border-[#2A2A2A] bg-[#0F0F0F]">
                  {/* Sample Replies */}
                  <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#3A3A3A] flex-shrink-0 flex items-center justify-center text-xs font-medium text-[#808080]">?</div>
                      <div className="flex-1">
                        <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-sm px-3 py-2 border border-[#2A2A2A]">
                          <span className="text-xs font-medium text-[#606060]">{t('title')}</span>
                          <p className="text-sm text-[#E0E0E0]">{tFeed('sampleReply1')}</p>
                        </div>
                        <span className="text-[10px] text-[#606060] ml-1 mt-0.5">{tFeed('justNow')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#3A3A3A] flex-shrink-0 flex items-center justify-center text-xs font-medium text-[#808080]">?</div>
                      <div className="flex-1">
                        <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-sm px-3 py-2 border border-[#2A2A2A]">
                          <span className="text-xs font-medium text-[#606060]">{t('title')}</span>
                          <p className="text-sm text-[#E0E0E0]">{tFeed('sampleReply2')}</p>
                        </div>
                        <span className="text-[10px] text-[#606060] ml-1 mt-0.5">2m</span>
                      </div>
                    </div>
                  </div>

                  {/* Reply Input - Chat style */}
                  <div className="p-3 border-t border-[#2A2A2A] bg-[#1A1A1A]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#3A3A3A] flex items-center justify-center text-[#808080] text-xs flex-shrink-0">
                        ?
                      </div>
                      <div className="flex-1 flex items-center bg-[#2A2A2A] rounded-full border border-[#3A3A3A] pr-1">
                        <input
                          type="text"
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          placeholder={tFeed('replyPlaceholder')}
                          className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-[#606060] focus:outline-none"
                        />
                        <button
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0A0A0A] disabled:opacity-50"
                          disabled={!newReply.trim()}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center">
          <div className="bg-[#1A1A1A] w-full max-w-lg rounded-t-3xl p-5 border-t border-[#2A2A2A]">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowCompose(false)}
                className="text-[#808080] font-medium text-sm"
              >
                {tCommon('cancel')}
              </button>
              <span className="font-semibold text-white">{t('postAnonymously')}</span>
              <button
                className="bg-white text-[#0A0A0A] px-4 py-1.5 rounded-full text-sm font-semibold disabled:opacity-50"
                disabled={!newPost.trim()}
              >
                {tCommon('post')}
              </button>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-[#2A2A2A] rounded-xl mb-4 border border-[#3A3A3A]">
              <svg className="w-4 h-4 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[#FF385C] text-xs">{t('identityHidden')}</span>
            </div>

            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={t('placeholder')}
              className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl p-4 text-white placeholder-[#606060] resize-none focus:outline-none focus:border-[#FF385C] focus:ring-1 focus:ring-[#FF385C] min-h-[120px] text-[15px]"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
}
