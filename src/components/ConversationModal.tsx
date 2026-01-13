'use client';

import { Conversation, ConversationMessage, DealChannel } from '@/types/deal';

interface ConversationModalProps {
  brandName: string;
  conversation: Conversation;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return '어제';
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  }
}

function getChannelLabel(channel: DealChannel): string {
  const labels: Record<DealChannel, string> = {
    instagram_dm: 'Instagram DM',
    email: 'Email',
    whatsapp: 'WhatsApp',
    other: 'Message',
  };
  return labels[channel];
}

function getChannelIcon(channel: DealChannel): string {
  const icons: Record<DealChannel, string> = {
    instagram_dm: '📸',
    email: '📧',
    whatsapp: '💬',
    other: '💌',
  };
  return icons[channel];
}

function MessageBubble({ message }: { message: ConversationMessage }) {
  const isBrand = message.sender === 'brand';

  return (
    <div className={`flex ${isBrand ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] ${isBrand ? 'order-2' : 'order-1'}`}>
        {/* Sender name */}
        <p className={`text-xs text-gray-500 mb-1 ${isBrand ? 'text-left' : 'text-right'}`}>
          {message.senderName}
        </p>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isBrand
              ? 'bg-gray-100 text-gray-900 rounded-tl-sm'
              : 'bg-blue-600 text-white rounded-tr-sm'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>

          {/* Attachment */}
          {message.hasAttachment && (
            <div
              className={`mt-2 flex items-center gap-2 text-xs ${
                isBrand ? 'text-gray-600' : 'text-blue-100'
              }`}
            >
              <span>
                {message.attachmentType === 'contract' ? '📄' :
                 message.attachmentType === 'image' ? '🖼️' : '📎'}
              </span>
              <span className="underline">{message.attachmentName}</span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-xs text-gray-400 mt-1 ${isBrand ? 'text-left' : 'text-right'}`}>
          {formatDate(message.timestamp)}
        </p>
      </div>

      {/* Avatar */}
      {isBrand && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm mr-2 order-1 flex-shrink-0">
          {message.senderName.charAt(0)}
        </div>
      )}
    </div>
  );
}

export default function ConversationModal({ brandName, conversation, isOpen, onClose }: ConversationModalProps) {
  if (!isOpen) return null;

  // Group messages by date
  const groupedMessages: { date: string; messages: ConversationMessage[] }[] = [];
  let currentDate = '';

  conversation.messages.forEach((msg) => {
    const msgDate = msg.timestamp.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({ date: msgDate, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden animate-slide-up flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                {brandName.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{brandName}</h2>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span>{getChannelIcon(conversation.channel)}</span>
                  {getChannelLabel(conversation.channel)} · {conversation.brandEmail}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Date divider */}
              <div className="flex items-center justify-center my-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                  {group.date}
                </span>
              </div>

              {/* Messages for this date */}
              {group.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>💡</span>
            <span>전체 {conversation.messages.length}개의 메시지</span>
          </div>
        </div>
      </div>
    </div>
  );
}
