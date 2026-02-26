import React, { useState } from 'react';
import { SearchIcon, EditIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { DMConversation } from './mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
interface DMListProps {
  conversations: DMConversation[];
  onChatClick: (conversationId: string) => void;
}
export function DMList({ conversations, onChatClick }: DMListProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredConversations = conversations.filter((c) =>
  c.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div
      className="h-full overflow-y-auto pb-24 relative no-scrollbar"
      style={{
        backgroundColor: theme.bgApp
      }}>

      <div className="sticky top-0 z-20">
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            backgroundColor: theme.headerBg,
            borderBottom: `1px solid ${theme.border}`
          }} />

        <div className="relative px-4 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold font-syne"
            style={{
              color: theme.textPrimary
            }}>

            {t.chatsTitle}
          </h1>
          <button
            className="p-2 rounded-full transition-colors"
            style={{
              backgroundColor: theme.bgElevated,
              color: theme.accent
            }}>

            <EditIcon size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 mb-4 mt-2 relative z-10">
        <div className="relative">
          <SearchIcon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{
              color: theme.textMuted
            }} />

          <input
            type="text"
            placeholder={t.chatsSearch}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 text-[16px]"
            style={
            {
              backgroundColor: theme.inputBg,
              color: theme.textPrimary,
              '--tw-ring-color': theme.accent
            } as React.CSSProperties
            } />

        </div>
      </div>

      <div className="px-2">
        {filteredConversations.length > 0 ?
        filteredConversations.map((conv, index) =>
        <motion.button
          key={conv.id}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: index * 0.05
          }}
          onClick={() => onChatClick(conv.id)}
          className="w-full p-3 flex items-center gap-4 transition-colors rounded-2xl active:bg-gray-50"
          whileTap={{
            scale: 0.98
          }}>

              <div className="relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm bg-gradient-to-br from-gray-200 to-gray-300">
                  {conv.participantEmoji}
                </div>
                {conv.isOnline &&
            <div
              className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2"
              style={{
                backgroundColor: theme.accent,
                borderColor: theme.bgApp
              }} />

            }
              </div>

              <div
            className="flex-1 min-w-0 text-left border-b pb-3"
            style={{
              borderColor: theme.border
            }}>

                <div className="flex items-center justify-between mb-1">
                  <h3
                className="font-bold text-[16px] truncate"
                style={{
                  color: theme.textPrimary,
                  fontWeight: conv.unreadCount > 0 ? 800 : 700
                }}>

                    {conv.participantName}
                  </h3>
                  <span
                className="text-xs flex-shrink-0 ml-2 font-medium"
                style={{
                  color:
                  conv.unreadCount > 0 ? theme.accent : theme.textMuted
                }}>

                    {conv.lastMessageTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p
                className="text-sm truncate pr-2"
                style={{
                  color:
                  conv.unreadCount > 0 ?
                  theme.textPrimary :
                  theme.textMuted,
                  fontWeight: conv.unreadCount > 0 ? 600 : 400
                }}>

                    {conv.lastMessage}
                  </p>
                  {conv.unreadCount > 0 &&
              <div
                className="min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: theme.accent
                }}>

                      <span className="text-[10px] font-bold text-white">
                        {conv.unreadCount}
                      </span>
                    </div>
              }
                </div>
              </div>
            </motion.button>
        ) :

        <div
          className="py-10 text-center"
          style={{
            color: theme.textMuted
          }}>

            {t.chatsEmpty}
          </div>
        }
      </div>
    </div>);

}