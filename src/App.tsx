import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Auth } from './components/Auth';
import { Registration, UserProfileData } from './components/Registration';
import { EventsFeed } from './components/EventsFeed';
import { DMList } from './components/DMList';
import { DMChat } from './components/DMChat';
import { Feed as CommunitiesDirectory } from './components/Feed';
import { CommunityHub } from './components/CommunityHub';
import { Profile } from './components/Profile';
import { BottomNav, Tab } from './components/BottomNav';
import { LanguageProvider } from './components/LanguageContext';
import { ThemeProvider } from './components/ThemeContext';
import { PlanProvider, usePlan } from './components/PlanContext';
import { PlanUpgrade } from './components/PlanUpgrade';
import {
  COMMUNITIES,
  INITIAL_MESSAGES,
  INITIAL_DM_MESSAGES,
  DM_CONVERSATIONS,
  Message,
  DMMessage,
  Community,
  DMConversation,
  getMessagesForCommunity,
  generateMessageId } from
'./components/mockDatabase';
interface AppState {
  isAuthenticated: boolean;
  phone: string;
}
type Screen =
{
  type: 'tabs';
} |
{
  type: 'community-hub';
  communityId: number;
} |
{
  type: 'dm-chat';
  conversationId: string;
};
function AppContent() {
  const { plan, setPlan } = usePlan();
  const [authState, setAuthState] = useState<AppState>(() => {
    const saved = localStorage.getItem('nt_chat_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          isAuthenticated: true,
          phone: parsed.phone || ''
        };
      } catch {
        return {
          isAuthenticated: false,
          phone: ''
        };
      }
    }
    return {
      isAuthenticated: false,
      phone: ''
    };
  });
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(() => {
    const saved = localStorage.getItem('nt_chat_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [activeTab, setActiveTab] = useState<Tab>('events');
  const [screen, setScreen] = useState<Screen>({
    type: 'tabs'
  });
  const [showPlanUpgrade, setShowPlanUpgrade] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [dmMessages, setDmMessages] = useState<DMMessage[]>(INITIAL_DM_MESSAGES);
  const [dmConversations, setDmConversations] =
  useState<DMConversation[]>(DM_CONVERSATIONS);
  const handleAuthenticated = (userName: string) => {
    const saved = localStorage.getItem('nt_chat_user');
    const phone = saved ? JSON.parse(saved).phone : '';
    setAuthState({
      isAuthenticated: true,
      phone
    });
  };
  const handleRegistrationComplete = (profile: UserProfileData) => {
    setUserProfile(profile);
  };
  const handleLogout = () => {
    localStorage.removeItem('nt_chat_user');
    localStorage.removeItem('nt_chat_profile');
    localStorage.removeItem('nt_chat_plan');
    setAuthState({
      isAuthenticated: false,
      phone: ''
    });
    setUserProfile(null);
    setPlan('free');
    setScreen({
      type: 'tabs'
    });
    setActiveTab('events');
  };
  const handleCommunityClick = (community: Community) => {
    setScreen({
      type: 'community-hub',
      communityId: community.id
    });
  };
  const handleDMChatClick = (conversationId: string) => {
    setDmConversations((prev) =>
    prev.map((conv) =>
    conv.id === conversationId ?
    {
      ...conv,
      unreadCount: 0
    } :
    conv
    )
    );
    setScreen({
      type: 'dm-chat',
      conversationId
    });
  };
  const handleBackToTabs = () => {
    setScreen({
      type: 'tabs'
    });
  };
  const handleSendCommunityMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };
  const handleSendDMMessage = (message: DMMessage) => {
    setDmMessages((prev) => [...prev, message]);
    setDmConversations((prev) =>
    prev.map((conv) =>
    conv.id === message.conversationId ?
    {
      ...conv,
      lastMessage: message.text,
      lastMessageTime: 'Только что',
      unreadCount: 0
    } :
    conv
    )
    );
  };
  const handleContactSeller = (sellerName: string, sellerEmoji: string) => {
    const existing = dmConversations.find(
      (c) => c.participantName === sellerName
    );
    if (existing) {
      setActiveTab('chats');
      setScreen({
        type: 'dm-chat',
        conversationId: existing.id
      });
    } else {
      const newId = `dm_${Date.now()}`;
      const newConv: DMConversation = {
        id: newId,
        participantName: sellerName,
        participantEmoji: sellerEmoji,
        lastMessage: 'Начать чат',
        lastMessageTime: 'Только что',
        unreadCount: 0,
        isOnline: true
      };
      setDmConversations((prev) => [newConv, ...prev]);
      setActiveTab('chats');
      setScreen({
        type: 'dm-chat',
        conversationId: newId
      });
    }
  };
  if (!authState.isAuthenticated) {
    return <Auth onAuthenticated={handleAuthenticated} />;
  }
  if (authState.isAuthenticated && !userProfile) {
    return <Registration onComplete={handleRegistrationComplete} />;
  }
  const currentCommunity =
  screen.type === 'community-hub' ?
  COMMUNITIES.find((c) => c.id === screen.communityId) :
  undefined;
  const currentCommunityMessages =
  screen.type === 'community-hub' ?
  getMessagesForCommunity(screen.communityId, messages) :
  [];
  const currentDMConversation =
  screen.type === 'dm-chat' ?
  dmConversations.find((c) => c.id === screen.conversationId) :
  undefined;
  const currentDMMessages =
  screen.type === 'dm-chat' ?
  dmMessages.
  filter((m) => m.conversationId === screen.conversationId).
  sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()) :
  [];
  // Render the current screen content
  const renderScreen = () => {
    if (screen.type === 'community-hub' && currentCommunity) {
      return (
        <CommunityHub
          community={currentCommunity}
          messages={currentCommunityMessages}
          onBack={handleBackToTabs}
          onSendMessage={handleSendCommunityMessage}
          onContactSeller={handleContactSeller} />);


    }
    if (screen.type === 'dm-chat' && currentDMConversation) {
      return (
        <DMChat
          conversation={currentDMConversation}
          messages={currentDMMessages}
          onBack={handleBackToTabs}
          onSendMessage={handleSendDMMessage} />);


    }
    // Tabs screen
    return (
      <>
        {activeTab === 'events' &&
        <EventsFeed
          profile={userProfile}
          onUpgradePlan={() => setShowPlanUpgrade(true)} />

        }
        {activeTab === 'chats' &&
        <DMList
          conversations={dmConversations}
          onChatClick={handleDMChatClick} />

        }
        {activeTab === 'communities' &&
        <CommunitiesDirectory
          communities={COMMUNITIES}
          onCommunityClick={handleCommunityClick} />

        }
        {activeTab === 'profile' && userProfile &&
        <Profile
          profile={userProfile}
          onLogout={handleLogout}
          onUpgradePlan={() => setShowPlanUpgrade(true)} />

        }
      </>);

  };
  return (
    <div className="min-h-screen w-full font-sans overflow-hidden bg-black">
      <div className="max-w-md mx-auto h-screen flex flex-col relative shadow-2xl overflow-hidden bg-white">
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {renderScreen()}
        </main>

        {screen.type === 'tabs' &&
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        }

        <AnimatePresence>
          {showPlanUpgrade &&
          <PlanUpgrade
            currentPlan={plan}
            onUpgrade={setPlan}
            onClose={() => setShowPlanUpgrade(false)} />

          }
        </AnimatePresence>
      </div>
    </div>);

}
export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PlanProvider>
          <AppContent />
        </PlanProvider>
      </LanguageProvider>
    </ThemeProvider>);

}