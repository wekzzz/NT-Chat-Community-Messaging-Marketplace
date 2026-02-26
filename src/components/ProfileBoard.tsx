import React, { useState } from 'react';
import {
  Settings2Icon,
  CrownIcon,
  LayoutListIcon,
  ZapIcon,
  CheckCircle2Icon,
  XIcon,
  Edit3Icon,
  BellIcon,
  ShieldIcon,
  ChevronRightIcon,
  GlobeIcon,
  PaletteIcon } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, ThemeName } from './ThemeContext';
type Density = 'compact' | 'comfortable';
interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  gradient: string;
}
const PRODUCTS: Product[] = [
{
  id: 1,
  title: 'Neon Hoodie',
  category: 'Apparel',
  price: '$89.00',
  gradient: 'from-violet-600 to-indigo-800'
},
{
  id: 2,
  title: 'Crystal Pendant',
  category: 'Jewelry',
  price: '$145.00',
  gradient: 'from-cyan-500 to-blue-700'
},
{
  id: 3,
  title: 'Retro Poster Vol.3',
  category: 'Art',
  price: '$24.00',
  gradient: 'from-orange-500 to-pink-600'
},
{
  id: 4,
  title: 'Analog Watch',
  category: 'Accessories',
  price: '$320.00',
  gradient: 'from-slate-600 to-zinc-800'
},
{
  id: 5,
  title: 'Glow Sneakers',
  category: 'Footwear',
  price: '$210.00',
  gradient: 'from-green-500 to-teal-700'
},
{
  id: 6,
  title: 'Digital Zine #7',
  category: 'Media',
  price: '$12.00',
  gradient: 'from-fuchsia-600 to-purple-800'
}];

const ACCENT_COLORS = [
{
  name: 'Violet',
  value: '#7c5cfc'
},
{
  name: 'Teal',
  value: '#00d4aa'
},
{
  name: 'Rose',
  value: '#f43f5e'
},
{
  name: 'Amber',
  value: '#f59e0b'
},
{
  name: 'Cyan',
  value: '#06b6d4'
}];

const LANGUAGES = [
{
  id: 'kz',
  name: 'Kazakh',
  native: 'Қазақша',
  flag: '🇰🇿'
},
{
  id: 'ru',
  name: 'Russian',
  native: 'Русский',
  flag: '🇷🇺'
},
{
  id: 'en',
  name: 'English',
  native: 'English',
  flag: '🇬🇧'
},
{
  id: 'zh',
  name: 'Chinese',
  native: '中文',
  flag: '🇨🇳'
}];

const THEMES: {
  id: ThemeName;
  name: string;
  color: string;
}[] = [
{
  id: 'dark',
  name: 'Dark',
  color: '#13131a'
},
{
  id: 'light',
  name: 'Light',
  color: '#ffffff'
},
{
  id: 'midnight',
  name: 'Midnight',
  color: '#0f172a'
},
{
  id: 'cyberpunk',
  name: 'Cyberpunk',
  color: '#000000'
}];

export function ProfileBoard() {
  const { theme, setTheme } = useTheme();
  const [accentColor, setAccentColor] = useState('#7c5cfc');
  const [density, setDensity] = useState<Density>('compact');
  const [showToolbar, setShowToolbar] = useState(false);
  const [promotedCards, setPromotedCards] = useState<Set<number>>(new Set());
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const handlePromote = (id: number) => {
    if (promotedCards.has(id)) return;
    setPromotedCards((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setPromotedCards((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2000);
  };
  return (
    <div
      className="min-h-full pb-32 pt-6 px-4 relative"
      style={
      {
        '--accent': accentColor,
        backgroundColor: theme.bgApp,
        color: theme.textPrimary
      } as React.CSSProperties
      }>

      {/* --- Profile Header --- */}
      <header className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          <div
            className="w-28 h-28 rounded-full p-[3px]"
            style={{
              background: `linear-gradient(to top right, ${accentColor}, ${theme.accentSecondary})`
            }}>

            <div
              className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border-4"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.bgApp
              }}>

              <span
                className="text-3xl font-bold font-syne"
                style={{
                  color: theme.textPrimary
                }}>

                K
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="absolute bottom-0 right-0 p-2 rounded-full border shadow-lg"
            style={{
              backgroundColor: theme.bgElevated,
              borderColor: theme.border,
              color: theme.textPrimary
            }}>

            <Edit3Icon size={16} />
          </motion.button>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <h1
            className="text-3xl font-bold font-syne"
            style={{
              color: theme.textPrimary
            }}>

            Kirill
          </h1>
          <div
            className="px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`
            }}>

            <CrownIcon size={10} className="text-white fill-white" />
            <span className="text-[10px] font-bold text-white tracking-wider">
              PRO
            </span>
          </div>
        </div>
        <p
          className="mb-6 font-medium"
          style={{
            color: theme.textMuted
          }}>

          @kirill.builds
        </p>

        <div className="flex items-center justify-center gap-8 w-full max-w-xs mx-auto">
          {[
          {
            label: 'Followers',
            value: '3.4k'
          },
          {
            label: 'Following',
            value: '891'
          },
          {
            label: 'Products',
            value: '24'
          }].
          map((stat) =>
          <div key={stat.label} className="flex flex-col items-center">
              <span
              className="text-lg font-bold font-syne"
              style={{
                color: theme.textPrimary
              }}>

                {stat.value}
              </span>
              <span
              className="text-xs font-medium"
              style={{
                color: theme.textMuted
              }}>

                {stat.label}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* --- Bulletin Board Section --- */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold font-syne"
            style={{
              color: theme.textPrimary
            }}>

            Bulletin Board
          </h2>
          <motion.button
            whileTap={{
              scale: 0.9
            }}
            onClick={() => setShowToolbar(!showToolbar)}
            className={`p-2 rounded-xl transition-colors`}
            style={{
              backgroundColor: showToolbar ? accentColor : theme.bgElevated,
              color: showToolbar ? '#fff' : theme.textMuted
            }}>

            <Settings2Icon size={20} />
          </motion.button>
        </div>

        <motion.div
          layout
          className={`grid gap-4 ${density === 'compact' ? 'grid-cols-2' : 'grid-cols-1'}`}>

          <AnimatePresence>
            {PRODUCTS.map((product, index) =>
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              density={density}
              accentColor={accentColor}
              isPromoted={promotedCards.has(product.id)}
              onPromote={() => handlePromote(product.id)}
              theme={theme} />

            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- Customization Toolbar --- */}
      <AnimatePresence>
        {showToolbar &&
        <motion.div
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: 50
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 300
          }}
          className="mt-8 backdrop-blur-xl border rounded-2xl p-5 shadow-2xl"
          style={{
            backgroundColor: `${theme.bgElevated}E6`,
            borderColor: theme.border
          }}>

            <div className="flex items-center justify-between mb-6">
              <h3
              className="text-lg font-bold font-syne"
              style={{
                color: theme.textPrimary
              }}>

                Customize Board
              </h3>
              <button
              onClick={() => setShowToolbar(false)}
              className="p-1 rounded-full hover:bg-opacity-80 transition-colors"
              style={{
                color: theme.textMuted
              }}>

                <XIcon size={20} />
              </button>
            </div>

            <div className="mb-6">
              <label
              className="text-xs font-bold uppercase tracking-wider mb-3 block"
              style={{
                color: theme.textMuted
              }}>

                Accent Color
              </label>
              <div className="flex gap-3">
                {ACCENT_COLORS.map((color) =>
              <button
                key={color.name}
                onClick={() => setAccentColor(color.value)}
                className={`w-8 h-8 rounded-full transition-all relative ${accentColor === color.value ? 'scale-110 ring-2 ring-offset-2' : 'hover:scale-105'}`}
                style={{
                  backgroundColor: color.value,
                  ringColor: theme.bgSurface
                }} />

              )}
              </div>
            </div>

            <div>
              <label
              className="text-xs font-bold uppercase tracking-wider mb-3 block"
              style={{
                color: theme.textMuted
              }}>

                Layout Density
              </label>
              <div
              className="flex gap-2 p-1 rounded-xl border"
              style={{
                backgroundColor: theme.bgSurface,
                borderColor: theme.border
              }}>

                <button
                onClick={() => setDensity('compact')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all`}
                style={{
                  backgroundColor:
                  density === 'compact' ? theme.textPrimary : 'transparent',
                  color:
                  density === 'compact' ? theme.bgApp : theme.textMuted
                }}>

                  <div size={16} />
                  Compact
                </button>
                <button
                onClick={() => setDensity('comfortable')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all`}
                style={{
                  backgroundColor:
                  density === 'comfortable' ?
                  theme.textPrimary :
                  'transparent',
                  color:
                  density === 'comfortable' ? theme.bgApp : theme.textMuted
                }}>

                  <LayoutListIcon size={16} />
                  Comfortable
                </button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* --- Settings Section --- */}
      <section className="mt-2">
        <h2
          className="text-xl font-bold font-syne mb-5"
          style={{
            color: theme.textPrimary
          }}>

          Settings
        </h2>

        {/* Theme Selector (New) */}
        <div
          className="border rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          <div className="flex items-center gap-2 mb-4">
            <PaletteIcon
              size={16}
              style={{
                color: theme.accent
              }} />

            <h3
              className="text-sm font-bold uppercase tracking-wider"
              style={{
                color: theme.textPrimary
              }}>

              App Theme
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {THEMES.map((t) =>
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${theme.name === t.id ? 'ring-2 ring-offset-1' : ''}`}
              style={{
                backgroundColor: theme.bgElevated,
                borderColor:
                theme.name === t.id ? theme.accent : theme.border,
                ringColor: theme.accent
              }}>

                <div
                className="w-6 h-6 rounded-full border shadow-sm"
                style={{
                  backgroundColor: t.color,
                  borderColor: theme.border
                }} />

                <span
                className="text-[10px] font-medium"
                style={{
                  color: theme.textPrimary
                }}>

                  {t.name}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Language Preference */}
        <div
          className="border rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          <div className="flex items-center gap-2 mb-4">
            <GlobeIcon
              size={16}
              style={{
                color: theme.accent
              }} />

            <h3
              className="text-sm font-bold uppercase tracking-wider"
              style={{
                color: theme.textPrimary
              }}>

              Language Preference
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <motion.button
                  key={lang.id}
                  whileTap={{
                    scale: 0.97
                  }}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 text-center transition-all duration-200`}
                  style={{
                    backgroundColor: isSelected ?
                    `${theme.accentSecondary}15` :
                    theme.bgElevated,
                    borderColor: isSelected ?
                    theme.accentSecondary :
                    theme.border
                  }}>

                  {isSelected &&
                  <motion.div
                    initial={{
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1
                    }}
                    className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                    style={{
                      backgroundColor: theme.accentSecondary
                    }}>

                      <CheckCircle2Icon
                      size={12}
                      className="text-white fill-white"
                      strokeWidth={3} />

                    </motion.div>
                  }
                  <span className="text-3xl leading-none">{lang.flag}</span>
                  <div>
                    <p
                      className={`text-sm font-bold leading-tight`}
                      style={{
                        color: isSelected ?
                        theme.accentSecondary :
                        theme.textPrimary
                      }}>

                      {lang.native}
                    </p>
                    <p
                      className="text-[10px] mt-0.5 font-medium"
                      style={{
                        color: theme.textMuted
                      }}>

                      {lang.name}
                    </p>
                  </div>
                </motion.button>);

            })}
          </div>
        </div>

        {/* Other Settings Rows */}
        <div
          className="border rounded-2xl overflow-hidden mb-4"
          style={{
            backgroundColor: theme.bgSurface,
            borderColor: theme.border
          }}>

          {[
          {
            icon: BellIcon,
            label: 'Notifications',
            value: 'All alerts on',
            color: 'text-amber-400'
          },
          {
            icon: ShieldIcon,
            label: 'Privacy',
            value: 'Public profile',
            color: 'text-blue-400'
          }].
          map((item, i, arr) =>
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-opacity-80 transition-colors ${i < arr.length - 1 ? 'border-b' : ''}`}
            style={{
              borderColor: theme.border
            }}>

              <div
              className={`p-2 rounded-xl ${item.color}`}
              style={{
                backgroundColor: theme.bgElevated
              }}>

                <item.icon size={16} />
              </div>
              <div className="flex-1 text-left">
                <p
                className="text-sm font-semibold"
                style={{
                  color: theme.textPrimary
                }}>

                  {item.label}
                </p>
                <p
                className="text-xs mt-0.5"
                style={{
                  color: theme.textMuted
                }}>

                  {item.value}
                </p>
              </div>
              <ChevronRightIcon
              size={16}
              style={{
                color: theme.textMuted
              }} />

            </button>
          )}
        </div>
      </section>
    </div>);

}
interface ProductCardProps {
  product: Product;
  index: number;
  density: Density;
  accentColor: string;
  isPromoted: boolean;
  onPromote: () => void;
  theme: any;
}
function ProductCard({
  product,
  index,
  density,
  accentColor,
  isPromoted,
  onPromote,
  theme
}: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: index * 0.08
      }}
      className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300"
      style={{
        backgroundColor: `${theme.bgSurface}80`,
        backdropFilter: 'blur(12px)',
        border: `1px solid ${theme.border}`,
        boxShadow: `0 0 20px -10px ${accentColor}30`
      }}>

      <div
        className={`w-full bg-gradient-to-br ${product.gradient} relative overflow-hidden ${density === 'compact' ? 'h-36' : 'h-48'}`}>

        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-bold text-sm leading-tight line-clamp-2"
            style={{
              color: theme.textPrimary
            }}>

            {product.title}
          </h3>
          <span
            className="text-xs font-bold whitespace-nowrap"
            style={{
              color: accentColor
            }}>

            {product.price}
          </span>
        </div>

        <span
          className="text-[10px] uppercase tracking-wider font-medium block mb-4"
          style={{
            color: theme.textMuted
          }}>

          {product.category}
        </span>

        <motion.button
          whileTap={{
            scale: 0.95
          }}
          onClick={onPromote}
          disabled={isPromoted}
          className="w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all overflow-hidden relative"
          style={{
            backgroundColor: isPromoted ?
            theme.accentSecondary :
            `${accentColor}20`,
            color: isPromoted ? '#fff' : accentColor
          }}>

          <AnimatePresence mode="wait">
            {isPromoted ?
            <motion.span
              key="promoted"
              initial={{
                y: 20,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                y: -20,
                opacity: 0
              }}
              className="flex items-center gap-1.5">

                <CheckCircle2Icon size={12} /> Promoted!
              </motion.span> :

            <motion.span
              key="promote"
              initial={{
                y: 20,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                y: -20,
                opacity: 0
              }}
              className="flex items-center gap-1.5">

                <ZapIcon size={12} /> Promote
              </motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>);

}