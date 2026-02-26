import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  COMMUNITIES, INITIAL_MESSAGES, INITIAL_DM_MESSAGES, DM_CONVERSATIONS,
  Message, DMMessage, Community, DMConversation
} from './components/mockDatabase';

interface AppState { isAuthenticated: boolean; phone: string; }
type Screen = | { type: 'tabs' } | { type: 'community-hub'; communityId: number } | { type: 'dm-chat'; conversationId: string };

function AppContent() {
  const { plan, setPlan } = usePlan();
  const [authState, setAuthState] = useState<AppState>(() => {
    const saved = localStorage.getItem('nt_chat_user');
    return saved ? { isAuthenticated: true, phone: JSON.parse(saved).phone || '' } : { isAuthenticated: false, phone: '' };
  });

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(() => {
    const saved = localStorage.getItem('nt_chat_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<Tab>('events');
  const [screen, setScreen] = useState<Screen>({ type: 'tabs' });
  const [showPlanUpgrade, setShowPlanUpgrade] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [dmMessages, setDmMessages] = useState<DMMessage[]>(INITIAL_DM_MESSAGES);
  const [dmConversations, setDmConversations] = useState<DMConversation[]>(DM_CONVERSATIONS);

  // WEBSOCKETS LOGIC
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const host = window.location.hostname;
    const socket = new WebSocket(`ws://${host}:8080`);

    socket.onopen = () => console.log('Подключено к Fastify WebSocket');

    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        
        if (response.type === 'init') {
          if (response.data.community.length > 0) {
            setMessages(prev => {
              const newMsgs = response.data.community.filter((newMsg: Message) => !prev.some(m => m.id === newMsg.id));
              return [...prev, ...newMsgs];
            });
          }
        } 
        else if (response.type === 'broadcast_community') {
          setMessages(prev => prev.some(m => m.id === response.data.id) ? prev : [...prev, response.data]);
        } 
      } catch (e) {
        console.error('WebSocket Error:', e);
      }
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  const handleAuthenticated = () => setAuthState({ isAuthenticated: true, phone: '' });
  const handleRegistrationComplete = (profile: UserProfileData) => setUserProfile(profile);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({ isAuthenticated: false, phone: '' });
    setUserProfile(null);
    setScreen({ type: 'tabs' });
  };

  const handleSendCommunityMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'new_community_message', data: message }));
    }
  };

  const handleCommunityClick = (community: Community) => setScreen({ type: 'community-hub', communityId: community.id });
  const handleBackToTabs = () => setScreen({ type: 'tabs' });

  if (!authState.isAuthenticated) return <Auth onAuthenticated={handleAuthenticated} />;
  if (authState.isAuthenticated && !userProfile) return <Registration onComplete={handleRegistrationComplete} />;

  const currentCommunity = screen.type === 'community-hub' ? COMMUNITIES.find(c => c.id === screen.communityId) : undefined;
  const currentCommunityMessages = screen.type === 'community-hub' ? messages.filter(m => m.communityId === screen.communityId) : [];

  return (
    <div className="min-h-screen w-full font-sans overflow-hidden bg-black">
      <div className="max-w-md mx-auto h-screen flex flex-col relative shadow-2xl overflow-hidden bg-white">
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            {screen.type === 'community-hub' && currentCommunity ? (
              <motion.div key="hub" className="h-full">
                <CommunityHub community={currentCommunity} messages={currentCommunityMessages} onBack={handleBackToTabs} onSendMessage={handleSendCommunityMessage} onContactSeller={() => {}} />
              </motion.div>
            ) : (
              <motion.div key={activeTab} className="h-full">
                {activeTab === 'events' && <EventsFeed profile={userProfile} onUpgradePlan={() => setShowPlanUpgrade(true)} />}
                {activeTab === 'communities' && <CommunitiesDirectory communities={COMMUNITIES} onCommunityClick={handleCommunityClick} />}
                {activeTab === 'profile' && userProfile && <Profile profile={userProfile} onLogout={handleLogout} onUpgradePlan={() => setShowPlanUpgrade(true)} />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        {screen.type === 'tabs' && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PlanProvider>
          <AppContent />
        </PlanProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
