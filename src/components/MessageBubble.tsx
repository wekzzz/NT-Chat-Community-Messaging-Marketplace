import React from 'react';
import { useTheme } from './ThemeContext';
import { Message } from './mockDatabase';

interface MessageBubbleProps {
  message: Message;
  isHighlighted?: boolean;
  onUserClick?: (userId: string, userName: string) => void;
}

export function MessageBubble({ message, isHighlighted, onUserClick }: MessageBubbleProps) {
  const { theme } = useTheme();
  const isMe = message.isMe;

  return (
    <div className={`flex w-full mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div 
          onClick={() => onUserClick && onUserClick(message.senderId, message.senderName)}
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm mr-2 cursor-pointer active:scale-90 transition-transform shadow-sm"
          style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}
        >
          {message.senderName?.charAt(0).toUpperCase() || 'U'}
        </div>
      )}
      <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${isMe ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
           style={{ 
             backgroundColor: isMe ? theme.sentBubble : theme.receivedBubble,
             color: theme.textPrimary,
             border: isHighlighted ? `2px solid ${theme.accent}` : 'none'
           }}>
        {!isMe && (
          <div 
            onClick={() => onUserClick && onUserClick(message.senderId, message.senderName)}
            className="text-[12px] font-bold mb-1 cursor-pointer hover:underline opacity-90" 
            style={{ color: theme.accent }}
          >
            {message.senderName}
          </div>
        )}
        <p className="text-[15px] leading-relaxed break-words">{message.text}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[10px] opacity-70" style={{ color: theme.textMuted }}>
            {new Date(message.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}
