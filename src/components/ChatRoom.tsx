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
  onUserClick: (userId: string, userName: string) => void;
}

export function ChatRoom({ community, messages, onSendMessage, onUserClick }: ChatRoomProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const savedProfile = localStorage.getItem('nt_chat_profile');
  const currentUser = savedProfile ? JSON.parse(savedProfile) : null;
  const myUserId = currentUser?.id || 'me';

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      id: generateMessageId(),
      communityId: community.id,
      text: inputText.trim(),
      senderId: myUserId, 
      senderName: currentUser?.userName || 'Пользователь',
      timestamp: new Date(),
      isMe: true,
      type: 'text'
    };
    
    onSendMessage(newMessage);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-app">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg) => {
          // Гарантируем правильную отрисовку своих/чужих сообщений
          const correctedMsg = { ...msg, isMe: msg.senderId === myUserId };
          return <MessageBubble key={msg.id} message={correctedMsg} onUserClick={onUserClick} />;
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t pb-safe" style={{ backgroundColor: theme.bgSurface, borderColor: theme.border }}>
        <div className="flex items-end gap-2">
          <button className="p-2.5 rounded-full flex-shrink-0" style={{ color: theme.textMuted }}><PaperclipIcon size={24} /></button>
          <div className="flex-1 rounded-3xl px-4 py-2 flex items-center min-h-[44px]" style={{ backgroundColor: theme.inputBg }}>
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyPress={handleKeyPress} placeholder={t.chatInputPlaceholder} className="flex-1 bg-transparent focus:outline-none text-[16px]" style={{ color: theme.textPrimary }} />
          </div>
          <button onClick={handleSend} disabled={!inputText.trim()} className="p-2.5 rounded-full flex-shrink-0 shadow-md transition-transform active:scale-95 disabled:opacity-50" style={{ backgroundColor: theme.accent, color: '#fff' }}>
            <SendIcon size={20} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
