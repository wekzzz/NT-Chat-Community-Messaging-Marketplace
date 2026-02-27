import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  MessageCircleIcon,
  ShoppingBagIcon,
  BriefcaseIcon,
  UsersIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { Community, Message } from './mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { ChatRoom } from './ChatRoom';
import { Marketplace } from './Marketplace';
interface CommunityHubProps {
  community: Community;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (message: Message) => void;
  onContactSeller: (sellerName: string, sellerEmoji: string) => void;
}
type Topic = 'chat' | 'market' | 'services';
export function CommunityHub({
  community,
  messages,
  onBack,
  onSendMessage,
  onContactSeller
}: CommunityHubProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeTopic, setActiveTopic] = useState<Topic>('chat');
  const topics = [
  {
    id: 'chat' as Topic,
    label: t.hubChat,
    icon: MessageCircleIcon
  },
  {
    id: 'market' as Topic,
    label: t.hubMarket,
    icon: ShoppingBagIcon
  },
  {
    id: 'services' as Topic,
    label: t.hubServices,
    icon: BriefcaseIcon
  }];

  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor: theme.bgApp
      }}>

      {/* Header */}
      <header
        className="border-b sticky top-0 z-30"
        style={{
          backgroundColor: theme.headerBg,
          backdropFilter: theme.headerBlur,
          borderColor: theme.border
        }}>

        <div className="px-2 py-2 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full transition-colors"
            style={{
              color: theme.textPrimary
            }}>

            <ArrowLeftIcon size={24} />
          </button>

          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${community.color} flex items-center justify-center text-xl shadow-sm`}>

            {community.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <h1
              className="font-bold text-[16px] truncate"
              style={{
                color: theme.textPrimary
              }}>

              {community.name}
            </h1>
            <div
              className="flex items-center gap-1 text-xs"
              style={{
                color: theme.textMuted
              }}>

              <UsersIcon size={12} />
              <span>
                {community.members.toLocaleString()} {t.chatMembers}
              </span>
            </div>
          </div>
        </div>

        {/* Topic Tabs — simple with animated indicator */}
        <div className="flex px-4 gap-6 overflow-x-auto no-scrollbar">
          {topics.map((topic) => {
            const isActive = activeTopic === topic.id;
            const Icon = topic.icon;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className="pb-3 pt-1 text-sm font-semibold transition-colors relative flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  color: isActive ? theme.accent : theme.textMuted
                }}>

                <Icon size={16} />
                {topic.label}
                {isActive &&
                <motion.div
                  layoutId="hub-topic-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                  style={{
                    backgroundColor: theme.accent
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 35
                  }} />

                }
              </button>);

          })}
        </div>
      </header>

      {/* Content — instant switch, no animation */}
      <div className="flex-1 overflow-hidden relative">
        {activeTopic === 'chat' &&
        <ChatRoom
          community={community}
          messages={messages}
          onSendMessage={onSendMessage} />

        }
        {activeTopic === 'market' &&
        <Marketplace
          communityId={community.id}
          onContactSeller={onContactSeller} />

        }
        {activeTopic === 'services' &&
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <BriefcaseIcon
            size={48}
            style={{
              color: theme.textMuted,
              marginBottom: '16px',
              opacity: 0.5
            }} />

            <h3
            className="text-lg font-bold mb-2"
            style={{
              color: theme.textPrimary
            }}>

              Услуги в разработке
            </h3>
            <p
            className="text-sm"
            style={{
              color: theme.textMuted
            }}>

              Скоро здесь появятся услуги от участников сообщества.
            </p>
          </div>
        }
      </div>
    </div>);

}