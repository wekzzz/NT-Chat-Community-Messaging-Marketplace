import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
export interface UserProfileData {
  userName: string;
  bio: string;
  mainPhoto: string;
  additionalPhotos: string[];
  posts: {
    id: string;
    emoji: string;
    caption: string;
  }[];
  marketplaceItems: {
    id: string;
    title: string;
    price: string;
    emoji: string;
  }[];
}
interface RegistrationProps {
  onComplete: (profile: UserProfileData) => void;
}
const AVATARS = [
'👨',
'👩',
'👨‍💻',
'👩‍💻',
'👨‍🍳',
'👩‍🍳',
'👨‍🔧',
'👩‍🔧',
'👨‍⚕️',
'👩‍⚕️',
'🧑‍🌾',
'👮',
'🕵️',
'💂',
'👷',
'🤴',
'👸',
'🦸',
'🦹',
'🧙',
'🧚',
'🧛',
'🧜',
'🧝',
'🧞',
'🧟',
'💆',
'💇',
'🚶',
'🏃'];

export function Registration({ onComplete }: RegistrationProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2>(1);
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [mainPhoto, setMainPhoto] = useState('👤');
  const handleNext = () => {
    if (userName.trim()) {
      setStep(2);
    }
  };
  const handleComplete = () => {
    const profileData: UserProfileData = {
      userName: userName.trim(),
      bio: bio.trim(),
      mainPhoto,
      additionalPhotos: [],
      posts: [],
      marketplaceItems: []
    };
    localStorage.setItem('nt_chat_profile', JSON.stringify(profileData));
    onComplete(profileData);
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: theme.bgApp
      }}>

      <AnimatePresence mode="wait">
        {step === 1 ?
        <motion.div
          key="step1"
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: 20
          }}
          className="w-full max-w-sm">

            <div className="text-center mb-10">
              <h1
              className="text-3xl font-bold font-syne mb-2"
              style={{
                color: theme.textPrimary
              }}>

                {t.regTitle}
              </h1>
              <p
              style={{
                color: theme.textMuted
              }}>

                {t.regBioPlaceholder}
              </p>
            </div>

            <div
            className="rounded-3xl p-6 shadow-sm border"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}>

              <div className="mb-5">
                <label
                className="block text-sm font-semibold mb-2"
                style={{
                  color: theme.textPrimary
                }}>

                  {t.regUsername}
                </label>
                <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Иван Иванов"
                className="w-full px-4 py-4 text-lg font-medium rounded-2xl focus:outline-none focus:ring-2"
                style={
                {
                  backgroundColor: theme.inputBg,
                  color: theme.textPrimary,
                  '--tw-ring-color': theme.accent
                } as React.CSSProperties
                } />

              </div>

              <div className="mb-6">
                <label
                className="block text-sm font-semibold mb-2"
                style={{
                  color: theme.textPrimary
                }}>

                  {t.regBio}
                </label>
                <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 150))}
                placeholder={t.regBioPlaceholder}
                rows={3}
                className="w-full px-4 py-4 text-base font-medium rounded-2xl focus:outline-none focus:ring-2 resize-none"
                style={
                {
                  backgroundColor: theme.inputBg,
                  color: theme.textPrimary,
                  '--tw-ring-color': theme.accent
                } as React.CSSProperties
                } />

                <div
                className="text-right text-xs mt-1"
                style={{
                  color: theme.textMuted
                }}>

                  {bio.length}/150
                </div>
              </div>

              <button
              onClick={handleNext}
              disabled={!userName.trim()}
              className="w-full py-4 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-50"
              style={{
                backgroundColor: theme.accent
              }}>

                {t.regNext}
                <ArrowRightIcon size={20} />
              </button>
            </div>
          </motion.div> :

        <motion.div
          key="step2"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          className="w-full max-w-sm">

            <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 mb-8 font-medium"
            style={{
              color: theme.textMuted
            }}>

              <ArrowLeftIcon size={20} />
              {t.chatBack}
            </button>

            <div className="text-center mb-8">
              <h2
              className="text-2xl font-bold font-syne mb-2"
              style={{
                color: theme.textPrimary
              }}>

                {t.regChooseAvatar}
              </h2>
            </div>

            <div
            className="rounded-3xl p-6 shadow-sm border text-center"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.border
            }}>

              <div
              className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner border-4"
              style={{
                borderColor: theme.bgElevated
              }}>

                {mainPhoto}
              </div>

              <div className="grid grid-cols-5 gap-3 mb-8 h-48 overflow-y-auto no-scrollbar p-2">
                {AVATARS.map((emoji) =>
              <button
                key={emoji}
                onClick={() => setMainPhoto(emoji)}
                className={`text-2xl p-2 rounded-xl transition-all ${mainPhoto === emoji ? 'scale-110 shadow-md ring-2' : 'hover:scale-105'}`}
                style={
                {
                  backgroundColor:
                  mainPhoto === emoji ?
                  theme.bgElevated :
                  'transparent',
                  '--tw-ring-color': theme.accent
                } as React.CSSProperties
                }>

                    {emoji}
                  </button>
              )}
              </div>

              <button
              onClick={handleComplete}
              className="w-full py-4 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md"
              style={{
                backgroundColor: theme.accent
              }}>

                <CheckCircleIcon size={20} />
                {t.regComplete}
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}