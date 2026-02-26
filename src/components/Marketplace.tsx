import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MARKETPLACE_ITEMS, MarketplaceItem } from './mockDatabase';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
interface MarketplaceProps {
  communityId: number;
  onContactSeller: (sellerName: string, sellerEmoji: string) => void;
}
type Category = 'Все' | 'Продаю' | 'Ищу' | 'Отдам даром';
export function Marketplace({
  communityId,
  onContactSeller
}: MarketplaceProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('Все');
  const categories: Category[] = ['Все', 'Продаю', 'Ищу', 'Отдам даром'];
  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCommunity = item.communityId === communityId;
    const matchesCategory =
    activeCategory === 'Все' || item.category === activeCategory;
    return matchesCommunity && matchesCategory;
  });
  const getCategoryColor = (category: MarketplaceItem['category']) => {
    switch (category) {
      case 'Продаю':
        return {
          bg: '#DCFCE7',
          text: '#166534'
        };
      // green
      case 'Ищу':
        return {
          bg: '#DBEAFE',
          text: '#1E40AF'
        };
      // blue
      case 'Отдам даром':
        return {
          bg: '#FFEDD5',
          text: '#9A3412'
        };
      // orange
      default:
        return {
          bg: theme.bgElevated,
          text: theme.textMuted
        };
    }
  };
  return (
    <div
      className="h-full overflow-y-auto pb-safe"
      style={{
        backgroundColor: theme.bgApp
      }}>

      <div
        className="sticky top-0 z-10 border-b px-4 py-3"
        style={{
          backgroundColor: theme.bgSurface,
          borderColor: theme.border
        }}>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border"
            style={{
              backgroundColor:
              activeCategory === cat ? theme.accent : theme.bgElevated,
              color: activeCategory === cat ? '#fff' : theme.textMuted,
              borderColor:
              activeCategory === cat ? theme.accent : 'transparent'
            }}>

              {cat === 'Все' ? t.marketAll : cat}
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {filteredItems.length > 0 ?
        <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
              const catColors = getCategoryColor(item.category);
              return (
                <motion.div
                  key={item.id}
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
                  className="rounded-2xl overflow-hidden shadow-sm border flex flex-col"
                  style={{
                    backgroundColor: theme.bgSurface,
                    borderColor: theme.border
                  }}>

                    <div className="h-32 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                      <span className="text-4xl filter drop-shadow-sm">
                        {item.sellerEmoji}
                      </span>
                      <span
                      className="absolute top-2 right-2 text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: catColors.bg,
                        color: catColors.text
                      }}>

                        {item.category}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col">
                      <h3
                      className="font-bold text-sm line-clamp-2 mb-1 leading-tight"
                      style={{
                        color: theme.textPrimary
                      }}>

                        {item.title}
                      </h3>
                      <p
                      className="font-bold text-base mb-2"
                      style={{
                        color: theme.accent
                      }}>

                        {item.price}
                      </p>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span
                          className="flex items-center gap-1 truncate max-w-[70%]"
                          style={{
                            color: theme.textMuted
                          }}>

                            {item.sellerEmoji} {item.sellerName}
                          </span>
                          <span
                          style={{
                            color: theme.textMuted,
                            opacity: 0.7
                          }}>

                            {item.postedTime}
                          </span>
                        </div>

                        <button
                        onClick={() =>
                        onContactSeller(item.sellerName, item.sellerEmoji)
                        }
                        className="w-full py-2 text-white text-sm font-semibold rounded-xl transition-colors active:scale-95"
                        style={{
                          backgroundColor: theme.accent
                        }}>

                          {t.marketContact}
                        </button>
                      </div>
                    </div>
                  </motion.div>);

            })}
            </AnimatePresence>
          </div> :

        <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-4xl mb-3">📦</span>
            <p
            className="font-medium"
            style={{
              color: theme.textMuted
            }}>

              {t.marketEmpty}
            </p>
          </div>
        }
      </div>
    </div>);

}