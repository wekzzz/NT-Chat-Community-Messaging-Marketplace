import React, { useState } from 'react';
import {
  BellIcon,
  TrendingUpIcon,
  UsersIcon,
  ExternalLinkIcon,
  SparklesIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { TranslationOverlay } from './TranslationOverlay';
import { useTheme } from './ThemeContext';
interface HomeFeedProps {
  onNavigateToChat: (id: number) => void;
  onNavigateToProfile: (id: string) => void;
}
export function HomeFeed({
  onNavigateToChat,
  onNavigateToProfile
}: HomeFeedProps) {
  const { theme } = useTheme();
  const [isTranslationOpen, setIsTranslationOpen] = useState(false);
  const trendingCommunities = [
  {
    id: 1,
    name: 'CryptoBuilders',
    members: '4.2k',
    category: 'Finance',
    active: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    name: 'DesignHive',
    members: '2.8k',
    category: 'Creative',
    active: true,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    name: 'NightOwls',
    members: '9.1k',
    category: 'Lifestyle',
    active: true,
    color: 'from-indigo-500 to-violet-500'
  },
  {
    id: 4,
    name: 'TechPulse',
    members: '6.3k',
    category: 'Tech',
    active: false,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 5,
    name: 'ArtBlock',
    members: '1.5k',
    category: 'Art',
    active: true,
    color: 'from-orange-500 to-red-500'
  }];

  const activities = [
  {
    id: 1,
    user: 'Alex K.',
    avatar: 'bg-blue-500',
    community: 'CryptoBuilders',
    message: 'Just launched the new token standard proposal! 🚀',
    time: '2m ago'
  },
  {
    id: 2,
    user: 'Yuki Tanaka',
    avatar: 'bg-red-500',
    community: 'Tokyo Tech',
    message: '新しいAIモデルのベンチマーク結果が出ました。驚くべき性能です！',
    time: '8m ago',
    isForeign: true
  },
  {
    id: 3,
    user: 'Maya R.',
    avatar: 'bg-pink-500',
    community: 'DesignHive',
    message: 'Anyone have feedback on this new layout?',
    time: '15m ago'
  },
  {
    id: 4,
    user: 'Jordan T.',
    avatar: 'bg-green-500',
    community: 'TechPulse',
    message: 'The new API docs are live.',
    time: '1h ago'
  },
  {
    id: 5,
    user: 'Sarah L.',
    avatar: 'bg-yellow-500',
    community: 'Local Market',
    message: 'Selling my vintage road bike. DM for details! 🚲',
    time: '2h ago'
  }];

  return (
    <div className="pb-24 pt-6 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold"
          style={{
            color: theme.textPrimary
          }}>

          NT Chat
        </h1>
        <button
          className="p-2 rounded-full border"
          style={{
            backgroundColor: theme.bgElevated,
            borderColor: theme.border,
            color: theme.textPrimary
          }}>

          <BellIcon size={20} />
        </button>
      </div>

      {/* Trending Communities */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold flex items-center gap-2"
            style={{
              color: theme.textPrimary
            }}>

            <TrendingUpIcon
              size={18}
              style={{
                color: theme.accentSecondary
              }} />

            Trending Communities
          </h2>
          <span
            className="text-sm"
            style={{
              color: theme.textMuted
            }}>

            View all
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
          {trendingCommunities.map((community, index) =>
          <motion.div
            key={community.id}
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.1
            }}
            onClick={() => onNavigateToChat(community.id)}
            className="flex-shrink-0 w-48 p-4 rounded-2xl border flex flex-col gap-3 cursor-pointer hover:scale-[1.02] transition-transform"
            style={{
              backgroundColor: theme.bgElevated,
              borderColor: theme.border
            }}>

              <div
              className={`h-12 w-12 rounded-xl bg-gradient-to-br ${community.color} flex items-center justify-center text-white font-bold text-lg`}>

                {community.name.substring(0, 2)}
              </div>
              <div>
                <h3
                className="font-bold truncate"
                style={{
                  color: theme.textPrimary
                }}>

                  {community.name}
                </h3>
                <div
                className="flex items-center gap-2 text-xs mt-1"
                style={{
                  color: theme.textMuted
                }}>

                  <UsersIcon size={12} />
                  {community.members}
                  {community.active &&
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: theme.accentSecondary
                  }} />

                }
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: theme.bgSurface,
                  color: theme.textMuted
                }}>

                  {community.category}
                </span>
                <button
                className="text-xs font-semibold transition-colors"
                style={{
                  color: theme.accent
                }}>

                  Join
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Pinned Promotion */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.3
        }}
        className="relative p-5 rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: `${theme.accent}80`,
          boxShadow: `0 0 15px -3px ${theme.accent}30`
        }}>

        <div
          className="absolute top-0 right-0 px-3 py-1 text-white text-[10px] font-bold rounded-bl-xl"
          style={{
            backgroundColor: theme.accent
          }}>

          SPONSORED
        </div>
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-full p-[2px]"
            style={{
              background: `linear-gradient(to top right, ${theme.accent}, ${theme.accentSecondary})`
            }}>

            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                backgroundColor: theme.bgSurface
              }}>

              <span
                className="font-bold"
                style={{
                  color: theme.textPrimary
                }}>

                D
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h3
              className="font-bold"
              style={{
                color: theme.textPrimary
              }}>

              DeFi Masterclass
            </h3>
            <p
              className="text-sm mt-1 leading-relaxed"
              style={{
                color: theme.textMuted
              }}>

              Unlock the secrets of decentralized finance with our new
              comprehensive course. Early bird access now open!
            </p>
            <button
              onClick={() => onNavigateToProfile('sponsor')}
              className="mt-3 flex items-center gap-2 text-sm font-semibold"
              style={{
                color: theme.accentSecondary
              }}>

              View Profile <ExternalLinkIcon size={14} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Live Activity */}
      <section>
        <h2
          className="text-lg font-bold mb-4"
          style={{
            color: theme.textPrimary
          }}>

          Live Activity
        </h2>
        <div className="space-y-4">
          {activities.map((activity, index) =>
          <motion.div
            key={activity.id}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.4 + index * 0.1
            }}
            onClick={() => onNavigateToProfile(activity.user)}
            className="flex gap-4 p-4 rounded-2xl border cursor-pointer hover:bg-opacity-80 transition-colors"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}>

              <div
              className={`w-10 h-10 rounded-full ${activity.avatar} flex-shrink-0 flex items-center justify-center text-white font-bold text-sm`}>

                {activity.user.substring(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                    className="font-semibold text-sm"
                    style={{
                      color: theme.textPrimary
                    }}>

                      {activity.user}
                    </span>
                    <span
                    className="text-[10px] px-1.5 py-0.5 rounded truncate max-w-[100px]"
                    style={{
                      backgroundColor: theme.bgElevated,
                      color: theme.textMuted
                    }}>

                      {activity.community}
                    </span>
                  </div>
                  <span
                  className="text-xs"
                  style={{
                    color: theme.textMuted
                  }}>

                    {activity.time}
                  </span>
                </div>

                <p
                className="text-sm truncate"
                style={{
                  color: theme.textMuted
                }}>

                  {activity.message}
                </p>

                {/* Translation Trigger for Foreign Posts */}
                {activity.isForeign &&
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTranslationOpen(true);
                }}
                className="mt-2 flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md transition-colors"
                style={{
                  backgroundColor: `${theme.accent}20`,
                  color: theme.accent
                }}>

                    <SparklesIcon size={10} />
                    AI Translate
                  </button>
              }
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Translation Overlay */}
      <TranslationOverlay
        isOpen={isTranslationOpen}
        onClose={() => setIsTranslationOpen(false)}
        originalText="新しいAIモデルのベンチマーク結果が出ました。驚くべき性能です！"
        translatedText="The benchmark results for the new AI model are out. The performance is astonishing!"
        language="Japanese" />

    </div>);

}