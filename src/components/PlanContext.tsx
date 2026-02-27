import React, { useState, createContext, useContext } from 'react';
export type PlanType = 'free' | 'standard' | 'pro';
export interface PlanLimits {
  photos: number;
  marketplaceItems: number;
  posts: number;
  price: number;
}
export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    photos: 1,
    marketplaceItems: 0,
    posts: 0,
    price: 0
  },
  standard: {
    photos: 5,
    marketplaceItems: 4,
    posts: 4,
    price: 990
  },
  pro: {
    photos: Infinity,
    marketplaceItems: Infinity,
    posts: Infinity,
    price: 2990
  }
};
interface PlanContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  limits: PlanLimits;
  canAddPhoto: (currentCount: number) => boolean;
  canAddMarketItem: (currentCount: number) => boolean;
  canAddPost: (currentCount: number) => boolean;
}
const PlanContext = createContext<PlanContextType | undefined>(undefined);
// NOTE: Uses React.ReactNode (not named import) so this never breaks
export function PlanProvider({ children }: {children: React.ReactNode;}) {
  const [plan, setPlanState] = useState<PlanType>(() => {
    const saved = localStorage.getItem('nt_chat_plan');
    return saved as PlanType || 'free';
  });
  const setPlan = (newPlan: PlanType) => {
    setPlanState(newPlan);
    localStorage.setItem('nt_chat_plan', newPlan);
  };
  const limits = PLAN_LIMITS[plan];
  const canAddPhoto = (currentCount: number) => currentCount < limits.photos;
  const canAddMarketItem = (currentCount: number) =>
  currentCount < limits.marketplaceItems;
  const canAddPost = (currentCount: number) => currentCount < limits.posts;
  return (
    <PlanContext.Provider
      value={{
        plan,
        setPlan,
        limits,
        canAddPhoto,
        canAddMarketItem,
        canAddPost
      }}>

      {children}
    </PlanContext.Provider>);

}
export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}