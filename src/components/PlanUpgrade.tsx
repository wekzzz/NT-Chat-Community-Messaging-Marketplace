import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckIcon, LoaderIcon, StarIcon, ZapIcon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { PlanType, PLAN_LIMITS } from './PlanContext';
interface PlanUpgradeProps {
  currentPlan: PlanType;
  onUpgrade: (plan: PlanType) => void;
  onClose: () => void;
}
export function PlanUpgrade({
  currentPlan,
  onUpgrade,
  onClose
}: PlanUpgradeProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState<PlanType | null>(null);
  const handleSelectPlan = (plan: PlanType) => {
    if (plan === currentPlan) return;
    setIsLoading(plan);
    setTimeout(() => {
      setIsLoading(null);
      onUpgrade(plan);
      onClose();
    }, 1500);
  };
  const plans = [
  {
    id: 'free' as PlanType,
    name: t.planFree,
    price: '0',
    features: [
    `1 ${t.planPhotos}`,
    `0 ${t.planMarketplace}`,
    `0 ${t.planPosts}`],

    color: theme.textMuted,
    bg: theme.bgElevated,
    border: theme.border,
    icon: null
  },
  {
    id: 'standard' as PlanType,
    name: t.planStandard,
    price: '990',
    features: [
    `5 ${t.planPhotos}`,
    `4 ${t.planMarketplace}`,
    `4 ${t.planPosts}`],

    color: theme.accent,
    bg: `${theme.accent}10`,
    border: theme.accent,
    badge: t.planPopular,
    icon: <ZapIcon size={16} className="text-white" />
  },
  {
    id: 'pro' as PlanType,
    name: t.planPro,
    price: '2,990',
    features: [
    `∞ ${t.planPhotos}`,
    `∞ ${t.planMarketplace}`,
    `∞ ${t.planPosts}`],

    color: '#EAB308',
    bg: '#FEF9C3',
    border: '#EAB308',
    badge: t.planBestValue,
    icon: <StarIcon size={16} className="text-white" />
  }];

  return (
    <>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />

      <motion.div
        initial={{
          y: '100%'
        }}
        animate={{
          y: 0
        }}
        exit={{
          y: '100%'
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 200
        }}
        className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl z-50 pb-safe"
        style={{
          backgroundColor: theme.bgApp
        }}>

        <div
          className="sticky top-0 z-10 px-4 py-4 flex items-center justify-between"
          style={{
            backgroundColor: theme.bgApp
          }}>

          <div>
            <h2
              className="text-2xl font-bold font-syne"
              style={{
                color: theme.textPrimary
              }}>

              {t.planUpgradeTitle}
            </h2>
            <p
              className="text-sm"
              style={{
                color: theme.textMuted
              }}>

              {t.planUpgradeSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full"
            style={{
              backgroundColor: theme.bgElevated,
              color: theme.textPrimary
            }}>

            <XIcon size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {plans.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            const isProcessing = isLoading === plan.id;
            return (
              <div
                key={plan.id}
                className="relative rounded-3xl p-5 border-2 transition-all"
                style={{
                  backgroundColor: theme.bgSurface,
                  borderColor: plan.border,
                  boxShadow:
                  plan.id !== 'free' ? `0 4px 20px ${plan.color}20` : 'none'
                }}>

                {plan.badge &&
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1"
                  style={{
                    backgroundColor: plan.color
                  }}>

                    {plan.icon}
                    {plan.badge}
                  </div>
                }

                <div className="flex justify-between items-start mb-4 mt-2">
                  <div>
                    <h3
                      className="text-xl font-bold"
                      style={{
                        color: theme.textPrimary
                      }}>

                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span
                        className="text-2xl font-bold"
                        style={{
                          color: plan.color
                        }}>

                        {plan.price}
                      </span>
                      {plan.price !== '0' &&
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: theme.textMuted
                        }}>

                          {t.perMonth}
                        </span>
                      }
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) =>
                  <div key={idx} className="flex items-center gap-3">
                      <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: plan.bg,
                        color: plan.color
                      }}>

                        <CheckIcon size={12} strokeWidth={3} />
                      </div>
                      <span
                      className="text-sm font-medium"
                      style={{
                        color: theme.textPrimary
                      }}>

                        {feature}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrent || isLoading !== null}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: isCurrent ? theme.bgElevated : plan.color,
                    color: isCurrent ? theme.textMuted : '#fff',
                    opacity: isLoading !== null && !isProcessing ? 0.5 : 1
                  }}>

                  {isProcessing ?
                  <motion.div
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1
                    }}>

                      <LoaderIcon size={20} />
                    </motion.div> :
                  isCurrent ?
                  t.planCurrent :

                  t.planUpgrade
                  }
                </button>
              </div>);

          })}
        </div>
      </motion.div>
    </>);

}