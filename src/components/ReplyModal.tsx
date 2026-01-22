'use client';

import { useState, useEffect } from 'react';
import { Deal } from '@/types/deal';

type ReplyIntent = 'accept' | 'negotiate' | 'decline' | 'question' | null;

interface ReplyModalProps {
  deal: Deal;
  isOpen: boolean;
  onClose: () => void;
}

const intentOptions = [
  { id: 'accept', label: 'Accept', icon: '✓', color: 'bg-[#E6F9E6] text-[#008A05] border-[#B8E6B8]' },
  { id: 'negotiate', label: 'Negotiate', icon: '💬', color: 'bg-[#FFF0F3] text-[#FF385C] border-[#FFCCD5]' },
  { id: 'decline', label: 'Decline', icon: '✗', color: 'bg-[#F7F7F7] text-[#717171] border-[#DDDDDD]' },
  { id: 'question', label: 'Question', icon: '?', color: 'bg-[#FFF8E6] text-[#B45309] border-[#FFE4B3]' },
];

function generateAIReply(deal: Deal, intent: ReplyIntent): string {
  const brandName = deal.brandName;
  const amount = deal.offeredAmount ? `$${deal.offeredAmount.toLocaleString()}` : '';

  switch (intent) {
    case 'accept':
      return `Hi ${brandName} team!

Thank you for your proposal. I'd love to move forward with the collaboration on the terms you've outlined (${amount}, ${deal.offeredDetails}).

For next steps, shall we proceed with contract review and signing?
Please let me know your availability for scheduling.

Thank you!`;

    case 'negotiate':
      return `Hi ${brandName} team!

Thank you for the collaboration proposal. I'm very interested in the content direction and your brand.

However, I'd like to discuss a few terms:

${deal.risks.length > 0 ? deal.risks.map(r => `• ${r.description}`).join('\n') : '• Rate adjustment\n• Secondary usage rights scope\n• Payment schedule'}

Would it be possible to discuss these items?

Thank you!`;

    case 'decline':
      return `Hi ${brandName} team!

Thank you for the collaboration proposal.

Unfortunately, after considering my schedule and content direction, I won't be able to participate in this campaign at this time.

I hope we can work together on a future opportunity.

Have a great day!`;

    case 'question':
      return `Hi ${brandName} team!

Thank you for the collaboration proposal. I have a few questions while reviewing:

1. What is the content upload deadline?
2. Is product sponsorship handled separately?
3. What is the content pre-review process?

I'll get back to you after receiving your answers.

Thank you!`;

    default:
      return '';
  }
}

export default function ReplyModal({ deal, isOpen, onClose }: ReplyModalProps) {
  const [selectedIntent, setSelectedIntent] = useState<ReplyIntent>(null);
  const [replyText, setReplyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

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

  const handleIntentSelect = async (intent: ReplyIntent) => {
    setSelectedIntent(intent);
    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const generatedReply = generateAIReply(deal, intent);
    setReplyText(generatedReply);
    setIsGenerating(false);
  };

  const handleSend = async () => {
    if (!replyText.trim()) return;

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    setIsSent(true);
  };

  const handleClose = () => {
    setSelectedIntent(null);
    setReplyText('');
    setIsSent(false);
    setIsSending(false);
    setIsGenerating(false);
    onClose();
  };

  const handleRegenerate = () => {
    if (selectedIntent) {
      handleIntentSelect(selectedIntent);
    }
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
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#717171]">Reply to</p>
              <h2 className="text-lg font-semibold text-[#222222]">{deal.brandName}</h2>
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
                Your reply has been sent to {deal.brandName}.
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
              {/* Original Message Preview */}
              <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-[#717171]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-[#717171] uppercase tracking-wider">Received message</p>
                </div>
                <p className="text-sm text-[#484848]">
                  Hi! This is {deal.brandName}.
                  We&apos;d like to propose a {deal.offeredDetails} content collaboration.
                  {deal.offeredAmount && ` The proposed amount is $${deal.offeredAmount.toLocaleString()}.`}
                </p>
              </div>

              {/* Intent Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-[#484848] mb-3">Select reply type</p>
                <div className="grid grid-cols-4 gap-2">
                  {intentOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleIntentSelect(option.id as ReplyIntent)}
                      className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                        selectedIntent === option.id
                          ? option.color + ' border-current'
                          : 'bg-white text-[#717171] border-[#DDDDDD] hover:bg-[#F7F7F7] hover:border-[#B0B0B0]'
                      }`}
                    >
                      <span className="text-xl mb-1">{option.icon}</span>
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Generated Reply */}
              {selectedIntent && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="text-sm font-medium text-[#484848]">AI-generated reply</p>
                    </div>
                    {!isGenerating && (
                      <button
                        onClick={handleRegenerate}
                        className="text-xs text-[#FF385C] hover:text-[#E31C5F] transition-colors"
                      >
                        Regenerate
                      </button>
                    )}
                  </div>

                  {isGenerating ? (
                    <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-8 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#FFF0F3] border border-[#FFCCD5] flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#FF385C] animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <p className="text-sm text-[#717171]">AI is writing your reply...</p>
                    </div>
                  ) : (
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full h-64 p-4 bg-white border border-[#DDDDDD] rounded-xl text-sm text-[#222222] resize-none focus:outline-none focus:ring-2 focus:ring-[#FF385C]/30 focus:border-[#FF385C] placeholder-[#717171] transition-all"
                      placeholder="Enter your reply..."
                    />
                  )}
                </div>
              )}

              {/* Quick Tips */}
              {selectedIntent === 'negotiate' && !isGenerating && (
                <div className="bg-[#FFF8E6] border border-[#FFE4B3] rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-[#92400E] mb-1">Negotiation tips</p>
                      <ul className="text-xs text-[#B45309] space-y-1">
                        <li>• Propose specific numbers (e.g., +20%)</li>
                        <li>• Offering alternatives increases success rate</li>
                        <li>• Maintain a positive tone</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Channel Info */}
              <div className="flex items-center gap-2 mb-6 text-sm text-[#717171]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>
                  Will be sent via {deal.channel === 'instagram_dm' ? 'Instagram DM' :
                   deal.channel === 'email' ? 'Email' :
                   deal.channel === 'whatsapp' ? 'WhatsApp' : 'Message'}
                </span>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={!replyText.trim() || isSending || isGenerating}
                className="w-full py-3 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-lg font-semibold hover:from-[#D70466] hover:via-[#BD1E59] hover:to-[#BD1E59] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Reply'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
