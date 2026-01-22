'use client';

import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  thumbnail: string;
  title: string;
  postedAt: string;
  views: string;
  likes: string;
  status: 'published' | 'in_review' | 'draft';
  videoUrl?: string;
}

interface ContentListModalProps {
  brandName: string;
  isOpen: boolean;
  onClose: () => void;
}

// Mock content data for each brand
const mockContentByBrand: Record<string, ContentItem[]> = {
  'Glossier': [
    {
      id: '1',
      platform: 'instagram',
      thumbnail: '💄',
      title: 'Glossier Cloud Paint Review',
      postedAt: '2024.01.10',
      views: '45.2K',
      likes: '3.2K',
      status: 'published',
      videoUrl: 'https://instagram.com/reel/123',
    },
    {
      id: '2',
      platform: 'instagram',
      thumbnail: '✨',
      title: 'Morning Skincare Routine ft. Glossier',
      postedAt: '2023.12.15',
      views: '32.1K',
      likes: '2.8K',
      status: 'published',
      videoUrl: 'https://instagram.com/reel/456',
    },
  ],
  'Nike': [
    {
      id: '1',
      platform: 'youtube',
      thumbnail: '👟',
      title: 'Nike Air Max Review - Worth the Hype?',
      postedAt: '2024.01.05',
      views: '125K',
      likes: '8.5K',
      status: 'published',
      videoUrl: 'https://youtube.com/watch?v=abc',
    },
    {
      id: '2',
      platform: 'instagram',
      thumbnail: '🏃',
      title: 'Running Challenge with Nike',
      postedAt: '2024.01.08',
      views: '28.3K',
      likes: '2.1K',
      status: 'published',
      videoUrl: 'https://instagram.com/reel/789',
    },
  ],
  'Samsung Electronics': [
    {
      id: '1',
      platform: 'youtube',
      thumbnail: '📱',
      title: 'Galaxy S24 Ultra - Full Review',
      postedAt: '2024.01.18',
      views: '234K',
      likes: '15.2K',
      status: 'in_review',
    },
  ],
  'Sephora': [
    {
      id: '1',
      platform: 'instagram',
      thumbnail: '💋',
      title: 'Sephora Favorites Haul',
      postedAt: '2024.01.12',
      views: '52.3K',
      likes: '4.1K',
      status: 'published',
      videoUrl: 'https://instagram.com/reel/sephora1',
    },
  ],
  'Spotify': [],
  'Local Cafe Brand': [],
  'Zara': [],
};

function getPlatformIcon(platform: 'instagram' | 'tiktok' | 'youtube') {
  switch (platform) {
    case 'instagram':
      return '📸';
    case 'tiktok':
      return '🎵';
    case 'youtube':
      return '▶️';
  }
}

function getStatusBadge(status: 'published' | 'in_review' | 'draft') {
  switch (status) {
    case 'published':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#E6F9E6] text-[#008A05] border border-[#B8E6B8]">
          Published
        </span>
      );
    case 'in_review':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FFF8E6] text-[#B45309] border border-[#FFE4B3]">
          In Review
        </span>
      );
    case 'draft':
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#F7F7F7] text-[#717171] border border-[#DDDDDD]">
          Draft
        </span>
      );
  }
}

export default function ContentListModal({ brandName, isOpen, onClose }: ContentListModalProps) {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  // Prevent body scroll when modal is open (iOS Safari fix)
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      const preventTouchMove = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        const isScrollable = target.closest('[data-modal-content]');
        if (!isScrollable) {
          e.preventDefault();
        }
      };
      document.addEventListener('touchmove', preventTouchMove, { passive: false });

      return () => {
        document.removeEventListener('touchmove', preventTouchMove);
        const savedScrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY || '0') * -1);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const contents = mockContentByBrand[brandName] || [];

  const handleContentClick = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const handleBack = () => {
    setSelectedContent(null);
  };

  const handleClose = () => {
    setSelectedContent(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 touch-none"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#DDDDDD] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {selectedContent && (
                <button
                  onClick={handleBack}
                  className="w-8 h-8 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] transition-all mr-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div>
                <p className="text-sm text-[#717171]">{selectedContent ? 'Content Details' : 'Your Content'}</p>
                <h2 className="text-lg font-semibold text-[#222222]">{brandName}</h2>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full border border-[#DDDDDD] bg-white flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div data-modal-content className="overflow-y-auto p-5 overscroll-contain" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {/* Content Detail View */}
          {selectedContent ? (
            <div className="space-y-6">
              {/* Video Preview */}
              <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-2xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white border border-[#EBEBEB] flex items-center justify-center text-4xl">
                  {selectedContent.thumbnail}
                </div>
                <h3 className="text-lg font-semibold text-[#222222] mb-2">{selectedContent.title}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-sm">{getPlatformIcon(selectedContent.platform)}</span>
                  <span className="text-sm text-[#717171] capitalize">{selectedContent.platform}</span>
                  <span className="text-sm text-[#717171]">·</span>
                  <span className="text-sm text-[#717171]">{selectedContent.postedAt}</span>
                </div>
                {getStatusBadge(selectedContent.status)}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#222222]">{selectedContent.views}</p>
                  <p className="text-xs text-[#717171]">Views</p>
                </div>
                <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#222222]">{selectedContent.likes}</p>
                  <p className="text-xs text-[#717171]">Likes</p>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedContent.videoUrl && (
                <a
                  href={selectedContent.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on {selectedContent.platform.charAt(0).toUpperCase() + selectedContent.platform.slice(1)}
                </a>
              )}
            </div>
          ) : (
            /* Content List View */
            <div>
              {contents.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7F7F7] border border-[#DDDDDD] flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[#717171] mb-2">No content yet</p>
                  <p className="text-sm text-[#717171]">Content you create for {brandName} will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-[#717171] mb-4">
                    {contents.length} content{contents.length !== 1 ? 's' : ''} with {brandName}
                  </p>
                  {contents.map((content) => (
                    <button
                      key={content.id}
                      onClick={() => handleContentClick(content)}
                      className="w-full flex items-center p-4 bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl hover:bg-white hover:border-[#222222] hover:shadow-md transition-all text-left"
                    >
                      <div className="w-14 h-14 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center text-2xl mr-4">
                        {content.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{getPlatformIcon(content.platform)}</span>
                          <span className="text-xs text-[#717171]">{content.postedAt}</span>
                          {getStatusBadge(content.status)}
                        </div>
                        <p className="text-sm font-medium text-[#222222] truncate">{content.title}</p>
                        <p className="text-xs text-[#717171]">{content.views} views · {content.likes} likes</p>
                      </div>
                      <svg className="w-5 h-5 text-[#717171] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
