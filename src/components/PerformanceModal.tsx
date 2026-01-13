'use client';

import { useState } from 'react';

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
    title: 'New skincare routine ✨',
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
      watchTime: '8분 32초',
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

function getPlatformColor(platform: 'instagram' | 'tiktok' | 'youtube') {
  switch (platform) {
    case 'instagram':
      return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case 'tiktok':
      return 'bg-black';
    case 'youtube':
      return 'bg-red-600';
  }
}

export default function PerformanceModal({ brandName, isOpen, onClose }: PerformanceModalProps) {
  const [videos, setVideos] = useState<VideoPerformance[]>(mockPerformanceData);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Send Performance</p>
              <h2 className="text-lg font-bold text-gray-900">{brandName}</h2>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {/* Success State */}
          {isSent ? (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-4xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">전송 완료!</h3>
              <p className="text-sm text-gray-500 mb-6">
                {brandName}에게 퍼포먼스 리포트가 전송되었습니다.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                완료
              </button>
            </div>
          ) : (
            <>
              {/* Video Selection */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-4">
                  전송할 컨텐츠를 선택하세요
                </p>
                <div className="space-y-3">
                  {videos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => toggleSelection(video.id)}
                      className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${
                        video.selected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                        video.selected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {video.selected && <span className="text-white text-sm">✓</span>}
                      </div>

                      {/* Thumbnail */}
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xl mr-3">
                        {video.thumbnail}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-5 h-5 rounded flex items-center justify-center text-xs text-white ${getPlatformColor(video.platform)}`}>
                            {getPlatformIcon(video.platform)}
                          </span>
                          <span className="text-xs text-gray-400">{video.postedAt}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                        <p className="text-xs text-gray-500">
                          {formatNumber(video.metrics.views)} views · {video.metrics.engagementRate}% engagement
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Performance Summary */}
              {hasSelection && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">퍼포먼스 요약</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-2xl font-bold">{formatNumber(totals.views)}</p>
                      <p className="text-xs text-gray-400">Total Views</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{avgEngagement}%</p>
                      <p className="text-xs text-gray-400">Avg. Engagement</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold">{formatNumber(totals.likes)}</p>
                      <p className="text-xs text-gray-400">Likes</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold">{formatNumber(totals.comments)}</p>
                      <p className="text-xs text-gray-400">Comments</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-lg font-bold">{formatNumber(totals.shares)}</p>
                      <p className="text-xs text-gray-400">Shares</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Report Preview */}
              {hasSelection && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span>📊</span>
                    <p className="text-sm font-medium text-gray-900">리포트에 포함되는 내용</p>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      조회수, 좋아요, 댓글, 공유 통계
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      오디언스 인구통계 (연령, 성별, 지역)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      시청 지속 시간 그래프
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      도달률 및 노출 수
                    </li>
                  </ul>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!hasSelection || isSending}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    전송 중...
                  </span>
                ) : hasSelection ? (
                  `${selectedVideos.length}개 컨텐츠 리포트 전송`
                ) : (
                  '컨텐츠를 선택하세요'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
