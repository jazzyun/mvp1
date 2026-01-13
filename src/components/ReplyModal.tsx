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
  { id: 'accept', label: '수락', icon: '✓', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'negotiate', label: '협상', icon: '💬', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'decline', label: '거절', icon: '✗', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'question', label: '질문', icon: '?', color: 'bg-amber-100 text-amber-700 border-amber-200' },
];

function generateAIReply(deal: Deal, intent: ReplyIntent): string {
  const brandName = deal.brandName;
  const amount = deal.offeredAmount ? `$${deal.offeredAmount.toLocaleString()}` : '';

  switch (intent) {
    case 'accept':
      return `안녕하세요, ${brandName} 담당자님!

제안 주셔서 감사합니다. 말씀하신 조건(${amount}, ${deal.offeredDetails})으로 협업 진행하고 싶습니다.

다음 단계로 계약서 검토 후 서명 진행하면 될까요?
일정 조율을 위해 편하신 시간 알려주시면 감사하겠습니다.

감사합니다.`;

    case 'negotiate':
      return `안녕하세요, ${brandName} 담당자님!

협업 제안 감사드립니다. 컨텐츠 방향과 브랜드가 마음에 들어 긍정적으로 검토 중입니다.

다만, 몇 가지 조건에 대해 협의가 필요할 것 같습니다:

${deal.risks.length > 0 ? deal.risks.map(r => `• ${r.description}`).join('\n') : '• 금액 조정\n• 2차 활용권 범위\n• 지급 일정'}

위 사항들에 대해 논의 가능하실까요?

감사합니다.`;

    case 'decline':
      return `안녕하세요, ${brandName} 담당자님!

협업 제안 주셔서 감사합니다.

아쉽게도 현재 일정/컨텐츠 방향성 등을 고려했을 때 이번 캠페인 참여가 어려울 것 같습니다.

다음에 좋은 기회가 있으면 다시 연락 주시면 감사하겠습니다.

좋은 하루 되세요!`;

    case 'question':
      return `안녕하세요, ${brandName} 담당자님!

협업 제안 감사드립니다. 검토 중 몇 가지 확인하고 싶은 사항이 있습니다:

1. 컨텐츠 업로드 마감일은 언제인가요?
2. 제품 협찬은 별도로 진행되나요?
3. 컨텐츠 사전 검수 절차는 어떻게 되나요?

답변 주시면 검토 후 말씀드리겠습니다.

감사합니다.`;

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
              <h3 className="text-xl font-bold text-gray-900 mb-2">전송 완료!</h3>
              <p className="text-sm text-gray-500 mb-6">
                {deal.brandName}에게 답장이 전송되었습니다.
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
              {/* Original Message Preview */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">📩</span>
                  <p className="text-xs text-gray-500">받은 메시지</p>
                </div>
                <p className="text-sm text-gray-700">
                  안녕하세요! {deal.brandName}입니다.
                  {deal.offeredDetails} 컨텐츠 협업을 제안드립니다.
                  {deal.offeredAmount && `제안 금액은 $${deal.offeredAmount.toLocaleString()}입니다.`}
                </p>
              </div>

              {/* Intent Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">답장 유형 선택</p>
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
                      <p className="text-sm font-medium text-gray-700">AI 작성 답장</p>
                    </div>
                    {!isGenerating && (
                      <button
                        onClick={handleRegenerate}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        다시 생성
                      </button>
                    )}
                  </div>

                  {isGenerating ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                        <span className="text-lg">✨</span>
                      </div>
                      <p className="text-sm text-gray-500">AI가 답장을 작성 중...</p>
                    </div>
                  ) : (
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="답장 내용을 입력하세요..."
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
                      <p className="text-sm font-medium text-amber-800 mb-1">협상 팁</p>
                      <ul className="text-xs text-amber-700 space-y-1">
                        <li>• 구체적인 수치로 제안하세요 (예: +20%)</li>
                        <li>• 대안을 함께 제시하면 성공률이 높아요</li>
                        <li>• 긍정적인 톤을 유지하세요</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Channel Info */}
              <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                <span>📤</span>
                <span>
                  {deal.channel === 'instagram_dm' ? 'Instagram DM' :
                   deal.channel === 'email' ? 'Email' :
                   deal.channel === 'whatsapp' ? 'WhatsApp' : 'Message'}으로 전송됩니다
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
                    전송 중...
                  </span>
                ) : (
                  '답장 보내기'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
