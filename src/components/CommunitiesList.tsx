import React, { useState } from 'react';
import {
  SearchIcon,
  UsersIcon,
  CheckIcon,
  GlobeIcon,
  TrendingUpIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
interface Community {
  id: number;
  name: string;
  category: string;
  members: string;
  online: number;
  joined: boolean;
  image: string;
}
interface CommunitiesListProps {
  onNavigateToChat: (id: number) => void;
}
const CATEGORIES = [
{
  id: 'cars',
  label: 'Car Clubs',
  icon: '🏎️'
},
{
  id: 'real-estate',
  label: 'Real Estate',
  icon: '🏠'
},
{
  id: 'sport',
  label: 'Sport',
  icon: '⚽'
},
{
  id: 'finance',
  label: 'Finance',
  icon: '💰'
},
{
  id: 'fashion',
  label: 'Fashion',
  icon: '👟'
},
{
  id: 'tech',
  label: 'Tech',
  icon: '💻'
},
{
  id: 'travel',
  label: 'Travel',
  icon: '🌍'
},
{
  id: 'wellness',
  label: 'Wellness',
  icon: '🧘'
}];

const COMMUNITIES: Community[] = [
{
  id: 1,
  name: 'BMW Club Official',
  category: 'Car Clubs',
  members: '12.4k',
  online: 842,
  joined: true,
  image: 'from-blue-600 to-sky-500'
},
{
  id: 2,
  name: 'Real Estate Moguls',
  category: 'Real Estate',
  members: '8.2k',
  online: 315,
  joined: false,
  image: 'from-emerald-600 to-teal-500'
},
{
  id: 3,
  name: 'Sunday League',
  category: 'Sport',
  members: '3.1k',
  online: 120,
  joined: false,
  image: 'from-orange-500 to-amber-500'
},
{
  id: 4,
  name: 'DeFi Traders',
  category: 'Finance',
  members: '15.6k',
  online: 2103,
  joined: true,
  image: 'from-violet-600 to-indigo-500'
},
{
  id: 5,
  name: 'Streetwear Heads',
  category: 'Fashion',
  members: '5.4k',
  online: 430,
  joined: false,
  image: 'from-pink-600 to-rose-500'
},
{
  id: 6,
  name: 'React Developers',
  category: 'Tech',
  members: '22.1k',
  online: 1540,
  joined: false,
  image: 'from-cyan-600 to-blue-500'
},
{
  id: 7,
  name: 'Nomad Life',
  category: 'Travel',
  members: '9.8k',
  online: 670,
  joined: false,
  image: 'from-yellow-500 to-orange-500'
},
{
  id: 8,
  name: 'Zen Masters',
  category: 'Wellness',
  members: '4.2k',
  online: 210,
  joined: true,
  image: 'from-green-500 to-emerald-400'
}];

const FILTERS = ['All', 'Joined', 'Trending', 'New'];
export function CommunitiesList({ onNavigateToChat }: CommunitiesListProps) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('cars');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCommunities = COMMUNITIES.filter((c) => {
    const matchesSearch = c.name.
    toLowerCase().
    includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  return (
    <div
      className="min-h-full pb-24 pt-6 px-4"
      style={{
        backgroundColor: theme.bgApp,
        color: theme.textPrimary
      }}>

      {/* --- Header --- */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold font-syne mb-1"
          style={{
            color: theme.textPrimary
          }}>

          Discover
        </h1>
        <p
          className="text-sm"
          style={{
            color: theme.textMuted
          }}>

          Find your community
        </p>
      </div>

      {/* --- Search Bar --- */}
      <div className="relative mb-8 group">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
          size={18}
          style={{
            color: theme.textMuted
          }} />

        <input
          type="text"
          placeholder="Search communities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl py-3 pl-10 pr-4 focus:outline-none transition-all shadow-sm"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border,
            borderWidth: '1px',
            color: theme.textPrimary
          }} />

      </div>

      {/* --- Trending Categories --- */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUpIcon
            size={14}
            style={{
              color: theme.accentSecondary
            }} />

          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{
              color: theme.textMuted
            }}>

            Trending Categories
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
          {CATEGORIES.map((cat) =>
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all duration-200 border`}
            style={{
              backgroundColor:
              activeCategory === cat.id ?
              `${theme.accentSecondary}20` :
              theme.bgSurface,
              borderColor:
              activeCategory === cat.id ?
              `${theme.accentSecondary}50` :
              theme.border,
              color:
              activeCategory === cat.id ?
              theme.accentSecondary :
              theme.textMuted
            }}>

              <span>{cat.icon}</span>
              {cat.label}
            </button>
          )}
        </div>
      </div>

      {/* --- Filter Tabs --- */}
      <div
        className="flex gap-6 border-b mb-6 overflow-x-auto no-scrollbar"
        style={{
          borderColor: theme.border
        }}>

        {FILTERS.map((filter) =>
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap`}
          style={{
            color:
            activeFilter === filter ? theme.textPrimary : theme.textMuted
          }}>

            {filter}
            {activeFilter === filter &&
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
            style={{
              backgroundColor: theme.accentSecondary
            }} />

          }
          </button>
        )}
      </div>

      {/* --- Community List --- */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredCommunities.map((community, index) =>
          <motion.div
            key={community.id}
            layout
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
            transition={{
              delay: index * 0.05
            }}
            onClick={() => onNavigateToChat(community.id)}
            className="group border rounded-2xl p-4 flex items-center gap-4 transition-colors shadow-sm cursor-pointer hover:bg-opacity-80"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}>

              {/* Avatar / Gradient */}
              <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${community.image} flex items-center justify-center text-white font-bold text-lg shadow-inner flex-shrink-0`}>

                {community.name.substring(0, 2)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3
                  className="font-bold truncate"
                  style={{
                    color: theme.textPrimary
                  }}>

                    {community.name}
                  </h3>
                  {community.joined &&
                <CheckIcon
                  size={12}
                  style={{
                    color: theme.accentSecondary
                  }} />

                }
                </div>

                <div
                className="flex items-center gap-3 text-xs"
                style={{
                  color: theme.textMuted
                }}>

                  <span className="flex items-center gap-1">
                    <UsersIcon size={12} /> {community.members}
                  </span>
                  <span
                  className="flex items-center gap-1"
                  style={{
                    color: theme.accentSecondary
                  }}>

                    <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      backgroundColor: theme.accentSecondary
                    }} />

                    {community.online} online
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0`}
              style={{
                backgroundColor: community.joined ?
                theme.bgElevated :
                theme.accentSecondary,
                color: community.joined ? theme.textMuted : '#fff'
              }}>

                {community.joined ? 'Joined' : 'Join'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>);

}