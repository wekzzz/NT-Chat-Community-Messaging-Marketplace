import React, { useEffect, useState, useRef } from 'react';
import { PaperclipIcon, SendIcon } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import {
  Message,
  Community,
  getRandomAutoReply,
  generateMessageId,
  getRandomSender } from
'./mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
interface ChatRoomProps {
  community: Community;
  messages: Message[];
  onSendMessage: (message: Message) => void;
}
type FilterType = 'all' | 'looking' | 'offering';
export function ChatRoom({
  community,
  messages,
  onSendMessage
}: ChatRoomProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: generateMessageId(),
      communityId: community.id,
      text: inputText.trim(),
      senderId: 'me',
      senderName: 'Вы',
      timestamp: new Date(),
      isMe: true,
      type: 'text'
    };
    onSendMessage(newMessage);
    setInputText('');
    setTimeout(() => {
      const sender = getRandomSender();
      const replyMessage: Message = {
        id: generateMessageId(),
        communityId: community.id,
        text: getRandomAutoReply(community.id),
        senderId: sender.id,
        senderName: sender.name,
        timestamp: new Date(),
        isMe: false,
        type: 'text'
      };
      onSendMessage(replyMessage);
    }, 1000);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const checkMessageMatch = (text: string, filter: FilterType): boolean => {
    if (filter === 'all') return true;
    const lowerText = text.toLowerCase();
    if (filter === 'looking')
    return ['ищу', 'нужен', 'нужна', 'найти', 'где'].some((k) =>
    lowerText.includes(k)
    );
    if (filter === 'offering')
    return ['продаю', 'есть', 'предлагаю', 'отдам'].some((k) =>
    lowerText.includes(k)
    );
    return false;
  };
  return (
    <div className="flex flex-col h-full">
      {/* Filter Chips */}
      <div
        className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border
        }}>

        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border`}
          style={{
            backgroundColor:
            activeFilter === 'all' ? `${theme.accent}20` : theme.bgElevated,
            borderColor: activeFilter === 'all' ? theme.accent : 'transparent',
            color: activeFilter === 'all' ? theme.accent : theme.textMuted
          }}>

          {t.chatFilterAll}
        </button>
        <button
          onClick={() => setActiveFilter('looking')}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border`}
          style={{
            backgroundColor:
            activeFilter === 'looking' ?
            `${theme.accent}20` :
            theme.bgElevated,
            borderColor:
            activeFilter === 'looking' ? theme.accent : 'transparent',
            color: activeFilter === 'looking' ? theme.accent : theme.textMuted
          }}>

          🔍 {t.chatFilterLooking}
        </button>
        <button
          onClick={() => setActiveFilter('offering')}
          className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border`}
          style={{
            backgroundColor:
            activeFilter === 'offering' ?
            `${theme.accent}20` :
            theme.bgElevated,
            borderColor:
            activeFilter === 'offering' ? theme.accent : 'transparent',
            color: activeFilter === 'offering' ? theme.accent : theme.textMuted
          }}>

          📢 {t.chatFilterOffering}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg) => {
          const isMatch = checkMessageMatch(msg.text, activeFilter);
          const isHighlighted = activeFilter === 'all' ? undefined : isMatch;
          return (
            <MessageBubble
              key={msg.id}
              message={msg}
              isHighlighted={isHighlighted} />);


        })}
        <div ref={messagesEndRef} />
      </div>

      <div
        className="p-3 border-t pb-safe"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border
        }}>

        <div className="flex items-end gap-2">
          <button
            className="p-2.5 rounded-full flex-shrink-0"
            style={{
              color: theme.textMuted
            }}>

            <PaperclipIcon size={24} />
          </button>

          <div
            className="flex-1 rounded-3xl px-4 py-2.5 flex items-center min-h-[44px]"
            style={{
              backgroundColor: theme.inputBg
            }}>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.chatInputPlaceholder}
              className="flex-1 bg-transparent focus:outline-none text-[16px]"
              style={{
                color: theme.textPrimary
              }} />

          </div>

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-full flex-shrink-0 shadow-md transition-transform active:scale-95 disabled:opacity-50"
            style={{
              backgroundColor: theme.accent,
              color: '#fff'
            }}>

            <SendIcon size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>);

}