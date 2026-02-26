import React, { useState } from 'react';
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
import { UserProfileScreen } from './components/UserProfileScreen';
import { useChatSocket } from './hooks/useChatSocket';
import {
  COMMUNITIES, INITIAL_MESSAGES, INITIAL_DM_MESSAGES, DM_CONVERSATIONS,
  Message, DMMessage, Community, DMConversation
} from './components/mockDatabase';

type Screen = 
  | { type: 'tabs' } 
  | { type: 'community-hub'; communityId: number } 
  | { type: 'dm-chat'; conversationId: string }
  | { type: 'user-profile'; targetUserId: string; targetUserName: string };

function AppContent() {
  const { plan, setPlan } = usePlan();
  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('nt_chat_user');
    return saved ? { isAuthenticated: true, phone: JSON.parse(saved).phone || '' } : { isAuthenticated: false, phone: '' };
  });

  const [userProfile, setUserProfile] = useState<UserProfileData | null>(() => {
    const saved = localStorage.getItem('nt_chat_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<Tab>('events');
  const [screen, setScreen] = useState<Screen>({ type: 'tabs' });
  
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [dmMessages, setDmMessages] = useState<DMMessage[]>(INITIAL_DM_MESSAGES);
  const [dmConversations, setDmConversations] = useState<DMConversation[]>(DM_CONVERSATIONS);

  const myUserId = userProfile?.id || 'me';
  const currentConversationId = screen.type === 'dm-chat' ? screen.conversationId : undefined;

  // Чистое подключение сокетов
  const { sendCommunityMessage, sendDmMessage } = useChatSocket(
    myUserId, 
    currentConversationId, 
    setMessages, 
    setDmMessages, 
    setDmConversations
  );

  const handleSendCommunityMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
    sendCommunityMessage(msg);
  };

  const handleSendDMMessage = (msg: DMMessage) => {
    setDmMessages(prev => [...prev, msg]);
    setDmConversations(prev => prev.map(c => c.id === msg.conversationId ? { ...c, lastMessage: msg.text, lastMessageTime: 'Только что', unreadCount: 0 } : c));
    sendDmMessage(msg);
  };

  // Строгое создание личного чата по ID
  const handleStartDM = (targetUserId: string, targetUserName: string) => {
    const participants = [myUserId, targetUserId].sort();
    const convId = `dm_${participants[0]}_${participants[1]}`;

    setDmConversations(prev => {
      if (!prev.find(c => c.id === convId)) {
        return [{ id: convId, participantName: targetUserName, participantEmoji: '👤', lastMessage: 'Начать чат', lastMessageTime: 'Только что', unreadCount: 0, isOnline: true }, ...prev];
      }
      return prev;
    });

    setActiveTab('chats');
    setScreen({ type: 'dm-chat', conversationId: convId });
  };

  if (!authState.isAuthenticated) return <Auth onAuthenticated={() => setAuthState({ isAuthenticated: true, phone: '' })} />;
  if (authState.isAuthenticated && !userProfile) return <Registration onComplete={setUserProfile} />;

  const currentCommunity = screen.type === 'community-hub' ? COMMUNITIES.find(c => c.id === screen.communityId) : undefined;
  const currentDMConversation = screen.type === 'dm-chat' ? dmConversations.find(c => c.id === screen.conversationId) : undefined;

  return (
    <div className="min-h-screen w-full font-sans overflow-hidden bg-black">
      <div className="max-w-md mx-auto h-screen flex flex-col relative shadow-2xl overflow-hidden bg-white">
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            
            {screen.type === 'community-hub' && currentCommunity && (
              <motion.div key="hub" className="h-full">
                <CommunityHub 
                  community={currentCommunity} 
                  messages={messages.filter(m => m.communityId === screen.communityId)} 
                  onBack={() => setScreen({ type: 'tabs' })} 
                  onSendMessage={handleSendCommunityMessage} 
                  onContactSeller={(name) => handleStartDM(`user_${name}`, name)} // Fallback for old mock data
                  onUserClick={(id, name) => setScreen({ type: 'user-profile', targetUserId: id, targetUserName: name })}
                />
              </motion.div>
            )}

            {screen.type === 'user-profile' && (
              <motion.div key="profile" className="h-full">
                <UserProfileScreen 
                  userId={screen.targetUserId} 
                  userName={screen.targetUserName} 
                  onBack={() => setScreen({ type: 'tabs' })} 
                  onWriteMessage={handleStartDM} 
                />
              </motion.div>
            )}

            {screen.type === 'dm-chat' && currentDMConversation && (
              <motion.div key="dm" className="h-full">
                <DMChat 
                  conversation={currentDMConversation} 
                  messages={dmMessages.filter(m => m.conversationId === screen.conversationId).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())} 
                  onBack={() => setScreen({ type: 'tabs' })} 
                  onSendMessage={handleSendDMMessage} 
                />
              </motion.div>
            )}

            {screen.type === 'tabs' && (
              <motion.div key={activeTab} className="h-full">
                {activeTab === 'events' && <EventsFeed profile={userProfile} onUpgradePlan={() => {}} />}
                {activeTab === 'chats' && <DMList conversations={dmConversations} onChatClick={(id) => setScreen({ type: 'dm-chat', conversationId: id })} />}
                {activeTab === 'communities' && <CommunitiesDirectory communities={COMMUNITIES} onCommunityClick={(c) => setScreen({ type: 'community-hub', communityId: c.id })} />}
                {activeTab === 'profile' && <Profile profile={userProfile} onLogout={() => { localStorage.clear(); window.location.reload(); }} onUpgradePlan={() => {}} />}
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
