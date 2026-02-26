import React, { useState, useRef } from 'react';
import {
  BellIcon,
  RefreshCwIcon,
  ShoppingCartIcon,
  MessageCircleIcon,
  ZapIcon,
  FlameIcon,
  PlusIcon,
  LockIcon } from
'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { EVENTS } from './mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { usePlan } from './PlanContext';
import { UserProfileData } from './Registration';
interface EventsFeedProps {
  profile: UserProfileData | null;
  onUpgradePlan: () => void;
}
export function EventsFeed({ profile, onUpgradePlan }: EventsFeedProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { plan, canAddPost, canAddMarketItem } = usePlan();
  const [isRefreshing, setIsRefreshing] = useState(false);
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
  const getIconForType = (type: string) => {
    switch (type) {
      case 'market':
        return <ShoppingCartIcon size={16} className="text-white" />;
      case 'activity':
        return <MessageCircleIcon size={16} className="text-white" />;
      case 'system':
        return <ZapIcon size={16} className="text-white" />;
      case 'trending':
        return <FlameIcon size={16} className="text-white" />;
      default:
        return <BellIcon size={16} className="text-white" />;
    }
  };
  const getPlanBadge = () => {
    if (plan === 'pro')
    return {
      label: 'PRO',
      bg: '#FEF9C3',
      text: '#EAB308'
    };
    if (plan === 'standard')
    return {
      label: 'STANDARD',
      bg: `${theme.accent}20`,
      text: theme.accent
    };
    return {
      label: 'FREE',
      bg: theme.bgElevated,
      text: theme.textMuted
    };
  };
  const badge = getPlanBadge();
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
            backdropFilter: theme.headerBlur,
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

            {t.eventsTitle}
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

      {/* Dashboard Section */}
      {profile &&
      <div className="px-4 py-4 mb-2">
          <div className="flex items-center justify-between mb-4">
            <h2
            className="text-xl font-bold"
            style={{
              color: theme.textPrimary
            }}>

              {t.dashWelcome}, {profile.userName}! 👋
            </h2>
            <div
            className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: badge.bg,
              color: badge.text
            }}>

              {badge.label}
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-5 pb-1">
            <div
            className="min-w-[120px] p-3 rounded-2xl border flex-shrink-0"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}>

              <div className="text-2xl mb-1">📊</div>
              <div
              className="font-bold text-lg leading-tight"
              style={{
                color: theme.textPrimary
              }}>

                5
              </div>
              <div
              className="text-xs"
              style={{
                color: theme.textMuted
              }}>

                {t.dashCommunities}
              </div>
            </div>
            <div
            className="min-w-[120px] p-3 rounded-2xl border flex-shrink-0"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}>

              <div className="text-2xl mb-1">💬</div>
              <div
              className="font-bold text-lg leading-tight"
              style={{
                color: theme.textPrimary
              }}>

                24
              </div>
              <div
              className="text-xs"
              style={{
                color: theme.textMuted
              }}>

                {t.dashMessages}
              </div>
            </div>
            <div
            className="min-w-[120px] p-3 rounded-2xl border flex-shrink-0"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}>

              <div className="text-2xl mb-1">🛒</div>
              <div
              className="font-bold text-lg leading-tight"
              style={{
                color: theme.textPrimary
              }}>

                {profile.marketplaceItems.length}
              </div>
              <div
              className="text-xs"
              style={{
                color: theme.textMuted
              }}>

                {t.dashListings}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
            onClick={() =>
            !canAddPost(profile.posts.length) && onUpgradePlan()
            }
            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 border"
            style={{
              backgroundColor: canAddPost(profile.posts.length) ?
              theme.accent :
              theme.bgElevated,
              color: canAddPost(profile.posts.length) ?
              '#fff' :
              theme.textMuted,
              borderColor: canAddPost(profile.posts.length) ?
              theme.accent :
              theme.border
            }}>

              {canAddPost(profile.posts.length) ?
            <PlusIcon size={18} /> :

            <LockIcon size={18} />
            }
              {t.dashCreatePost}
            </button>
            <button
            onClick={() =>
            !canAddMarketItem(profile.marketplaceItems.length) &&
            onUpgradePlan()
            }
            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 border"
            style={{
              backgroundColor: canAddMarketItem(
                profile.marketplaceItems.length
              ) ?
              theme.accent :
              theme.bgElevated,
              color: canAddMarketItem(profile.marketplaceItems.length) ?
              '#fff' :
              theme.textMuted,
              borderColor: canAddMarketItem(profile.marketplaceItems.length) ?
              theme.accent :
              theme.border
            }}>

              {canAddMarketItem(profile.marketplaceItems.length) ?
            <PlusIcon size={18} /> :

            <LockIcon size={18} />
            }
              {t.dashAddItem}
            </button>
          </div>
        </div>
      }

      <div className="px-4 py-2 space-y-3">
        {EVENTS.map((event, index) =>
        <motion.div
          key={event.id}
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
          className="w-full rounded-2xl p-4 shadow-sm border transition-all relative overflow-hidden"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

            <div className="flex gap-4">
              <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>

                {getIconForType(event.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3
                  className="font-bold text-sm truncate"
                  style={{
                    color: theme.textPrimary
                  }}>

                    {event.title}
                  </h3>
                  <span
                  className="text-xs flex-shrink-0 ml-2"
                  style={{
                    color: theme.textMuted
                  }}>

                    {event.time}
                  </span>
                </div>
                <p
                className="text-sm mb-2"
                style={{
                  color: theme.textPrimary
                }}>

                  {event.description}
                </p>
                {event.communityName &&
              <div
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: theme.bgElevated,
                  color: theme.textMuted
                }}>

                    <span>{event.emoji}</span>
                    <span className="truncate max-w-[150px]">
                      {event.communityName}
                    </span>
                  </div>
              }
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>);

}