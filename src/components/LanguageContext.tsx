import React, { useState, createContext, useContext } from 'react';
export type Language = 'ru' | 'kz' | 'en';
export interface Translations {
  // Navigation
  navEvents: string;
  navChats: string;
  navCommunities: string;
  navProfile: string;
  // Events
  eventsTitle: string;
  eventsEmpty: string;
  // Chats
  chatsTitle: string;
  chatsSearch: string;
  chatsEmpty: string;
  // Communities
  feedTitle: string;
  feedSearch: string;
  feedYourCommunities: string;
  feedLiveNow: string;
  // Hub
  hubChat: string;
  hubMarket: string;
  hubServices: string;
  // Chat
  chatInputPlaceholder: string;
  chatMembers: string;
  chatSend: string;
  chatBack: string;
  chatFilterAll: string;
  chatFilterLooking: string;
  chatFilterOffering: string;
  // Auth
  authTitle: string;
  authTagline: string;
  authPhoneLabel: string;
  authPhonePlaceholder: string;
  authLoginBtn: string;
  authOtpTitle: string;
  authOtpSubtitle: string;
  authConfirmBtn: string;
  authResend: string;
  // Profile
  profileTitle: string;
  profileCommunities: string;
  profileMessages: string;
  profileDays: string;
  profileSettings: string;
  profileNotifications: string;
  profileLanguage: string;
  profilePrivacy: string;
  profileLogout: string;
  profileTheme: string;
  profileProStorefront: string;
  profileCreateStore: string;
  profilePromote: string;
  // Badges
  badgeAdmin: string;
  badgeVerifiedSeller: string;
  badgeNeighbor: string;
  // Marketplace
  marketAll: string;
  marketSelling: string;
  marketLooking: string;
  marketFree: string;
  marketContact: string;
  marketEmpty: string;
  // Plans & Upgrades
  planFree: string;
  planStandard: string;
  planPro: string;
  planUpgrade: string;
  planCurrent: string;
  planPopular: string;
  planBestValue: string;
  planPhotos: string;
  planMarketplace: string;
  planPosts: string;
  planUpgradeTitle: string;
  planUpgradeSubtitle: string;
  // Registration
  regTitle: string;
  regUsername: string;
  regBio: string;
  regBioPlaceholder: string;
  regChooseAvatar: string;
  regNext: string;
  regComplete: string;
  // Dashboard
  dashWelcome: string;
  dashCommunities: string;
  dashMessages: string;
  dashListings: string;
  dashCreatePost: string;
  dashAddItem: string;
  // Profile Additions
  profilePhotos: string;
  profilePosts: string;
  profileMarketplace: string;
  profileAddPhoto: string;
  profileAddPost: string;
  profileAddItem: string;
  profileLockedStandard: string;
  profileLockedPro: string;
  profileUpgradePlan: string;
  profilePlanBadge: string;
  perMonth: string;
}
const TRANSLATIONS: Record<Language, Translations> = {
  ru: {
    navEvents: 'События',
    navChats: 'Чаты',
    navCommunities: 'Сообщества',
    navProfile: 'Профиль',
    eventsTitle: 'События',
    eventsEmpty: 'Нет новых событий',
    chatsTitle: 'Чаты',
    chatsSearch: 'Поиск чатов...',
    chatsEmpty: 'Нет активных чатов',
    feedTitle: 'Сообщества',
    feedSearch: 'Поиск сообществ...',
    feedYourCommunities: 'Ваши сообщества',
    feedLiveNow: 'Онлайн',
    hubChat: 'Чат',
    hubMarket: 'Маркет',
    hubServices: 'Услуги',
    chatInputPlaceholder: 'Написать сообщение...',
    chatMembers: 'участников',
    chatSend: 'Отправить',
    chatBack: 'Назад',
    chatFilterAll: 'Все сообщения',
    chatFilterLooking: 'Ищу',
    chatFilterOffering: 'Предлагаю',
    authTitle: 'NT Chat',
    authTagline: 'Общайтесь с соседями и сообществом',
    authPhoneLabel: 'Номер телефона',
    authPhonePlaceholder: '777 123 45 67',
    authLoginBtn: 'Войти',
    authOtpTitle: 'Введите код',
    authOtpSubtitle: 'Код отправлен на',
    authConfirmBtn: 'Подтвердить',
    authResend: 'Отправить код повторно',
    profileTitle: 'Профиль',
    profileCommunities: 'Сообществ',
    profileMessages: 'Сообщений',
    profileDays: 'Дней',
    profileSettings: 'Настройки',
    profileNotifications: 'Уведомления',
    profileLanguage: 'Язык',
    profilePrivacy: 'Конфиденциальность',
    profileLogout: 'Выйти из аккаунта',
    profileTheme: 'Тема',
    profileProStorefront: 'Pro Витрина',
    profileCreateStore: 'Создайте свой онлайн-магазин',
    profilePromote: 'Продвинуть в группу (Комиссия 5%)',
    badgeAdmin: 'Админ',
    badgeVerifiedSeller: 'Продавец ✓',
    badgeNeighbor: 'Сосед',
    marketAll: 'Все',
    marketSelling: 'Продаю',
    marketLooking: 'Ищу',
    marketFree: 'Отдам даром',
    marketContact: 'Связаться',
    marketEmpty: 'Объявлений пока нет',
    planFree: 'Бесплатный',
    planStandard: 'Стандарт',
    planPro: 'Про',
    planUpgrade: 'Улучшить план',
    planCurrent: 'Текущий',
    planPopular: 'Популярный',
    planBestValue: 'Лучшее предложение',
    planPhotos: 'Фото',
    planMarketplace: 'Товары',
    planPosts: 'Посты',
    planUpgradeTitle: 'Выберите план',
    planUpgradeSubtitle: 'Расширьте свои возможности',
    regTitle: 'Регистрация',
    regUsername: 'Имя пользователя',
    regBio: 'О себе',
    regBioPlaceholder: 'Расскажите немного о себе...',
    regChooseAvatar: 'Выберите аватар',
    regNext: 'Далее',
    regComplete: 'Завершить',
    dashWelcome: 'Привет',
    dashCommunities: 'сообществ',
    dashMessages: 'сообщения',
    dashListings: 'объявления',
    dashCreatePost: 'Создать пост',
    dashAddItem: 'Добавить товар',
    profilePhotos: 'Фотографии',
    profilePosts: 'Посты',
    profileMarketplace: 'Мои товары',
    profileAddPhoto: 'Добавить фото',
    profileAddPost: 'Добавить пост',
    profileAddItem: 'Добавить товар',
    profileLockedStandard: 'Доступно в Standard',
    profileLockedPro: 'Доступно в Pro',
    profileUpgradePlan: 'Улучшить план',
    profilePlanBadge: 'План',
    perMonth: '₸/мес'
  },
  kz: {
    navEvents: 'Оқиғалар',
    navChats: 'Чаттар',
    navCommunities: 'Қауымдастықтар',
    navProfile: 'Профиль',
    eventsTitle: 'Оқиғалар',
    eventsEmpty: 'Жаңа оқиғалар жоқ',
    chatsTitle: 'Чаттар',
    chatsSearch: 'Чаттарды іздеу...',
    chatsEmpty: 'Белсенді чаттар жоқ',
    feedTitle: 'Қауымдастықтар',
    feedSearch: 'Қауымдастықтарды іздеу...',
    feedYourCommunities: 'Сіздің қауымдастықтарыңыз',
    feedLiveNow: 'Онлайн',
    hubChat: 'Чат',
    hubMarket: 'Базар',
    hubServices: 'Қызметтер',
    chatInputPlaceholder: 'Хабарлама жазу...',
    chatMembers: 'қатысушы',
    chatSend: 'Жіберу',
    chatBack: 'Артқа',
    chatFilterAll: 'Барлық хабарлар',
    chatFilterLooking: 'Іздеймін',
    chatFilterOffering: 'Ұсынамын',
    authTitle: 'NT Chat',
    authTagline: 'Көршілеріңізбен және қауымдастықпен сөйлесіңіз',
    authPhoneLabel: 'Телефон нөмірі',
    authPhonePlaceholder: '777 123 45 67',
    authLoginBtn: 'Кіру',
    authOtpTitle: 'Кодты енгізіңіз',
    authOtpSubtitle: 'Код жіберілді',
    authConfirmBtn: 'Растау',
    authResend: 'Кодты қайта жіберу',
    profileTitle: 'Профиль',
    profileCommunities: 'Қауымдастық',
    profileMessages: 'Хабарлама',
    profileDays: 'Күн',
    profileSettings: 'Параметрлер',
    profileNotifications: 'Хабарландырулар',
    profileLanguage: 'Тіл',
    profilePrivacy: 'Құпиялылық',
    profileLogout: 'Шығу',
    profileTheme: 'Тақырып',
    profileProStorefront: 'Pro Витрина',
    profileCreateStore: 'Онлайн дүкеніңізді ашыңыз',
    profilePromote: 'Топқа жылжыту (Комиссия 5%)',
    badgeAdmin: 'Әкімші',
    badgeVerifiedSeller: 'Сатушы ✓',
    badgeNeighbor: 'Көрші',
    marketAll: 'Барлығы',
    marketSelling: 'Сатамын',
    marketLooking: 'Іздеймін',
    marketFree: 'Тегін беремін',
    marketContact: 'Байланысу',
    marketEmpty: 'Хабарландырулар жоқ',
    planFree: 'Тегін',
    planStandard: 'Стандарт',
    planPro: 'Про',
    planUpgrade: 'Жоспарды жақсарту',
    planCurrent: 'Ағымдағы',
    planPopular: 'Танымал',
    planBestValue: 'Ең жақсы ұсыныс',
    planPhotos: 'Фото',
    planMarketplace: 'Тауарлар',
    planPosts: 'Посттар',
    planUpgradeTitle: 'Жоспарды таңдаңыз',
    planUpgradeSubtitle: 'Мүмкіндіктеріңізді кеңейтіңіз',
    regTitle: 'Тіркелу',
    regUsername: 'Пайдаланушы аты',
    regBio: 'Өзіңіз туралы',
    regBioPlaceholder: 'Өзіңіз туралы аздап айтып беріңіз...',
    regChooseAvatar: 'Аватарды таңдаңыз',
    regNext: 'Келесі',
    regComplete: 'Аяқтау',
    dashWelcome: 'Сәлем',
    dashCommunities: 'қауымдастық',
    dashMessages: 'хабарлама',
    dashListings: 'хабарландыру',
    dashCreatePost: 'Пост жасау',
    dashAddItem: 'Тауар қосу',
    profilePhotos: 'Фотосуреттер',
    profilePosts: 'Посттар',
    profileMarketplace: 'Менің тауарларым',
    profileAddPhoto: 'Фото қосу',
    profileAddPost: 'Пост қосу',
    profileAddItem: 'Тауар қосу',
    profileLockedStandard: 'Standard-та қолжетімді',
    profileLockedPro: 'Pro-да қолжетімді',
    profileUpgradePlan: 'Жоспарды жақсарту',
    profilePlanBadge: 'Жоспар',
    perMonth: '₸/ай'
  },
  en: {
    navEvents: 'Events',
    navChats: 'Chats',
    navCommunities: 'Hubs',
    navProfile: 'Profile',
    eventsTitle: 'Events',
    eventsEmpty: 'No new events',
    chatsTitle: 'Chats',
    chatsSearch: 'Search chats...',
    chatsEmpty: 'No active chats',
    feedTitle: 'Hubs',
    feedSearch: 'Search hubs...',
    feedYourCommunities: 'Your Hubs',
    feedLiveNow: 'Live',
    hubChat: 'Chat',
    hubMarket: 'Market',
    hubServices: 'Services',
    chatInputPlaceholder: 'Write a message...',
    chatMembers: 'members',
    chatSend: 'Send',
    chatBack: 'Back',
    chatFilterAll: 'All messages',
    chatFilterLooking: 'Looking for',
    chatFilterOffering: 'Offering',
    authTitle: 'NT Chat',
    authTagline: 'Chat with neighbors and your community',
    authPhoneLabel: 'Phone number',
    authPhonePlaceholder: '777 123 45 67',
    authLoginBtn: 'Log in',
    authOtpTitle: 'Enter code',
    authOtpSubtitle: 'Code sent to',
    authConfirmBtn: 'Confirm',
    authResend: 'Resend code',
    profileTitle: 'Profile',
    profileCommunities: 'Communities',
    profileMessages: 'Messages',
    profileDays: 'Days',
    profileSettings: 'Settings',
    profileNotifications: 'Notifications',
    profileLanguage: 'Language',
    profilePrivacy: 'Privacy',
    profileLogout: 'Log out',
    profileTheme: 'Theme',
    profileProStorefront: 'Pro Storefront',
    profileCreateStore: 'Create your online store',
    profilePromote: 'Promote to Group (5% Commission)',
    badgeAdmin: 'Admin',
    badgeVerifiedSeller: 'Seller ✓',
    badgeNeighbor: 'Neighbor',
    marketAll: 'All',
    marketSelling: 'Selling',
    marketLooking: 'Looking',
    marketFree: 'Free',
    marketContact: 'Contact',
    marketEmpty: 'No listings yet',
    planFree: 'Free',
    planStandard: 'Standard',
    planPro: 'Pro',
    planUpgrade: 'Upgrade Plan',
    planCurrent: 'Current',
    planPopular: 'Popular',
    planBestValue: 'Best Value',
    planPhotos: 'Photos',
    planMarketplace: 'Items',
    planPosts: 'Posts',
    planUpgradeTitle: 'Choose a Plan',
    planUpgradeSubtitle: 'Expand your possibilities',
    regTitle: 'Registration',
    regUsername: 'Username',
    regBio: 'Bio',
    regBioPlaceholder: 'Tell us a bit about yourself...',
    regChooseAvatar: 'Choose Avatar',
    regNext: 'Next',
    regComplete: 'Complete',
    dashWelcome: 'Hello',
    dashCommunities: 'communities',
    dashMessages: 'messages',
    dashListings: 'listings',
    dashCreatePost: 'Create Post',
    dashAddItem: 'Add Item',
    profilePhotos: 'Photos',
    profilePosts: 'Posts',
    profileMarketplace: 'My Items',
    profileAddPhoto: 'Add Photo',
    profileAddPost: 'Add Post',
    profileAddItem: 'Add Item',
    profileLockedStandard: 'Available in Standard',
    profileLockedPro: 'Available in Pro',
    profileUpgradePlan: 'Upgrade Plan',
    profilePlanBadge: 'Plan',
    perMonth: '₸/mo'
  }
};
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
// NOTE: Uses React.ReactNode (not named import) so this never breaks
export function LanguageProvider({ children }: {children: React.ReactNode;}) {
  const [language, setLanguageState] = useState<Language>(() => {
    return localStorage.getItem('nt_chat_lang') as Language || 'ru';
  });
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nt_chat_lang', lang);
  };
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language]
      }}>

      {children}
    </LanguageContext.Provider>);

}
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}