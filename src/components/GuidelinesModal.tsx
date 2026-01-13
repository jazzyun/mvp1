'use client';

import { useState } from 'react';
import { Guideline } from '@/types/deal';

interface VideoItem {
  id: string;
  platform: 'instagram' | 'tiktok';
  thumbnail: string;
  title: string;
  postedAt: string;
  views: string;
}

interface CheckResult {
  requirement: string;
  status: 'pass' | 'fail' | 'warning';
  note?: string;
}

interface CategoryResult {
  category: string;
  results: CheckResult[];
}

interface GuidelinesModalProps {
  brandName: string;
  guidelines: Guideline[];
  isOpen: boolean;
  onClose: () => void;
}

// Mock videos from connected accounts
const mockVideos: VideoItem[] = [
  {
    id: '1',
    platform: 'instagram',
    thumbnail: '🎬',
    title: 'New skincare routine ✨',
    postedAt: '2시간 전',
    views: '12.4K',
  },
  {
    id: '2',
    platform: 'instagram',
    thumbnail: '📦',
    title: 'Unboxing haul',
    postedAt: '1일 전',
    views: '8.2K',
  },
  {
    id: '3',
    platform: 'tiktok',
    thumbnail: '💄',
    title: 'Get ready with me',
    postedAt: '2일 전',
    views: '45.1K',
  },
  {
    id: '4',
    platform: 'tiktok',
    thumbnail: '🏃',
    title: 'Morning workout vlog',
    postedAt: '3일 전',
    views: '23.7K',
  },
];

// Mock function to simulate AI analysis
function mockAnalyzeVideo(guidelines: Guideline[]): CategoryResult[] {
  return guidelines.map(section => ({
    category: section.category,
    results: section.requirements.map(req => {
      const rand = Math.random();
      let status: 'pass' | 'fail' | 'warning';
      let note: string | undefined;

      if (rand > 0.3) {
        status = 'pass';
        note = '자동 감지됨';
      } else if (rand > 0.15) {
        status = 'warning';
        note = '수동 확인 필요';
      } else {
        status = 'fail';
        note = '미충족';
      }

      return { requirement: req, status, note };
    }),
  }));
}

export default function GuidelinesModal({ brandName, guidelines, isOpen, onClose }: GuidelinesModalProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<CategoryResult[] | null>(null);

  if (!isOpen) return null;

  const handleSelectVideo = async (video: VideoItem) => {
    setSelectedVideo(video);
    setIsChecking(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const analysisResults = mockAnalyzeVideo(guidelines);
    setResults(analysisResults);
    setIsChecking(false);
  };

  const handleClose = () => {
    setSelectedVideo(null);
    setResults(null);
    setIsChecking(false);
    onClose();
  };

  const handleBack = () => {
    setSelectedVideo(null);
    setResults(null);
    setIsChecking(false);
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return <span className="text-green-500">✓</span>;
      case 'fail':
        return <span className="text-red-500">✗</span>;
      case 'warning':
        return <span className="text-amber-500">!</span>;
    }
  };

  const getStatusBg = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return 'bg-green-50 border-green-200';
      case 'fail':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
    }
  };

  const getPlatformIcon = (platform: 'instagram' | 'tiktok') => {
    return platform === 'instagram' ? '📸' : '🎵';
  };

  const passCount = results?.reduce((acc, cat) => acc + cat.results.filter(r => r.status === 'pass').length, 0) || 0;
  const totalCount = results?.reduce((acc, cat) => acc + cat.results.length, 0) || 0;

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
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {(selectedVideo || results) && (
                <button
                  onClick={handleBack}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors mr-3"
                >
                  ←
                </button>
              )}
              <div>
                <p className="text-sm text-gray-500">Guidelines Check</p>
                <h2 className="text-lg font-bold text-gray-900">{brandName}</h2>
              </div>
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
          {/* Video Selection */}
          {!selectedVideo && !isChecking && !results && (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                체크할 영상을 선택하세요
              </p>
              <div className="space-y-3">
                {mockVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className="w-full flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center text-2xl mr-4">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{getPlatformIcon(video.platform)}</span>
                        <span className="text-xs text-gray-400 capitalize">{video.platform}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.postedAt} · {video.views} views</p>
                    </div>
                    <span className="text-gray-400 ml-2">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Checking State */}
          {isChecking && selectedVideo && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
                {selectedVideo.thumbnail}
              </div>
              <p className="text-sm text-gray-500 mb-4">{selectedVideo.title}</p>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                <span className="text-xl">🔍</span>
              </div>
              <p className="text-gray-900 font-medium mb-1">영상 분석 중...</p>
              <p className="text-sm text-gray-500">가이드라인 항목을 확인하고 있습니다</p>
            </div>
          )}

          {/* Results */}
          {results && !isChecking && selectedVideo && (
            <div className="space-y-6">
              {/* Selected Video */}
              <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xl mr-3">
                  {selectedVideo.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{selectedVideo.title}</p>
                  <p className="text-xs text-gray-500">{getPlatformIcon(selectedVideo.platform)} {selectedVideo.platform}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {passCount}/{totalCount}
                </p>
                <p className="text-sm text-gray-500">항목 충족</p>
              </div>

              {/* Detailed Results */}
              {results.map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    {section.category}
                  </h3>
                  <div className="space-y-2">
                    {section.results.map((result, reqIndex) => (
                      <div
                        key={reqIndex}
                        className={`flex items-start p-3 rounded-xl border ${getStatusBg(result.status)}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                          {getStatusIcon(result.status)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{result.requirement}</p>
                          {result.note && (
                            <p className="text-xs text-gray-500 mt-0.5">{result.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Share Button */}
              <button
                onClick={handleClose}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                결과 공유하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
