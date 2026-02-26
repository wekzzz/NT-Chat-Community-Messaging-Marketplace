import React from 'react';
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  MessageCircleIcon,
  ShoppingBagIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
interface UserStorefrontProps {
  userId: string;
  onBack: () => void;
  onChat: () => void;
}
export function UserStorefront({
  userId,
  onBack,
  onChat
}: UserStorefrontProps) {
  const { theme } = useTheme();
  // Mock data - in a real app, fetch based on userId
  const user = {
    name: 'Alex K.',
    handle: '@alex_builds',
    bio: 'Custom bike builder & vintage restorer. Local to Downtown.',
    location: 'Downtown District',
    rating: 4.9,
    reviews: 128,
    isPro: true,
    products: [
    {
      id: 1,
      title: 'Vintage Road Bike',
      price: '$450',
      image: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: 'Custom Fixie',
      price: '$320',
      image: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Bike Repair Service',
      price: '$50/hr',
      image: 'from-green-500 to-emerald-500'
    }]

  };
  return (
    <div
      className="min-h-full pb-24 pt-4 px-4 relative"
      style={{
        backgroundColor: theme.bgApp,
        color: theme.textPrimary
      }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full transition-colors"
          style={{
            backgroundColor: theme.bgSurface,
            color: theme.textMuted
          }}>

          <ArrowLeftIcon size={24} />
        </button>
        <div className="flex gap-2">
          <button
            onClick={onChat}
            className="p-2 rounded-full transition-colors"
            style={{
              backgroundColor: theme.accent,
              color: '#fff'
            }}>

            <MessageCircleIcon size={20} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center text-center mb-8">
        <div
          className="w-24 h-24 rounded-full p-[3px] mb-4"
          style={{
            background: `linear-gradient(to right, ${theme.accent}, ${theme.accentSecondary})`
          }}>

          <div
            className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden border-4"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.bgApp
            }}>

            {user.name.charAt(0)}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold font-syne">{user.name}</h1>
          {user.isPro &&
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
            style={{
              backgroundColor: theme.accent
            }}>

              PRO
            </span>
          }
        </div>
        <p
          className="text-sm mb-4"
          style={{
            color: theme.textMuted
          }}>

          {user.handle}
        </p>

        <p className="text-sm max-w-xs mb-4 leading-relaxed">{user.bio}</p>

        <div
          className="flex items-center gap-4 text-xs font-medium"
          style={{
            color: theme.textMuted
          }}>

          <span className="flex items-center gap-1">
            <MapPinIcon size={12} /> {user.location}
          </span>
          <span className="flex items-center gap-1">
            <StarIcon
              size={12}
              style={{
                color: theme.accentSecondary
              }} />
            {' '}
            {user.rating} ({user.reviews})
          </span>
        </div>
      </div>

      {/* Storefront Grid */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBagIcon
            size={18}
            style={{
              color: theme.accent
            }} />

          <h2 className="text-lg font-bold font-syne">Storefront</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {user.products.map((product, i) =>
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.1
            }}
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{
              backgroundColor: theme.bgSurface,
              border: `1px solid ${theme.border}`
            }}>

              <div
              className={`h-32 w-full bg-gradient-to-br ${product.image}`} />

              <div className="p-3">
                <h3 className="font-bold text-sm mb-1 truncate">
                  {product.title}
                </h3>
                <span
                className="text-xs font-bold"
                style={{
                  color: theme.accent
                }}>

                  {product.price}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>);

}