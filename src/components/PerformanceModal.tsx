'use client';

import { useState, useEffect } from 'react';

interface VideoPerformance {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  thumbnail: string;
  title: string;
  postedAt: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves?: number;
    watchTime?: string;
    engagementRate: number;
  };
  selected: boolean;
}

interface PerformanceModalProps {
  brandName: string;
  isOpen: boolean;
  onClose: () => void;
}

// Mock performance data from connected accounts
const mockPerformanceData: VideoPerformance[] = [
  {
    id: '1',
    platform: 'instagram',
    thumbnail: '🎬',
    title: 'New skincare routine',
    postedAt: '2024.01.15',
    metrics: {
      views: 124500,
      likes: 8420,
      comments: 342,
      shares: 156,
      saves: 892,
      engagementRate: 7.8,
    },
    selected: false,
  },
  {
    id: '2',
    platform: 'instagram',
    thumbnail: '📦',
    title: 'Unboxing haul - Glossier',
    postedAt: '2024.01.12',
    metrics: {
      views: 89200,
      likes: 5630,
      comments: 218,
      shares: 89,
      saves: 445,
      engagementRate: 7.1,
    },
    selected: false,
  },
  {
    id: '3',
    platform: 'tiktok',
    thumbnail: '💄',
    title: 'Get ready with me #ad',
    postedAt: '2024.01.10',
    metrics: {
      views: 451200,
      likes: 32400,
      comments: 1240,
      shares: 2100,
      engagementRate: 7.9,
    },
    selected: false,
  },
  {
    id: '4',
    platform: 'youtube',
    thumbnail: '🎥',
    title: 'Full Review - Galaxy S24',
    postedAt: '2024.01.08',
    metrics: {
      views: 234000,
      likes: 12300,
      comments: 890,
      shares: 450,
      watchTime: '8m 32s',
      engagementRate: 5.8,
    },
    selected: false,
  },
];

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

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

export default function PerformanceModal({ brandName, isOpen, onClose }: PerformanceModalProps) {
  const [videos, setVideos] = useState<VideoPerformance[]>(mockPerformanceData);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedVideos = videos.filter(v => v.selected);
  const hasSelection = selectedVideos.length > 0;

  const toggleSelection = (id: string) => {
    setVideos(videos.map(v =>
      v.id === id ? { ...v, selected: !v.selected } : v
    ));
  };

  const handleSend = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    setIsSent(true);
  };

  const handleClose = () => {
    setVideos(mockPerformanceData);
    setIsSent(false);
    setIsSending(false);
    onClose();
  };

  // Calculate totals for selected videos
  const totals = selectedVideos.reduce(
    (acc, v) => ({
      views: acc.views + v.metrics.views,
      likes: acc.likes + v.metrics.likes,
      comments: acc.comments + v.metrics.comments,
      shares: acc.shares + v.metrics.shares,
    }),
    { views: 0, likes: 0, comments: 0, shares: 0 }
  );

  const avgEngagement = selectedVideos.length > 0
    ? (selectedVideos.reduce((acc, v) => acc + v.metrics.engagementRate, 0) / selectedVideos.length).toFixed(1)
    : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#DDDDDD] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#717171]">Send Performance</p>
              <h2 className="text-lg font-semibold text-[#222222]">{brandName}</h2>
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
        <div className="overflow-y-auto p-5" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {/* Success State */}
          {isSent ? (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#E6F9E6] border border-[#B8E6B8] flex items-center justify-center">
                <svg className="w-10 h-10 text-[#008A05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#222222] mb-2">Sent!</h3>
              <p className="text-sm text-[#717171] mb-6">
                Performance report has been sent to {brandName}.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Video Selection */}
              <div className="mb-6">
                <p className="text-sm text-[#717171] mb-4">
                  Select content to send
                </p>
                <div className="space-y-3">
                  {videos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => toggleSelection(video.id)}
                      className={`w-full flex items-center p-4 rounded-xl border transition-all text-left ${
                        video.selected
                          ? 'border-[#FF385C] bg-[#FFF0F3]'
                          : 'border-[#DDDDDD] bg-[#F7F7F7] hover:border-[#B0B0B0] hover:bg-white'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                        video.selected
                          ? 'border-[#FF385C] bg-[#FF385C]'
                          : 'border-[#DDDDDD]'
                      }`}>
                        {video.selected && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      {/* Thumbnail */}
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center text-xl mr-3">
                        {video.thumbnail}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs">{getPlatformIcon(video.platform)}</span>
                          <span className="text-xs text-[#717171]">{video.postedAt}</span>
                        </div>
                        <p className="text-sm font-medium text-[#222222] truncate">{video.title}</p>
                        <p className="text-xs text-[#717171]">
                          {formatNumber(video.metrics.views)} views · {video.metrics.engagementRate}% engagement
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Performance Summary */}
              {hasSelection && (
                <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-2xl p-5 mb-6">
                  <h3 className="text-sm font-medium text-[#717171] mb-4">Performance Summary</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-2xl font-bold text-[#222222]">{formatNumber(totals.views)}</p>
                      <p className="text-xs text-[#717171]">Total Views</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#222222]">{avgEngagement}%</p>
                      <p className="text-xs text-[#717171]">Avg. Engagement</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-[#EBEBEB] rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-[#222222]">{formatNumber(totals.likes)}</p>
                      <p className="text-xs text-[#717171]">Likes</p>
                    </div>
                    <div className="bg-white border border-[#EBEBEB] rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-[#222222]">{formatNumber(totals.comments)}</p>
                      <p className="text-xs text-[#717171]">Comments</p>
                    </div>
                    <div className="bg-white border border-[#EBEBEB] rounded-xl p-3 text-center">
                      <p className="text-lg font-bold text-[#222222]">{formatNumber(totals.shares)}</p>
                      <p className="text-xs text-[#717171]">Shares</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Report Preview */}
              {hasSelection && (
                <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium text-[#222222]">Report includes</p>
                  </div>
                  <ul className="space-y-2 text-sm text-[#484848]">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#008A05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Views, likes, comments, shares statistics
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#008A05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Audience demographics (age, gender, region)
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#008A05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Watch time retention graph
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#008A05]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Reach and impressions
                    </li>
                  </ul>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!hasSelection || isSending}
                className="w-full py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending...
                  </span>
                ) : hasSelection ? (
                  `Send ${selectedVideos.length} Content Report`
                ) : (
                  'Select content'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
