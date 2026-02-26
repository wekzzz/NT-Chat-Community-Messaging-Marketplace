import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  PlusIcon,
  SendIcon,
  SmileIcon,
  ScrollTextIcon,
  ExternalLinkIcon,
  SparklesIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
interface ChatViewProps {
  communityId?: number;
  onBack: () => void;
}
const MESSAGES = [
{
  id: 1,
  sender: 'Alex K.',
  text: 'Has anyone checked the new proposal?',
  time: '10:42 AM',
  isMe: false,
  avatar: 'bg-blue-500'
},
{
  id: 2,
  sender: 'Maya R.',
  text: 'Yes! I think the fee structure needs some work though.',
  time: '10:44 AM',
  isMe: false,
  avatar: 'bg-pink-500'
},
{
  id: 3,
  sender: 'You',
  text: 'I agree with Maya. The 12% commission seems a bit high for new creators.',
  time: '10:45 AM',
  isMe: true,
  avatar: 'bg-violet-500'
},
{
  id: 4,
  sender: 'Jordan T.',
  text: 'But consider the community fund distribution. It balances out.',
  time: '10:46 AM',
  isMe: false,
  avatar: 'bg-green-500'
},
{
  id: 5,
  sender: 'You',
  text: 'Good point. Maybe we can propose a tiered structure?',
  time: '10:48 AM',
  isMe: true,
  avatar: 'bg-violet-500'
},
{
  id: 6,
  sender: 'Dmitri V.',
  text: 'Это отличная идея! Давайте обсудим детали.',
  time: '10:52 AM',
  isMe: false,
  avatar: 'bg-red-500',
  isForeign: true,
  translated: 'That is a great idea! Let us discuss the details.'
}];

const ADS = [
{
  id: 1,
  seller: '@nova_creates',
  product: 'Neon Hoodie',
  price: '$89',
  gradient: 'from-violet-600 to-indigo-800'
},
{
  id: 2,
  seller: '@cryptoking',
  product: 'BTC Art Print',
  price: '$45',
  gradient: 'from-orange-500 to-amber-600'
},
{
  id: 3,
  seller: '@designhive',
  product: 'UI Kit Pro',
  price: '$29',
  gradient: 'from-cyan-500 to-blue-700'
},
{
  id: 4,
  seller: '@nightowl',
  product: 'Glow Watch',
  price: '$210',
  gradient: 'from-green-500 to-teal-700'
},
{
  id: 5,
  seller: '@artblock',
  product: 'Digital Zine',
  price: '$12',
  gradient: 'from-fuchsia-600 to-purple-800'
}];

export function ChatView({ communityId, onBack }: ChatViewProps) {
  const { theme } = useTheme();
  const [translatedMessages, setTranslatedMessages] = useState<Set<number>>(
    new Set()
  );
  const toggleTranslation = (id: number) => {
    const newSet = new Set(translatedMessages);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setTranslatedMessages(newSet);
  };
  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor: theme.bgApp
      }}>

      {/* --- Top Nav Header --- */}
      <header
        className="flex items-center justify-between px-4 py-3 border-b sticky top-0 z-20"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border
        }}>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="transition-colors"
            style={{
              color: theme.textMuted
            }}>

            <ArrowLeftIcon size={24} />
          </button>
          <div>
            <h2
              className="font-bold font-syne leading-tight"
              style={{
                color: theme.textPrimary
              }}>

              CryptoBuilders
            </h2>
            <p
              className="text-xs"
              style={{
                color: theme.textMuted
              }}>

              4,238 members
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-colors"
            style={{
              borderColor: theme.border,
              color: theme.textPrimary
            }}>

            <ScrollTextIcon size={12} />
            Rules
          </button>
          <div
            className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            style={{
              backgroundColor: `${theme.accentSecondary}15`,
              color: theme.accentSecondary
            }}>

            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: theme.accentSecondary
              }} />

            342 online
          </div>
        </div>
      </header>

      {/* --- Community Marketplace Widget --- */}
      <div
        className="border-b py-3"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border
        }}>

        <div className="px-4 flex items-center justify-between mb-2">
          <h3
            className="text-xs font-bold uppercase tracking-wider font-syne"
            style={{
              color: theme.textPrimary
            }}>

            Community Marketplace
          </h3>
          <button
            className="text-xs flex items-center gap-1 font-medium"
            style={{
              color: theme.accent
            }}>

            View All <ExternalLinkIcon size={10} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
          {ADS.map((ad, index) =>
          <motion.div
            key={ad.id}
            initial={{
              opacity: 0,
              x: -10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: index * 0.06
            }}
            className="w-28 flex-shrink-0 rounded-xl overflow-hidden border group cursor-pointer transition-colors"
            style={{
              backgroundColor: theme.bgElevated,
              borderColor: theme.border
            }}>

              <div className={`h-16 w-full bg-gradient-to-br ${ad.gradient}`} />
              <div className="p-2">
                <p
                className="text-[9px] truncate mb-0.5"
                style={{
                  color: theme.textMuted
                }}>

                  {ad.seller}
                </p>
                <h4
                className="text-xs font-bold truncate leading-tight mb-1.5"
                style={{
                  color: theme.textPrimary
                }}>

                  {ad.product}
                </h4>
                <div className="flex items-center justify-between">
                  <span
                  className="text-[10px] font-bold"
                  style={{
                    color: theme.accentSecondary
                  }}>

                    {ad.price}
                  </span>
                  <span
                  className="text-[9px] font-medium group-hover:underline"
                  style={{
                    color: theme.accent
                  }}>

                    View
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* --- Community Fund Bar --- */}
      <div
        className="px-4 py-2 flex items-center justify-between border-b sticky top-[138px] z-10"
        style={{
          backgroundColor: theme.bgElevated,
          borderColor: theme.border
        }}>

        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              backgroundColor: theme.accentSecondary,
              boxShadow: `0 0 8px ${theme.accentSecondary}`
            }} />

          <span
            className="text-xs font-medium"
            style={{
              color: theme.textPrimary
            }}>

            Community Fund:{' '}
            <span
              className="font-bold"
              style={{
                color: theme.accentSecondary
              }}>

              $1,247
            </span>
          </span>
        </div>
        <span
          className="text-[10px] font-medium"
          style={{
            color: theme.textMuted
          }}>

          12% platform fee
        </span>
      </div>

      {/* --- Messages Area --- */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundColor: theme.bgApp
        }}>

        {MESSAGES.map((msg, index) =>
        <motion.div
          key={msg.id}
          initial={{
            opacity: 0,
            x: msg.isMe ? 20 : -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: index * 0.05
          }}
          className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>

            {!msg.isMe &&
          <div
            className={`w-8 h-8 rounded-full ${msg.avatar} flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-lg`}>

                {msg.sender.charAt(0)}
              </div>
          }

            <div
            className={`max-w-[75%] flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>

              {!msg.isMe &&
            <span
              className="text-[10px] mb-1 ml-1 font-medium"
              style={{
                color: theme.textMuted
              }}>

                  {msg.sender}
                </span>
            }

              <div
              className={`px-4 py-2.5 text-sm shadow-md ${msg.isMe ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm border'}`}
              style={{
                backgroundColor: msg.isMe ? theme.accent : theme.bgSurface,
                color: msg.isMe ? '#fff' : theme.textPrimary,
                borderColor: msg.isMe ? 'transparent' : theme.border
              }}>

                {msg.text}

                {/* Translation Display */}
                {msg.isForeign && translatedMessages.has(msg.id) &&
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                className="mt-2 pt-2 border-t border-white/20 text-xs italic opacity-90">

                    {msg.translated}
                  </motion.div>
              }
              </div>

              <div className="flex items-center gap-2 mt-1 mx-1">
                <span
                className="text-[10px] font-medium opacity-70"
                style={{
                  color: theme.textMuted
                }}>

                  {msg.time}
                </span>

                {/* Translate Button */}
                {msg.isForeign &&
              <button
                onClick={() => toggleTranslation(msg.id)}
                className="text-[10px] font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{
                  color: theme.accent
                }}>

                    <SparklesIcon size={8} />
                    {translatedMessages.has(msg.id) ? 'Original' : 'Translate'}
                  </button>
              }
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* --- Input Area --- */}
      <div
        className="p-4 border-t pb-24 sticky bottom-0 z-20"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border
        }}>

        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
            style={{
              backgroundColor: theme.bgElevated,
              borderColor: theme.border,
              color: theme.textMuted
            }}>

            <PlusIcon size={20} />
          </button>

          <div
            className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5 border transition-colors"
            style={{
              backgroundColor: theme.bgElevated,
              borderColor: theme.border
            }}>

            <input
              type="text"
              placeholder="Message CryptoBuilders..."
              className="flex-1 bg-transparent focus:outline-none text-sm"
              style={{
                color: theme.textPrimary,
                placeholderColor: theme.textMuted
              }} />

            <button
              style={{
                color: theme.textMuted
              }}>

              <SmileIcon size={18} />
            </button>
          </div>

          <button
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all"
            style={{
              backgroundColor: theme.accent
            }}>

            <SendIcon size={18} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>);

}