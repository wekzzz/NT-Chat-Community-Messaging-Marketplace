import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeftIcon, PaperclipIcon, SendIcon, PhoneIcon, VideoIcon, CheckCheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { DMConversation, DMMessage, generateMessageId } from './mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

interface DMChatProps {
  conversation: DMConversation;
  messages: DMMessage[];
  onBack: () => void;
  onSendMessage: (message: DMMessage) => void;
}

export function DMChat({ conversation, messages, onBack, onSendMessage }: DMChatProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Вытаскиваем данные текущего юзера
  const savedProfile = localStorage.getItem('nt_chat_profile');
  const currentUser = savedProfile ? JSON.parse(savedProfile) : null;
  const myUserId = currentUser?.id || 'me';
  const myUserName = currentUser?.userName || 'Я';

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: DMMessage = {
      id: generateMessageId(),
      conversationId: conversation.id,
      text: inputText.trim(),
      senderId: myUserId,
      senderName: myUserName,
      timestamp: new Date(),
      isMe: true // Оставляем true для немедленного отображения у отправителя
    };

    console.log(`[UI Личные Сообщения] 💬 Отправка в диалог ${conversation.id}:`, newMessage);
    
    onSendMessage(newMessage);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: theme.bgApp }}>
      {/* Шапка чата */}
      <header className="flex items-center justify-between px-2 py-2 border-b sticky top-0 z-20" style={{ backgroundColor: theme.headerBg, borderColor: theme.border }}>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-2 rounded-full transition-colors" style={{ color: theme.accent }}><ArrowLeftIcon size={24} /></button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gradient-to-br from-gray-200 to-gray-300 relative">
              {conversation.participantEmoji}
              {conversation.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2" style={{ backgroundColor: theme.accent, borderColor: theme.bgSurface }} />}
            </div>
            <div>
              <h2 className="font-bold text-[16px] leading-tight" style={{ color: theme.textPrimary }}>{conversation.participantName}</h2>
              <p className="text-xs" style={{ color: conversation.isOnline ? theme.accent : theme.textMuted }}>{conversation.isOnline ? 'В сети' : 'Был(а) недавно'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 pr-2">
          <button className="p-2 rounded-full" style={{ color: theme.accent }}><PhoneIcon size={20} /></button>
          <button className="p-2 rounded-full" style={{ color: theme.accent }}><VideoIcon size={20} /></button>
        </div>
      </header>

      {/* История сообщений */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          const msgDate = new Date(msg.timestamp);
          
          // Важнейшая проверка: сверяем ID отправителя с нашим ID. 
          // Если мы получили по сокету чужое сообщение, где isMe=true (потому что отправитель поставил его для себя), мы его переопределяем.
          const isActuallyMe = msg.senderId === myUserId;
          
          // Подсветка новых сообщений
          const isNewMessage = !isActuallyMe && index >= messages.length - 2 && Date.now() - msgDate.getTime() < 60000;
          
          return (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }} className={`flex ${isActuallyMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 shadow-sm ${isActuallyMe ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm border'}`} style={{ backgroundColor: isActuallyMe ? theme.sentBubble : theme.receivedBubble, color: theme.textPrimary, borderColor: isActuallyMe ? 'transparent' : isNewMessage ? theme.accent : theme.border, boxShadow: isNewMessage ? `0 0 0 1px ${theme.accent}40, 0 2px 8px ${theme.accent}20` : undefined }}>
                {isNewMessage && <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: theme.accent }}>Новое</div>}
                <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] opacity-70" style={{ color: isActuallyMe ? theme.textPrimary : theme.textMuted }}>{formatTime(msgDate)}</span>
                  {isActuallyMe && <CheckCheckIcon size={14} style={{ color: theme.accent, opacity: 0.7 }} />}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="p-3 border-t pb-safe sticky bottom-0 z-20" style={{ backgroundColor: theme.bgSurface, borderColor: theme.border }}>
        <div className="flex items-end gap-2">
          <button className="p-2.5 rounded-full flex-shrink-0" style={{ color: theme.textMuted }}><PaperclipIcon size={24} /></button>
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
          {inputText.trim() ? (
            <button onClick={handleSend} className="p-2.5 rounded-full flex-shrink-0 shadow-md transition-transform active:scale-95" style={{ backgroundColor: theme.accent, color: '#fff' }}><SendIcon size={20} className="ml-0.5" /></button>
          ) : (
            <button className="p-2.5 rounded-full flex-shrink-0" style={{ color: theme.textMuted }}><PhoneIcon size={24} /></button>
          )}
        </div>
      </div>
    </div>
  );
}
