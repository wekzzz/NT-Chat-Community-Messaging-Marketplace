import { useState, useEffect, useCallback } from 'react';
import { Message, DMMessage } from '../components/mockDatabase';

export function useChatSocket(
  myUserId: string,
  currentConversationId: string | undefined,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setDmMessages: React.Dispatch<React.SetStateAction<DMMessage[]>>,
  setDmConversations: React.Dispatch<React.SetStateAction<any[]>>
) {
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const host = window.location.hostname;
    const socket = new WebSocket(`ws://${host}:8080`);

    socket.onopen = () => console.log('🟢 [WS] Подключено к серверу');

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
          if (response.data.dm.length > 0) {
            setDmMessages(prev => {
              const newMsgs = response.data.dm.filter((newMsg: DMMessage) => !prev.some(m => m.id === newMsg.id));
              return [...prev, ...newMsgs];
            });
          }
        } 
        else if (response.type === 'broadcast_community') {
          setMessages(prev => prev.some(m => m.id === response.data.id) ? prev : [...prev, response.data]);
        }
        else if (response.type === 'broadcast_dm') {
          const newMsg = response.data;
          
          setDmMessages(prev => {
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });

          setDmConversations(prev => {
            const exists = prev.find(c => c.id === newMsg.conversationId);
            const isCurrentChat = currentConversationId === newMsg.conversationId;
            
            if (exists) {
              return prev.map(c => c.id === newMsg.conversationId ? {
                ...c,
                lastMessage: newMsg.text,
                lastMessageTime: 'Только что',
                unreadCount: isCurrentChat ? 0 : (c.unreadCount || 0) + 1
              } : c);
            } else {
              if (newMsg.senderId === myUserId) return prev; 
              return [{
                id: newMsg.conversationId,
                participantName: newMsg.senderName,
                participantEmoji: '👤',
                lastMessage: newMsg.text,
                lastMessageTime: 'Только что',
                unreadCount: isCurrentChat ? 0 : 1,
                isOnline: true
              }, ...prev];
            }
          });
        }
      } catch (e) {
        console.error('[WS] Ошибка парсинга:', e);
      }
    };

    setWs(socket);
    return () => socket.close();
  }, [myUserId, currentConversationId]);

  const sendCommunityMessage = useCallback((msg: Message) => {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'new_community_message', data: msg }));
  }, [ws]);

  const sendDmMessage = useCallback((msg: DMMessage) => {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'new_dm_message', data: msg }));
  }, [ws]);

  return { sendCommunityMessage, sendDmMessage };
}
