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
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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

function MessageBubble({ message }: { message: ConversationMessage }) {
  const isBrand = message.sender === 'brand';

  return (
    <div className={`flex ${isBrand ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] ${isBrand ? 'order-2' : 'order-1'}`}>
        {/* Sender name */}
        <p className={`text-xs text-[#717171] mb-1 ${isBrand ? 'text-left' : 'text-right'}`}>
          {message.senderName}
        </p>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isBrand
              ? 'bg-[#F7F7F7] text-[#222222] rounded-tl-sm border border-[#EBEBEB]'
              : 'bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white rounded-tr-sm'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>

          {/* Attachment */}
          {message.hasAttachment && (
            <div
              className={`mt-2 flex items-center gap-2 text-xs ${
                isBrand ? 'text-[#717171]' : 'text-white/80'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span className="underline">{message.attachmentName}</span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-xs text-[#717171] mt-1 ${isBrand ? 'text-left' : 'text-right'}`}>
          {formatDate(message.timestamp)}
        </p>
      </div>

      {/* Avatar */}
      {isBrand && (
        <div className="w-8 h-8 rounded-full bg-[#F7F7F7] border border-[#DDDDDD] flex items-center justify-center text-sm text-[#484848] mr-2 order-1 flex-shrink-0">
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
    const msgDate = msg.timestamp.toLocaleDateString('en-US', {
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
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#DDDDDD] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-xl animate-slide-up flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-5 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F7F7F7] border border-[#DDDDDD] flex items-center justify-center text-lg text-[#484848]">
                {brandName.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#222222]">{brandName}</h2>
                <p className="text-xs text-[#717171] flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {getChannelLabel(conversation.channel)} · {conversation.brandEmail}
                </p>
              </div>
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 bg-white" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          {groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Date divider */}
              <div className="flex items-center justify-center my-4">
                <span className="px-3 py-1 bg-[#F7F7F7] border border-[#EBEBEB] rounded-full text-xs text-[#717171]">
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
        <div className="sticky bottom-0 bg-white border-t border-[#EBEBEB] p-4">
          <div className="flex items-center gap-2 text-sm text-[#717171]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{conversation.messages.length} total messages</span>
          </div>
        </div>
      </div>
    </div>
  );
}
