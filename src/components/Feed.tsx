import React, { useState, useRef } from 'react';
import { BellIcon, SearchIcon, UsersIcon, RefreshCwIcon } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Community } from './mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
interface FeedProps {
  communities: Community[];
  onCommunityClick: (community: Community) => void;
}
export function Feed({ communities, onCommunityClick }: FeedProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: containerRef
  });
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ['none', '0 1px 3px 0 rgb(0 0 0 / 0.1)']
  );
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };
  const filteredCommunities = communities.filter(
    (c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto pb-24 relative no-scrollbar"
      style={{
        backgroundColor: theme.bgApp
      }}>

      <AnimatePresence>
        {isRefreshing &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 60,
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          className="flex items-center justify-center overflow-hidden">

            <RefreshCwIcon
            className="animate-spin"
            style={{
              color: theme.accent
            }} />

          </motion.div>
        }
      </AnimatePresence>

      <div className="sticky top-0 z-20">
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            backgroundColor: theme.headerBg,
            opacity: headerOpacity,
            boxShadow: headerShadow,
            borderBottom: `1px solid ${theme.border}`
          }} />

        <div className="relative px-4 py-4 flex items-center justify-between">
          <h1
            className="text-2xl font-bold font-syne"
            style={{
              color: theme.textPrimary
            }}>

            {t.feedTitle}
          </h1>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full transition-colors relative"
            style={{
              backgroundColor: theme.bgElevated
            }}>

            <BellIcon
              size={24}
              style={{
                color: theme.textMuted
              }} />

            <span
              className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2"
              style={{
                borderColor: theme.bgSurface
              }} />

          </button>
        </div>
      </div>

      <div className="px-4 mb-4 relative z-10">
        <div className="relative">
          <SearchIcon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{
              color: theme.textMuted
            }} />

          <input
            type="text"
            placeholder={t.feedSearch}
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

      <div className="px-4 py-2">
        <h2
          className="text-sm font-bold uppercase tracking-wider mb-3"
          style={{
            color: theme.textMuted
          }}>

          {t.feedYourCommunities}
        </h2>

        <div className="space-y-2">
          {filteredCommunities.map((community, index) =>
          <motion.button
            key={community.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05
            }}
            onClick={() => onCommunityClick(community)}
            className="w-full rounded-2xl p-4 flex items-center gap-4 shadow-sm border transition-all text-left relative overflow-hidden"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}
            whileTap={{
              scale: 0.98
            }}>

              <div
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${community.color} flex items-center justify-center text-2xl shadow-sm flex-shrink-0 relative`}>

                {community.emoji}
                {community.isLive &&
              <div
                className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2"
                style={{
                  borderColor: theme.bgSurface
                }}>

                    {t.feedLiveNow}
                  </div>
              }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3
                  className="font-bold truncate text-[17px]"
                  style={{
                    color: theme.textPrimary
                  }}>

                    {community.name}
                  </h3>
                  <span
                  className="text-xs flex-shrink-0 ml-2"
                  style={{
                    color: theme.textMuted
                  }}>

                    {community.lastMessageTime}
                  </span>
                </div>
                <p
                className="text-sm truncate"
                style={{
                  color: theme.textMuted
                }}>

                  {community.lastMessage}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                  className="flex items-center gap-1 text-xs"
                  style={{
                    color: theme.textMuted
                  }}>

                    <UsersIcon size={12} />
                    {community.members.toLocaleString()}
                  </span>
                  <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: theme.bgElevated,
                    color: theme.textMuted
                  }}>

                    {community.category}
                  </span>
                </div>
              </div>

              {community.unreadCount > 0 &&
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: theme.accent
              }}>

                  <span className="text-xs font-bold text-white">
                    {community.unreadCount}
                  </span>
                </div>
            }
            </motion.button>
          )}
        </div>
      </div>
    </div>);

}