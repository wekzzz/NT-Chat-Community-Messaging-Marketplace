import React from 'react';
import { ArrowLeftIcon, MessageCircleIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface UserProfileScreenProps {
  userId: string;
  userName: string;
  onBack: () => void;
  onWriteMessage: (userId: string, userName: string) => void;
}

export function UserProfileScreen({ userId, userName, onBack, onWriteMessage }: UserProfileScreenProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: theme.bgApp }}>
      <header className="flex items-center px-4 py-3 border-b sticky top-0 z-20" style={{ backgroundColor: theme.headerBg, borderColor: theme.border }}>
        <button onClick={onBack} className="p-2 -ml-2 rounded-full transition-colors active:scale-95" style={{ color: theme.accent }}>
          <ArrowLeftIcon size={24} />
        </button>
        <h1 className="text-lg font-bold ml-2" style={{ color: theme.textPrimary }}>Профиль участника</h1>
      </header>

      <div className="flex flex-col items-center pt-12 px-4">
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-md mb-4" style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}>
          {userName.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold mb-1" style={{ color: theme.textPrimary }}>{userName}</h2>
        <p className="text-xs mb-8" style={{ color: theme.textMuted }}>ID: {userId}</p>

        <button 
          onClick={() => onWriteMessage(userId, userName)}
          className="w-full max-w-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-md transition-transform active:scale-95"
          style={{ backgroundColor: theme.accent, color: '#fff' }}
        >
          <MessageCircleIcon size={20} />
          Написать сообщение
        </button>
      </div>
    </div>
  );
}
