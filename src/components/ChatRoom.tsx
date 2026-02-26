import React, { useEffect, useState, useRef } from 'react';
import { PaperclipIcon, SendIcon } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { Message, Community, generateMessageId } from './mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

interface ChatRoomProps {
  community: Community;
  messages: Message[];
  onSendMessage: (message: Message) => void;
}

type FilterType = 'all' | 'looking' | 'offering';

export function ChatRoom({ community, messages, onSendMessage }: ChatRoomProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Получаем текущего пользователя один раз при рендере
  const savedProfile = localStorage.getItem('nt_chat_profile');
  const currentUser = savedProfile ? JSON.parse(savedProfile) : null;
  const myUserId = currentUser?.id || 'me';
  const myUserName = currentUser?.userName || 'Пользователь';

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: generateMessageId(),
      communityId: community.id,
      text: inputText.trim(),
      senderId: myUserId, 
      senderName: myUserName,
      timestamp: new Date(),
      isMe: true, // Локальный флаг для немедленной отрисовки
      type: 'text'
    };
    
    console.log(`[UI Чат Сообщества] 📝 Подготовлено сообщение:`, newMessage);
    
    onSendMessage(newMessage);
    setInputText('');
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
    if (filter === 'looking') return ['ищу', 'нужен', 'нужна', 'найти', 'где'].some(k => lowerText.includes(k));
    if (filter === 'offering') return ['продаю', 'есть', 'предлагаю', 'отдам'].some(k => lowerText.includes(k));
    return false;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Фильтры */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b" style={{ backgroundColor: theme.bgSurface, borderColor: theme.border }}>
        <button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border`} style={{ backgroundColor: activeFilter === 'all' ? `${theme.accent}20` : theme.bgElevated, borderColor: activeFilter === 'all' ? theme.accent : 'transparent', color: activeFilter === 'all' ? theme.accent : theme.textMuted }}>{t.chatFilterAll}</button>
        <button onClick={() => setActiveFilter('looking')} className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border`} style={{ backgroundColor: activeFilter === 'looking' ? `${theme.accent}20` : theme.bgElevated, borderColor: activeFilter === 'looking' ? theme.accent : 'transparent', color: activeFilter === 'looking' ? theme.accent : theme.textMuted }}>🔍 {t.chatFilterLooking}</button>
        <button onClick={() => setActiveFilter('offering')} className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border`} style={{ backgroundColor: activeFilter === 'offering' ? `${theme.accent}20` : theme.bgElevated, borderColor: activeFilter === 'offering' ? theme.accent : 'transparent', color: activeFilter === 'offering' ? theme.accent : theme.textMuted }}>📢 {t.chatFilterOffering}</button>
      </div>

      {/* Список сообщений */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((msg) => {
          const isMatch = checkMessageMatch(msg.text, activeFilter);
          const isHighlighted = activeFilter === 'all' ? undefined : isMatch;
          
          // Жестко проверяем, наше ли это сообщение (на случай если по WS пришло isMe: true от другого клиента)
          const isActuallyMe = msg.senderId === myUserId;
          const correctedMsg = { ...msg, isMe: isActuallyMe };

          return <MessageBubble key={msg.id} message={correctedMsg} isHighlighted={isHighlighted} />;
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="p-3 border-t pb-safe" style={{ backgroundColor: theme.bgSurface, borderColor: theme.border }}>
        <div className="flex items-end gap-2">
          <button className="p-2.5 rounded-full flex-shrink-0" style={{ color: theme.textMuted }}>
            <PaperclipIcon size={24} />
          </button>
          <div className="flex-1 rounded-3xl px-4 py-2.5 flex items-center min-h-[44px]" style={{ backgroundColor: theme.inputBg }}>
            <input 
              type="text" 
              value={inputText} 
              onChange={(e) => setInputText(e.target.value)} 
              onKeyPress={handleKeyPress} 
              placeholder={t.chatInputPlaceholder} 
              className="flex-1 bg-transparent focus:outline-none text-[16px]" 
              style={{ color: theme.textPrimary }} 
            />
          </div>
          <button onClick={handleSend} disabled={!inputText.trim()} className="p-2.5 rounded-full flex-shrink-0 shadow-md transition-transform active:scale-95 disabled:opacity-50" style={{ backgroundColor: theme.accent, color: '#fff' }}>
            <SendIcon size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
