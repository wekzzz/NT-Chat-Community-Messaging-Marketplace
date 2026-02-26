import React from 'react';
import {
  ActivityIcon,
  MessageSquareIcon,
  UsersIcon,
  UserIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
export type Tab = 'events' | 'chats' | 'communities' | 'profile';
interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}
export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const tabs = [
  {
    id: 'events' as Tab,
    icon: ActivityIcon,
    label: t.navEvents
  },
  {
    id: 'chats' as Tab,
    icon: MessageSquareIcon,
    label: t.navChats
  },
  {
    id: 'communities' as Tab,
    icon: UsersIcon,
    label: t.navCommunities
  },
  {
    id: 'profile' as Tab,
    icon: UserIcon,
    label: t.navProfile
  }];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-md"
      style={{
        backgroundColor: theme.navBg,
        borderTopColor: theme.navBorder,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}>

      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileTap={{
                scale: 0.85
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17
              }}
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(10);
                setActiveTab(tab.id);
              }}
              className="relative flex flex-col items-center justify-center flex-1 h-full">

              {isActive &&
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-[1px] w-12 h-1 rounded-full"
                style={{
                  backgroundColor: theme.accent
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }} />

              }

              <div
                className={`p-1.5 rounded-xl transition-colors`}
                style={{
                  color: isActive ? theme.accent : theme.textMuted
                }}>

                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={`text-[10px] font-semibold mt-0.5`}
                style={{
                  color: isActive ? theme.accent : theme.textMuted
                }}>

                {tab.label}
              </span>
            </motion.button>);

        })}
      </div>
    </div>);

}