import React, { useState } from 'react';
import {
  LogOutIcon,
  BellIcon,
  GlobeIcon,
  ShieldIcon,
  ChevronRightIcon,
  MoonIcon,
  StarIcon,
  LockIcon,
  PlusIcon,
  Image as ImageIcon,
  ShoppingBagIcon,
  GridIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, ThemeName } from './ThemeContext';
import { useLanguage, Language } from './LanguageContext';
import { usePlan } from './PlanContext';
import { UserProfileData } from './Registration';
interface ProfileProps {
  profile: UserProfileData;
  onLogout: () => void;
  onUpgradePlan: () => void;
}
export function Profile({ profile, onLogout, onUpgradePlan }: ProfileProps) {
  const { theme, themeName, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const { plan, limits, canAddPhoto, canAddPost, canAddMarketItem } = usePlan();
  const [activeTab, setActiveTab] = useState<'photos' | 'posts' | 'market'>(
    'photos'
  );
  const settingsItems = [
  {
    icon: BellIcon,
    label: t.profileNotifications,
    value: 'On',
    color: 'text-blue-500',
    bg: 'bg-blue-100'
  },
  {
    icon: ShieldIcon,
    label: t.profilePrivacy,
    value: '',
    color: 'text-purple-500',
    bg: 'bg-purple-100'
  }];

  const languages: {
    code: Language;
    label: string;
    flag: string;
  }[] = [
  {
    code: 'ru',
    label: 'Русский',
    flag: '🇷🇺'
  },
  {
    code: 'kz',
    label: 'Қазақша',
    flag: '🇰🇿'
  },
  {
    code: 'en',
    label: 'English',
    flag: '🇬🇧'
  }];

  const themes: {
    code: ThemeName;
    label: string;
    color: string;
  }[] = [
  {
    code: 'classic',
    label: 'Classic',
    color: '#F0F2F5'
  },
  {
    code: 'soft-dim',
    label: 'Dim',
    color: '#1F2937'
  },
  {
    code: 'deep-blue',
    label: 'Blue',
    color: '#0F172A'
  }];

  const getPlanBadge = () => {
    if (plan === 'pro')
    return {
      label: 'PRO',
      bg: '#FEF9C3',
      text: '#EAB308',
      border: '#EAB308'
    };
    if (plan === 'standard')
    return {
      label: 'STANDARD',
      bg: `${theme.accent}20`,
      text: theme.accent,
      border: theme.accent
    };
    return {
      label: 'FREE',
      bg: theme.bgElevated,
      text: theme.textMuted,
      border: theme.border
    };
  };
  const badge = getPlanBadge();
  // Mock data arrays for UI rendering based on profile data
  const photos = [profile.mainPhoto, ...profile.additionalPhotos];
  const renderLockedSlot = (type: 'standard' | 'pro', text: string) =>
  <div
    className="aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center relative overflow-hidden border-2 border-dashed"
    style={{
      borderColor: theme.border,
      backgroundColor: theme.bgElevated
    }}>

      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10 z-10" />
      <LockIcon
      size={24}
      style={{
        color: theme.textMuted
      }}
      className="mb-2 z-20" />

      <span
      className="text-[10px] font-bold z-20"
      style={{
        color: theme.textMuted
      }}>

        {text}
      </span>
    </div>;

  const renderAddButton = (onClick: () => void, label: string) =>
  <button
    onClick={onClick}
    className="aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center border-2 border-dashed transition-colors active:bg-gray-50"
    style={{
      borderColor: theme.accent,
      backgroundColor: `${theme.accent}05`
    }}>

      <PlusIcon
      size={28}
      style={{
        color: theme.accent
      }}
      className="mb-2" />

      <span
      className="text-[10px] font-bold"
      style={{
        color: theme.accent
      }}>

        {label}
      </span>
    </button>;

  return (
    <div
      className="min-h-full pb-24"
      style={{
        backgroundColor: theme.bgApp
      }}>

      {/* Header */}
      <header
        className="px-4 py-4 border-b sticky top-0 z-20"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border
        }}>

        <h1
          className="text-2xl font-bold font-syne"
          style={{
            color: theme.textPrimary
          }}>

          {t.profileTitle}
        </h1>
      </header>

      {/* Profile Card */}
      <div className="px-4 py-6">
        <div
          className="rounded-3xl p-6 shadow-sm border relative overflow-hidden"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-md text-4xl bg-gradient-to-br from-gray-100 to-gray-200 border-2"
              style={{
                borderColor: theme.bgElevated
              }}>

              {profile.mainPhoto}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2
                  className="text-xl font-bold truncate"
                  style={{
                    color: theme.textPrimary
                  }}>

                  {profile.userName}
                </h2>
              </div>
              <div
                className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                style={{
                  backgroundColor: badge.bg,
                  color: badge.text,
                  borderColor: badge.border
                }}>

                {badge.label}
              </div>
            </div>
          </div>

          {profile.bio &&
          <p
            className="text-sm mb-6"
            style={{
              color: theme.textPrimary
            }}>

              {profile.bio}
            </p>
          }

          <div
            className="grid grid-cols-3 gap-4 py-4 border-t"
            style={{
              borderColor: theme.border
            }}>

            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{
                  color: theme.textPrimary
                }}>

                5
              </p>
              <p
                className="text-xs"
                style={{
                  color: theme.textMuted
                }}>

                {t.profileCommunities}
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{
                  color: theme.textPrimary
                }}>

                24
              </p>
              <p
                className="text-xs"
                style={{
                  color: theme.textMuted
                }}>

                {t.profileMessages}
              </p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{
                  color: theme.textPrimary
                }}>

                3
              </p>
              <p
                className="text-xs"
                style={{
                  color: theme.textMuted
                }}>

                {t.profileDays}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Banner */}
      {plan !== 'pro' &&
      <div className="px-4 mb-6">
          <div
          className="rounded-2xl p-5 border relative overflow-hidden"
          style={{
            backgroundColor:
            plan === 'free' ? `${theme.accent}10` : '#FEF9C3',
            borderColor: plan === 'free' ? theme.accent : '#EAB308'
          }}>

            <div className="flex items-center gap-3 mb-3">
              <div
              className="p-2 rounded-xl"
              style={{
                backgroundColor: plan === 'free' ? theme.accent : '#EAB308',
                color: '#fff'
              }}>

                <StarIcon size={20} />
              </div>
              <div>
                <h3
                className="font-bold"
                style={{
                  color: theme.textPrimary
                }}>

                  {plan === 'free' ? t.planStandard : t.planPro}
                </h3>
                <p
                className="text-xs"
                style={{
                  color: theme.textMuted
                }}>

                  {t.planUpgradeSubtitle}
                </p>
              </div>
            </div>
            <button
            onClick={onUpgradePlan}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-white shadow-sm transition-transform active:scale-95"
            style={{
              backgroundColor: plan === 'free' ? theme.accent : '#EAB308'
            }}>

              {t.profileUpgradePlan}
            </button>
          </div>
        </div>
      }

      {/* Content Tabs */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {[
          {
            id: 'photos',
            icon: ImageIcon,
            label: t.profilePhotos
          },
          {
            id: 'posts',
            icon: GridIcon,
            label: t.profilePosts
          },
          {
            id: 'market',
            icon: ShoppingBagIcon,
            label: t.profileMarketplace
          }].
          map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors border whitespace-nowrap"
            style={{
              backgroundColor:
              activeTab === tab.id ? theme.accent : theme.bgSurface,
              color: activeTab === tab.id ? '#fff' : theme.textMuted,
              borderColor: activeTab === tab.id ? theme.accent : theme.border
            }}>

              <tab.icon size={16} />
              {tab.label}
            </button>
          )}
        </div>

        <div
          className="bg-white rounded-3xl p-4 shadow-sm border min-h-[200px]"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          {activeTab === 'photos' &&
          <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, i) =>
            <div
              key={i}
              className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl shadow-inner">

                  {photo}
                </div>
            )}
              {canAddPhoto(photos.length) ?
            renderAddButton(() => {}, t.profileAddPhoto) :
            plan === 'free' ?
            <>
                  {renderLockedSlot('standard', t.profileLockedStandard)}
                  {renderLockedSlot('standard', t.profileLockedStandard)}
                </> :
            plan === 'standard' ?
            <>{renderLockedSlot('pro', t.profileLockedPro)}</> :
            null}
            </div>
          }

          {activeTab === 'posts' &&
          <div className="grid grid-cols-2 gap-3">
              {profile.posts.map((post) =>
            <div
              key={post.id}
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: theme.border
              }}>

                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-4xl">
                    {post.emoji}
                  </div>
                  <div
                className="p-2 text-xs truncate"
                style={{
                  color: theme.textPrimary
                }}>

                    {post.caption}
                  </div>
                </div>
            )}
              {canAddPost(profile.posts.length) ?
            renderAddButton(() => {}, t.profileAddPost) :
            plan === 'free' ?
            <>
                  {renderLockedSlot('standard', t.profileLockedStandard)}
                  {renderLockedSlot('standard', t.profileLockedStandard)}
                </> :
            plan === 'standard' ?
            renderLockedSlot('pro', t.profileLockedPro) :
            null}
            </div>
          }

          {activeTab === 'market' &&
          <div className="grid grid-cols-2 gap-3">
              {profile.marketplaceItems.map((item) =>
            <div
              key={item.id}
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: theme.border
              }}>

                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-4xl">
                    {item.emoji}
                  </div>
                  <div className="p-2">
                    <div
                  className="text-xs font-bold truncate mb-1"
                  style={{
                    color: theme.textPrimary
                  }}>

                      {item.title}
                    </div>
                    <div
                  className="text-xs font-bold"
                  style={{
                    color: theme.accent
                  }}>

                      {item.price}
                    </div>
                  </div>
                </div>
            )}
              {canAddMarketItem(profile.marketplaceItems.length) ?
            renderAddButton(() => {}, t.profileAddItem) :
            plan === 'free' ?
            <>
                  {renderLockedSlot('standard', t.profileLockedStandard)}
                  {renderLockedSlot('standard', t.profileLockedStandard)}
                </> :
            plan === 'standard' ?
            renderLockedSlot('pro', t.profileLockedPro) :
            null}
            </div>
          }
        </div>
      </div>

      {/* Language & Theme Pickers */}
      <div className="px-4 mb-6 space-y-4">
        <div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-green-100 text-green-600">
              <GlobeIcon size={20} />
            </div>
            <span
              className="font-semibold"
              style={{
                color: theme.textPrimary
              }}>

              {t.profileLanguage}
            </span>
          </div>
          <div className="flex bg-gray-100 rounded-xl p-1">
            {languages.map((l) =>
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${language === l.code ? 'bg-white shadow-sm text-green-600' : 'text-gray-500'}`}>

                <span className="mr-1">{l.flag}</span> {l.code.toUpperCase()}
              </button>
            )}
          </div>
        </div>

        <div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
              <MoonIcon size={20} />
            </div>
            <span
              className="font-semibold"
              style={{
                color: theme.textPrimary
              }}>

              {t.profileTheme}
            </span>
          </div>
          <div className="flex gap-3">
            {themes.map((themeOption) =>
            <button
              key={themeOption.code}
              onClick={() => setTheme(themeOption.code)}
              className={`flex-1 py-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${themeName === themeOption.code ? 'border-green-500 bg-green-50' : 'border-transparent bg-gray-100'}`}>

                <div
                className="w-6 h-6 rounded-full border shadow-sm"
                style={{
                  backgroundColor: themeOption.color
                }} />

                <span className="text-xs font-medium text-gray-600">
                  {themeOption.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="px-4">
        <div
          className="rounded-2xl overflow-hidden shadow-sm border"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          {settingsItems.map((item, index) =>
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-4 py-4 hover:opacity-80 transition-colors ${index < settingsItems.length - 1 ? 'border-b' : ''}`}
            style={{
              borderColor: theme.border
            }}>

              <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={20} />
              </div>
              <div className="flex-1 text-left">
                <p
                className="font-semibold"
                style={{
                  color: theme.textPrimary
                }}>

                  {item.label}
                </p>
              </div>
              {item.value &&
            <span
              className="text-sm"
              style={{
                color: theme.textMuted
              }}>

                  {item.value}
                </span>
            }
              <ChevronRightIcon
              size={20}
              style={{
                color: theme.textMuted
              }} />

            </button>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors">

          <LogOutIcon size={20} />
          {t.profileLogout}
        </button>
      </div>
    </div>);

}