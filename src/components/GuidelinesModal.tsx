'use client';

import { useState, useEffect } from 'react';
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
    title: 'New skincare routine',
    postedAt: '2h ago',
    views: '12.4K',
  },
  {
    id: '2',
    platform: 'instagram',
    thumbnail: '📦',
    title: 'Unboxing haul',
    postedAt: '1d ago',
    views: '8.2K',
  },
  {
    id: '3',
    platform: 'tiktok',
    thumbnail: '💄',
    title: 'Get ready with me',
    postedAt: '2d ago',
    views: '45.1K',
  },
  {
    id: '4',
    platform: 'tiktok',
    thumbnail: '🏃',
    title: 'Morning workout vlog',
    postedAt: '3d ago',
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
        note = 'Auto-detected';
      } else if (rand > 0.15) {
        status = 'warning';
        note = 'Manual check needed';
      } else {
        status = 'fail';
        note = 'Not met';
      }

      return { requirement: req, status, note };
    }),
  }));
}

export default function GuidelinesModal({ brandName, guidelines, isOpen, onClose }: GuidelinesModalProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<CategoryResult[] | null>(null);

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
        return <svg className="w-4 h-4 text-[#008A05]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
      case 'fail':
        return <svg className="w-4 h-4 text-[#C13515]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
      case 'warning':
        return <svg className="w-4 h-4 text-[#B45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
    }
  };

  const getStatusBg = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass':
        return 'bg-[#E6F9E6] border-[#B8E6B8]';
      case 'fail':
        return 'bg-[#FFF0F3] border-[#FFCCD5]';
      case 'warning':
        return 'bg-[#FFF8E6] border-[#FFE4B3]';
    }
  };

  const passCount = results?.reduce((acc, cat) => acc + cat.results.filter(r => r.status === 'pass').length, 0) || 0;
  const totalCount = results?.reduce((acc, cat) => acc + cat.results.length, 0) || 0;

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
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {(selectedVideo || results) && (
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
                <p className="text-sm text-[#717171]">Guidelines Check</p>
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
        <div className="overflow-y-auto p-5" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {/* Video Selection */}
          {!selectedVideo && !isChecking && !results && (
            <div>
              <p className="text-sm text-[#717171] mb-4">
                Select a video to check
              </p>
              <div className="space-y-3">
                {mockVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleSelectVideo(video)}
                    className="w-full flex items-center p-4 bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl hover:bg-white hover:border-[#222222] hover:shadow-md transition-all text-left"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center text-2xl mr-4">
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{video.platform === 'instagram' ? '📸' : '🎵'}</span>
                        <span className="text-xs text-[#717171] capitalize">{video.platform}</span>
                      </div>
                      <p className="text-sm font-medium text-[#222222] truncate">{video.title}</p>
                      <p className="text-xs text-[#717171]">{video.postedAt} · {video.views} views</p>
                    </div>
                    <svg className="w-5 h-5 text-[#717171] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Checking State */}
          {isChecking && selectedVideo && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#F7F7F7] border border-[#DDDDDD] flex items-center justify-center text-3xl">
                {selectedVideo.thumbnail}
              </div>
              <p className="text-sm text-[#717171] mb-4">{selectedVideo.title}</p>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FFF0F3] border border-[#FFCCD5] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF385C] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-[#222222] font-medium mb-1">Analyzing video...</p>
              <p className="text-sm text-[#717171]">Checking guideline requirements</p>
            </div>
          )}

          {/* Results */}
          {results && !isChecking && selectedVideo && (
            <div className="space-y-6">
              {/* Selected Video */}
              <div className="flex items-center p-3 bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#EBEBEB] flex items-center justify-center text-xl mr-3">
                  {selectedVideo.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#222222] truncate">{selectedVideo.title}</p>
                  <p className="text-xs text-[#717171]">{selectedVideo.platform === 'instagram' ? '📸' : '🎵'} {selectedVideo.platform}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#222222] mb-1">
                  {passCount}/{totalCount}
                </p>
                <p className="text-sm text-[#717171]">Requirements met</p>
              </div>

              {/* Detailed Results */}
              {results.map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-[#222222] mb-3">
                    {section.category}
                  </h3>
                  <div className="space-y-2">
                    {section.results.map((result, reqIndex) => (
                      <div
                        key={reqIndex}
                        className={`flex items-start p-3 rounded-xl border ${getStatusBg(result.status)}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0">
                          {getStatusIcon(result.status)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#222222]">{result.requirement}</p>
                          {result.note && (
                            <p className="text-xs text-[#717171] mt-0.5">{result.note}</p>
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
                className="w-full py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all"
              >
                Share Results
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
