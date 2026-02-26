import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, XIcon, GlobeIcon } from 'lucide-react';
interface TranslationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  translatedText: string;
  language: string;
}
export function TranslationOverlay({
  isOpen,
  onClose,
  originalText,
  translatedText,
  language
}: TranslationOverlayProps) {
  const [status, setStatus] = useState<'loading' | 'translated'>('loading');
  useEffect(() => {
    if (isOpen) {
      setStatus('loading');
      const timer = setTimeout(() => {
        setStatus('translated');
      }, 2000); // 2 seconds of "magic" loading
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  // Typewriter effect logic
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    if (status === 'translated') {
      setDisplayedText('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(translatedText.slice(0, i + 1));
        i++;
        if (i > translatedText.length) clearInterval(interval);
      }, 30); // Typing speed
      return () => clearInterval(interval);
    }
  }, [status, translatedText]);
  return (
    <AnimatePresence>
      {isOpen &&
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" />


          {/* Modal Card */}
          <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
            y: 20
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
            y: 20
          }}
          className="relative w-full max-w-sm bg-[#13131a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl">

            {/* Close Button */}
            <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1c27] text-[#6b6b8a] hover:text-[#f0f0f8] transition-colors z-10">

              <XIcon size={16} />
            </button>

            <div className="p-6 pt-8">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-[#7c5cfc]/10 text-[#7c5cfc]">
                  <GlobeIcon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-[#f0f0f8] font-syne">
                    AI Translation
                  </h3>
                  <p className="text-xs text-[#6b6b8a]">
                    Detecting {language}...
                  </p>
                </div>
              </div>

              {/* Original Text (Dimmed) */}
              <div className="mb-6 p-4 rounded-2xl bg-[#1c1c27] border border-[#2a2a3a] opacity-50">
                <p className="text-[#f0f0f8] text-sm italic font-serif">
                  "{originalText}"
                </p>
              </div>

              {/* Dynamic Content Area */}
              <div className="relative min-h-[100px]">
                {status === 'loading' ?
              <div className="flex flex-col items-center justify-center h-full py-4">
                    {/* Magic Shimmer Effect */}
                    <div className="relative w-full h-16 rounded-xl overflow-hidden bg-[#1c1c27]">
                      <motion.div
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'linear'
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7c5cfc]/20 to-transparent w-1/2 h-full skew-x-12" />

                    </div>
                    <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5
                  }}
                  className="flex items-center gap-2 mt-4 text-[#7c5cfc] text-xs font-bold uppercase tracking-wider">

                      <SparklesIcon size={12} />
                      Translating Magic...
                    </motion.div>
                  </div> :

              <motion.div
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                className="relative">

                    <p className="text-[#f0f0f8] text-lg font-medium leading-relaxed">
                      {displayedText}
                      <motion.span
                    animate={{
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8
                    }}
                    className="inline-block w-0.5 h-5 ml-0.5 bg-[#7c5cfc] align-middle" />

                    </p>

                    <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 1
                  }}
                  className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-[#6b6b8a] italic">

                      <SparklesIcon size={10} className="text-[#00d4aa]" />
                      Translated by NT-AI
                    </motion.div>
                  </motion.div>
              }
              </div>
            </div>

            {/* Bottom Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-[#7c5cfc] via-[#00d4aa] to-[#7c5cfc]" />
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}