import React, { useState } from 'react';
import { CheckCheckIcon, SparklesIcon } from 'lucide-react';
import { Message } from './mockDatabase';
import { motion, AnimatePresence } from 'framer-motion';
interface MessageBubbleProps {
  message: Message;
  isHighlighted?: boolean;
}
export function MessageBubble({ message, isHighlighted }: MessageBubbleProps) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const handleTranslate = () => {
    if (translatedText) {
      setTranslatedText(null); // Toggle off
      return;
    }
    setIsTranslating(true);
    // Simulate translation delay
    setTimeout(() => {
      setIsTranslating(false);
      // Mock translation logic - just appending [Translated] for demo purposes
      // In a real app, this would call an API
      setTranslatedText(`[Перевод] ${message.text} (AI Translated)`);
    }, 1000);
  };
  const bubbleStyle = isHighlighted ?
  'border-l-4 border-green-400 bg-green-50' :
  '';
  const opacityStyle = isHighlighted === false ? 'opacity-40' : 'opacity-100';
  if (message.isMe) {
    return (
      <div className={`flex justify-end mb-3 ${opacityStyle}`}>
        <div
          className={`max-w-[80%] bg-[#DCF8C6] rounded-2xl rounded-tr-md px-4 py-2.5 shadow-sm ${bubbleStyle}`}>

          <p className="text-[15px] text-gray-900 leading-relaxed break-words">
            {message.text}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-[11px] text-gray-500">
              {formatTime(message.timestamp)}
            </span>
            <CheckCheckIcon size={14} className="text-blue-500" />
          </div>
        </div>
      </div>);

  }
  return (
    <div className={`flex justify-start mb-3 ${opacityStyle}`}>
      <div className="max-w-[80%]">
        <p className="text-xs font-semibold text-green-600 mb-1 ml-1">
          {message.senderName}
        </p>
        <div
          className={`bg-white rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm border border-gray-100 relative overflow-hidden ${bubbleStyle}`}>

          <AnimatePresence mode="wait">
            {isTranslating ?
            <motion.div
              key="loading"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              className="flex items-center gap-2 text-green-600 text-sm py-1">

                <SparklesIcon size={14} className="animate-spin" />
                <span>Переводим...</span>
              </motion.div> :

            <motion.div
              key="content"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}>

                <p className="text-[15px] text-gray-900 leading-relaxed break-words">
                  {translatedText || message.text}
                </p>
                {translatedText &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 5
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className="mt-1 flex items-center gap-1">

                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                      AI Translated
                    </span>
                  </motion.div>
              }
              </motion.div>
            }
          </AnimatePresence>

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-50">
            <button
              onClick={handleTranslate}
              className="flex items-center gap-1 text-[10px] font-medium text-green-600 hover:text-green-700 transition-colors">

              <SparklesIcon size={10} />
              {translatedText ? 'Оригинал' : 'Translate'}
            </button>
            <span className="text-[11px] text-gray-400">
              {formatTime(message.timestamp)}
            </span>
          </div>

          {/* Subtle green glow for translated messages */}
          {translatedText &&
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_10px_rgba(34,197,94,0.1)] rounded-2xl" />
          }
        </div>
      </div>
    </div>);

}