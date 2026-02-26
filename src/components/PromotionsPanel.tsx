import React, { useState } from 'react';
import {
  ZapIcon,
  TrendingUpIcon,
  ClockIcon,
  DollarSignIcon,
  ChevronDownIcon,
  CheckCircle2Icon } from
'lucide-react';
import { motion } from 'framer-motion';
export function PromotionsPanel() {
  const [duration, setDuration] = useState('24h');
  const [placement, setPlacement] = useState('feed');
  return (
    <div className="pb-24 pt-6 px-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#f0f0f8]">Promote Yourself</h1>
        <p className="text-[#6b6b8a]">Reach communities that matter to you.</p>
      </div>

      {/* Active Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 p-5 rounded-2xl bg-gradient-to-r from-[#7c5cfc] to-[#00d4aa] text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 text-sm font-medium">Total Spend</p>
              <h3 className="text-3xl font-bold mt-1">$342.50</h3>
            </div>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUpIcon size={24} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div>
              <span className="text-xs text-white/80 block">Impressions</span>
              <span className="font-bold text-lg">12.5k</span>
            </div>
            <div>
              <span className="text-xs text-white/80 block">Clicks</span>
              <span className="font-bold text-lg">843</span>
            </div>
          </div>
        </div>
      </div>

      {/* Create Promotion */}
      <section className="bg-[#1c1c27] rounded-2xl p-5 border border-[#2a2a3a]">
        <h2 className="text-lg font-bold text-[#f0f0f8] mb-4 flex items-center gap-2">
          <ZapIcon size={18} className="text-[#00d4aa]" />
          Create Promotion
        </h2>

        <div className="space-y-4">
          {/* Community Selector */}
          <div>
            <label className="text-xs text-[#6b6b8a] font-medium mb-1.5 block">
              Target Community
            </label>
            <div className="relative">
              <select className="w-full bg-[#13131a] text-[#f0f0f8] border border-[#2a2a3a] rounded-xl p-3 appearance-none focus:outline-none focus:border-[#7c5cfc]">
                <option>CryptoBuilders (4.2k)</option>
                <option>DesignHive (2.8k)</option>
                <option>NightOwls (9.1k)</option>
              </select>
              <ChevronDownIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b8a]"
                size={16} />

            </div>
          </div>

          {/* Placement Type */}
          <div>
            <label className="text-xs text-[#6b6b8a] font-medium mb-1.5 block">
              Placement
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPlacement('feed')}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${placement === 'feed' ? 'bg-[#7c5cfc]/10 border-[#7c5cfc] text-[#f0f0f8]' : 'bg-[#13131a] border-[#2a2a3a] text-[#6b6b8a]'}`}>

                Pin to Feed
              </button>
              <button
                onClick={() => setPlacement('chat')}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${placement === 'chat' ? 'bg-[#7c5cfc]/10 border-[#7c5cfc] text-[#f0f0f8]' : 'bg-[#13131a] border-[#2a2a3a] text-[#6b6b8a]'}`}>

                Broadcast to Chat
              </button>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-xs text-[#6b6b8a] font-medium mb-1.5 block">
              Duration
            </label>
            <div className="flex gap-3">
              {['24h', '3d', '7d'].map((d) =>
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-all ${duration === d ? 'bg-[#f0f0f8] text-[#0a0a0f] border-[#f0f0f8]' : 'bg-[#13131a] border-[#2a2a3a] text-[#6b6b8a]'}`}>

                  {d}
                </button>
              )}
            </div>
          </div>

          {/* Fee Calculator */}
          <div className="bg-[#13131a] rounded-xl p-4 space-y-2 mt-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#6b6b8a]">Promotion Fee</span>
              <span className="text-[#f0f0f8]">$50.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6b6b8a]">Platform Commission (12%)</span>
              <span className="text-[#f0f0f8]">$6.00</span>
            </div>
            <div className="h-[1px] bg-[#2a2a3a] my-1" />
            <div className="flex justify-between text-sm font-bold">
              <span className="text-[#00d4aa]">To Community Fund</span>
              <span className="text-[#00d4aa]">$44.00</span>
            </div>
          </div>

          <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#7c5cfc] to-[#6b4ce6] text-white font-bold shadow-lg shadow-[#7c5cfc]/25 hover:shadow-[#7c5cfc]/40 transition-all">
            Launch Promotion
          </button>
        </div>
      </section>

      {/* My Promotions List */}
      <section>
        <h2 className="text-lg font-bold text-[#f0f0f8] mb-4">
          Active Campaigns
        </h2>
        <div className="space-y-3">
          {[
          {
            community: 'DesignHive',
            status: 'Active',
            impressions: '2.4k',
            spend: '$25.00'
          },
          {
            community: 'TechPulse',
            status: 'Pending',
            impressions: '-',
            spend: '$50.00'
          }].
          map((promo, i) =>
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-xl bg-[#1c1c27] border border-[#2a2a3a]">

              <div>
                <h4 className="font-bold text-[#f0f0f8] text-sm">
                  {promo.community}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${promo.status === 'Active' ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : 'bg-amber-500/10 text-amber-500'}`}>

                    {promo.status}
                  </span>
                  <span className="text-xs text-[#6b6b8a]">
                    {promo.impressions} views
                  </span>
                </div>
              </div>
              <span className="font-medium text-[#f0f0f8]">{promo.spend}</span>
            </div>
          )}
        </div>
      </section>

      {/* Fund Leaderboard */}
      <section>
        <h2 className="text-lg font-bold text-[#f0f0f8] mb-4">
          Top Community Funds
        </h2>
        <div className="space-y-4">
          {[
          {
            name: 'CryptoBuilders',
            fund: '$12,450',
            percent: 85
          },
          {
            name: 'NightOwls',
            fund: '$8,230',
            percent: 65
          },
          {
            name: 'DesignHive',
            fund: '$5,120',
            percent: 45
          }].
          map((comm, i) =>
          <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#f0f0f8] font-medium">
                  {i + 1}. {comm.name}
                </span>
                <span className="text-[#00d4aa] font-bold">{comm.fund}</span>
              </div>
              <div className="h-2 w-full bg-[#2a2a3a] rounded-full overflow-hidden">
                <motion.div
                initial={{
                  width: 0
                }}
                animate={{
                  width: `${comm.percent}%`
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.1
                }}
                className="h-full bg-gradient-to-r from-[#7c5cfc] to-[#00d4aa]" />

              </div>
            </div>
          )}
        </div>
      </section>
    </div>);

}