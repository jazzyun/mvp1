'use client';

import { useState } from 'react';
import { Deal } from '@/types/deal';

type ReplyIntent = 'accept' | 'negotiate' | 'decline' | 'question' | null;

interface ReplyModalProps {
  deal: Deal;
  isOpen: boolean;
  onClose: () => void;
}

const intentOptions = [
  { id: 'accept', label: 'Accept', icon: '✓', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'negotiate', label: 'Negotiate', icon: '💬', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'decline', label: 'Decline', icon: '✗', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'question', label: 'Question', icon: '?', color: 'bg-amber-100 text-amber-700 border-amber-200' },
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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Reply to</p>
              <h2 className="text-lg font-bold text-gray-900">{deal.brandName}</h2>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sent!</h3>
              <p className="text-sm text-gray-500 mb-6">
                Your reply has been sent to {deal.brandName}.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Original Message Preview */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">📩</span>
                  <p className="text-xs text-gray-500">Received message</p>
                </div>
                <p className="text-sm text-gray-700">
                  Hi! This is {deal.brandName}.
                  We&apos;d like to propose a {deal.offeredDetails} content collaboration.
                  {deal.offeredAmount && ` The proposed amount is $${deal.offeredAmount.toLocaleString()}.`}
                </p>
              </div>

              {/* Intent Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Select reply type</p>
                <div className="grid grid-cols-4 gap-2">
                  {intentOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleIntentSelect(option.id as ReplyIntent)}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                        selectedIntent === option.id
                          ? option.color + ' border-current'
                          : 'bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100'
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
                      <span className="text-sm">🤖</span>
                      <p className="text-sm font-medium text-gray-700">AI-generated reply</p>
                    </div>
                    {!isGenerating && (
                      <button
                        onClick={handleRegenerate}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Regenerate
                      </button>
                    )}
                  </div>

                  {isGenerating ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                        <span className="text-lg">✨</span>
                      </div>
                      <p className="text-sm text-gray-500">AI is writing your reply...</p>
                    </div>
                  ) : (
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your reply..."
                    />
                  )}
                </div>
              )}

              {/* Quick Tips */}
              {selectedIntent === 'negotiate' && !isGenerating && (
                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500">💡</span>
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">Negotiation tips</p>
                      <ul className="text-xs text-amber-700 space-y-1">
                        <li>• Propose specific numbers (e.g., +20%)</li>
                        <li>• Offering alternatives increases success rate</li>
                        <li>• Maintain a positive tone</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Channel Info */}
              <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <span>📤</span>
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
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
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
