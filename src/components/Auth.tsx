import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  LoaderIcon } from
'lucide-react';
interface AuthProps {
  onAuthenticated: (userName: string) => void;
}
export function Auth({ onAuthenticated }: AuthProps) {
  const [screen, setScreen] = useState<'login' | 'otp'>('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Format phone number as user types
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setOtp(value);
    setError('');
  };
  const handleSendOtp = () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setScreen('otp');
    }, 1500);
  };
  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      setError('Введите 4-значный код');
      return;
    }
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      // Mock: any 4-digit code works
      const userName = 'Пользователь';
      // Save to localStorage
      localStorage.setItem(
        'nt_chat_user',
        JSON.stringify({
          phone,
          userName,
          isAuthenticated: true
        })
      );
      onAuthenticated(userName);
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {screen === 'login' ?
        <motion.div
          key="login"
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: 20
          }}
          className="w-full max-w-sm">

            {/* Logo */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-4xl">💬</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 font-syne">
                NT Chat
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Ваши сообщества рядом
              </p>
            </div>

            {/* Phone Input Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Номер телефона
              </label>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-4 py-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xl">🇰🇿</span>
                  <span className="text-lg font-semibold text-gray-700">
                    +7
                  </span>
                </div>
                <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="777 123 45 67"
                className="flex-1 px-4 py-4 text-lg font-medium bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400" />

              </div>

              {error &&
            <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
            }

              <button
              onClick={handleSendOtp}
              disabled={isLoading}
              className="w-full py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md">

                {isLoading ?
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1
                }}>

                    <LoaderIcon size={24} />
                  </motion.div> :

              <>
                    Войти
                    <ArrowRightIcon size={20} />
                  </>
              }
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              Нажимая "Войти", вы соглашаетесь с условиями использования
            </p>
          </motion.div> :

        <motion.div
          key="otp"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          className="w-full max-w-sm">

            {/* Back Button */}
            <button
            onClick={() => {
              setScreen('login');
              setOtp('');
              setError('');
            }}
            className="flex items-center gap-2 text-gray-600 mb-8 font-medium">

              <ArrowLeftIcon size={20} />
              Назад
            </button>

            {/* OTP Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <PhoneIcon size={28} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-syne">
                  Введите код
                </h2>
                <p className="text-gray-500 mt-2">
                  Отправили SMS на +7 {phone}
                </p>
              </div>

              <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="• • • •"
              maxLength={4}
              className="w-full px-6 py-5 text-3xl font-bold text-center bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 tracking-[1em] placeholder-gray-300" />


              {error &&
            <p className="text-red-500 text-sm mt-4 text-center font-medium">
                  {error}
                </p>
            }

              <button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length < 4}
              className="w-full mt-6 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md">

                {isLoading ?
              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1
                }}>

                    <LoaderIcon size={24} />
                  </motion.div> :

              <>
                    <CheckCircleIcon size={20} />
                    Подтвердить
                  </>
              }
              </button>

              <button className="w-full mt-4 py-3 text-green-600 font-semibold">
                Отправить код повторно
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}