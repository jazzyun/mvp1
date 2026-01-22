'use client';

import { useEffect } from 'react';
import { Guideline } from '@/types/deal';

interface ShowGuidelinesModalProps {
  brandName: string;
  guidelines: Guideline[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowGuidelinesModal({ brandName, guidelines, isOpen, onClose }: ShowGuidelinesModalProps) {
  // Prevent body scroll when modal is open (iOS Safari fix)
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      // Prevent touchmove on document for iOS
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

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 touch-none"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#DDDDDD] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#717171]">Guidelines</p>
              <h2 className="text-lg font-semibold text-[#222222]">{brandName}</h2>
            </div>
            <button
              onClick={onClose}
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
          <div className="space-y-6">
            {guidelines.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-[#222222] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFF0F3] flex items-center justify-center text-xs text-[#FF385C] font-bold">
                    {index + 1}
                  </span>
                  {section.category}
                </h3>
                <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4">
                  <ul className="space-y-3">
                    {section.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start text-sm text-[#484848]">
                        <svg className="w-4 h-4 text-[#FF385C] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
