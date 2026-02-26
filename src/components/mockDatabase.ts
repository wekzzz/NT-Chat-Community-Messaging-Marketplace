// Mock Database for NT Chat - Working-class community app
// Realistic Kazakh/Russian content for taxi drivers, farmers, neighbors

export type BadgeType = 'Admin' | 'Verified Seller' | 'Neighbor';

export interface Community {
  id: number;
  name: string;
  emoji: string;
  category: string;
  members: number;
  description: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  color: string;
  isLive: boolean;
  autoReplies: string[];
}

export interface Message {
  id: string;
  communityId: number;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isMe: boolean;
  type: 'text' | 'image' | 'video';
  badge?: BadgeType;
}

export interface MarketplaceItem {
  id: string;
  communityId: number;
  title: string;
  price: string;
  category: 'Продаю' | 'Ищу' | 'Отдам даром';
  sellerName: string;
  sellerEmoji: string;
  description: string;
  postedTime: string;
}

export interface DMConversation {
  id: string;
  participantName: string;
  participantEmoji: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface DMMessage {
  id: string;
  conversationId: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isMe: boolean;
}

export interface EventItem {
  id: string;
  type: 'market' | 'trending' | 'system' | 'activity';
  title: string;
  description: string;
  emoji: string;
  communityName?: string;
  time: string;
  color: string;
}

export const COMMUNITIES: Community[] = [
{
  id: 1,
  name: 'Таксисты Города',
  emoji: '🚕',
  category: 'Транспорт',
  members: 1247,
  description: 'Чат для водителей такси. Маршруты, советы, взаимопомощь.',
  lastMessage: 'Кто работает на Алматы-1 сегодня?',
  lastMessageTime: '14:32',
  unreadCount: 3,
  color: 'from-yellow-400 to-amber-500',
  isLive: true,
  autoReplies: [
  'Я сейчас в центре, могу подобрать',
  'Какой маршрут? Уточни адрес',
  'Сегодня пробки на Абая, объезжайте через Розыбакиева',
  'Принял заказ, еду',
  'Спасибо за информацию 👍',
  'Кто знает хорошую автомойку рядом с аэропортом?']

},
{
  id: 2,
  name: 'Рынок: Свежие продукты',
  emoji: '🥕',
  category: 'Торговля',
  members: 892,
  description: 'Фермеры и покупатели. Свежие овощи, фрукты, молочка.',
  lastMessage: 'Мёд натуральный горный, 1500₸/кг 🍯',
  lastMessageTime: '13:15',
  unreadCount: 7,
  color: 'from-green-400 to-emerald-500',
  isLive: true,
  autoReplies: [
  'Есть в наличии, приходите на место 12',
  'Сколько килограмм нужно?',
  'Доставка по городу от 5 кг',
  'Картошка свежая, 150₸/кг, мешок 25 кг',
  'Молоко домашнее, 400₸/литр',
  'Завтра привезу свежие помидоры с теплицы']

},
{
  id: 3,
  name: 'ЖК Светлый: Соседи',
  emoji: '🏠',
  category: 'Соседи',
  members: 234,
  description: 'Жители ЖК Светлый. Объявления, вопросы, взаимопомощь.',
  lastMessage: 'Лифт снова не работает, вызвали мастера',
  lastMessageTime: '12:48',
  unreadCount: 12,
  color: 'from-blue-400 to-sky-500',
  isLive: false,
  autoReplies: [
  'Спасибо за информацию!',
  'Когда починят лифт?',
  'Соседи, тише пожалуйста после 22:00',
  'Кто потерял ключи? Нашла у подъезда',
  'Собрание жильцов в субботу в 11:00',
  'Уборщица приходит по вторникам и пятницам']

},
{
  id: 4,
  name: 'Родители школы №15',
  emoji: '📚',
  category: 'Образование',
  members: 156,
  description: 'Родители учеников школы №15. Новости, мероприятия.',
  lastMessage: 'Собрание в пятницу в 18:00, явка обязательна',
  lastMessageTime: '11:20',
  unreadCount: 2,
  color: 'from-purple-400 to-violet-500',
  isLive: false,
  autoReplies: [
  'Буду на собрании',
  'Мой ребёнок заболел, передайте учителю',
  'Какие учебники нужны для 4 класса?',
  'Спасибо учителям за праздник!',
  'Экскурсия перенесена на следующую неделю',
  'Форма для физкультуры — белая футболка и синие шорты']

},
{
  id: 5,
  name: 'Авторемонт Алматы',
  emoji: '🔧',
  category: 'Авто',
  members: 678,
  description: 'Мастера и автовладельцы. Ремонт, запчасти, советы.',
  lastMessage: 'Ищу хорошего мастера по ходовой части',
  lastMessageTime: '10:05',
  unreadCount: 0,
  color: 'from-slate-400 to-gray-500',
  isLive: true,
  autoReplies: [
  'Могу помочь, пишите в личку',
  'Какая марка машины?',
  'Запчасти есть оригинальные и аналоги',
  'Диагностика бесплатно при ремонте у нас',
  'Масло меняем за 30 минут',
  'Адрес: ул. Жибек Жолы 45, работаем 9-19']

},
{
  id: 6,
  name: 'Спортзал FitLife',
  emoji: '💪',
  category: 'Спорт',
  members: 445,
  description: 'Члены клуба FitLife. Расписание, тренировки, мотивация.',
  lastMessage: 'Завтра групповая тренировка в 7:00 утра!',
  lastMessageTime: '09:30',
  unreadCount: 5,
  color: 'from-orange-400 to-red-500',
  isLive: true,
  autoReplies: [
  'Буду на тренировке!',
  'Какой зал сегодня свободен?',
  'Тренер Максим — лучший 💪',
  'Запись на персональную тренировку открыта',
  'Новое расписание на сайте',
  'Сауна работает до 22:00']

},
{
  id: 7,
  name: 'IT-специалисты КЗ',
  emoji: '💻',
  category: 'Работа',
  members: 2341,
  description: 'Разработчики, дизайнеры, PM. Вакансии и нетворкинг.',
  lastMessage: 'Ищем React-разработчика, удалёнка, 500k₸',
  lastMessageTime: '08:45',
  unreadCount: 18,
  color: 'from-cyan-400 to-blue-500',
  isLive: true,
  autoReplies: [
  'Отправьте резюме на hr@company.kz',
  'Какой стек технологий?',
  'Есть ли испытательный срок?',
  'Удалёнка или офис?',
  'Интересно, напишите подробнее',
  'Мы нанимаем джунов?']

},
{
  id: 8,
  name: 'Мамы в декрете',
  emoji: '👶',
  category: 'Семья',
  members: 387,
  description: 'Поддержка, советы, обмен вещами для малышей.',
  lastMessage: 'Кто знает хорошего педиатра в районе Бостандык?',
  lastMessageTime: '15:10',
  unreadCount: 9,
  color: 'from-pink-400 to-rose-500',
  isLive: false,
  autoReplies: [
  'Доктор Айгуль в клинике Медикер — отличная!',
  'Сколько лет ребёнку?',
  'Отдам коляску в хорошем состоянии',
  'Кружки для малышей есть в ДК Алатау',
  'Совет: закаливание с 3 месяцев',
  'Присоединяйтесь к нашей прогулочной группе!']

},
{
  id: 9,
  name: 'Дачники Алматы',
  emoji: '🌱',
  category: 'Дача',
  members: 523,
  description: 'Садоводы и огородники. Советы, семена, обмен урожаем.',
  lastMessage: 'Помидоры уже краснеют! Делюсь рецептом засолки 🍅',
  lastMessageTime: '16:22',
  unreadCount: 4,
  color: 'from-lime-400 to-green-500',
  isLive: false,
  autoReplies: [
  'Какой сорт помидоров?',
  'Поделитесь рассадой!',
  'Огурцы в этом году хорошие',
  'Как бороться с колорадским жуком?',
  'Продаю саженцы яблони, 1500₸',
  'Приезжайте на обмен в воскресенье']

},
{
  id: 10,
  name: 'Медики Алматы',
  emoji: '🏥',
  category: 'Медицина',
  members: 891,
  description: 'Врачи, медсёстры, фармацевты. Профессиональное сообщество.',
  lastMessage: 'Конференция по кардиологии 15 сентября',
  lastMessageTime: '07:55',
  unreadCount: 1,
  color: 'from-teal-400 to-cyan-500',
  isLive: false,
  autoReplies: [
  'Буду на конференции',
  'Есть ли онлайн-трансляция?',
  'Нужна ли предварительная регистрация?',
  'Какие темы будут рассмотрены?',
  'Спасибо за информацию',
  'Пришлите программу конференции']

}];


export const INITIAL_MESSAGES: Message[] = [
// Community 1: Таксисты
{
  id: 'c1m1',
  communityId: 1,
  text: 'Всем привет! Кто работает сегодня на ночную смену?',
  senderId: 'arman',
  senderName: 'Арман',
  isMe: false,
  timestamp: new Date(Date.now() - 3600000),
  type: 'text',
  badge: 'Admin'
},
{
  id: 'c1m2',
  communityId: 1,
  text: 'Я работаю до 3 ночи, если что',
  senderId: 'damir',
  senderName: 'Дамир',
  isMe: false,
  timestamp: new Date(Date.now() - 3000000),
  type: 'text'
},
{
  id: 'c1m3',
  communityId: 1,
  text: 'Пробки на Аль-Фараби сейчас жуткие, объезжайте',
  senderId: 'sergei',
  senderName: 'Сергей',
  isMe: false,
  timestamp: new Date(Date.now() - 1800000),
  type: 'text'
},
{
  id: 'c1m4',
  communityId: 1,
  text: 'Спасибо за предупреждение 🙏',
  senderId: 'me',
  senderName: 'Вы',
  isMe: true,
  timestamp: new Date(Date.now() - 1200000),
  type: 'text'
},
{
  id: 'c1m5',
  communityId: 1,
  text: 'Кто знает где сейчас меньше всего машин?',
  senderId: 'arman',
  senderName: 'Арман',
  isMe: false,
  timestamp: new Date(Date.now() - 600000),
  type: 'text'
},

// Community 2: Рынок
{
  id: 'c2m1',
  communityId: 2,
  text: 'Доброе утро! Сегодня привёз свежую клубнику 🍓 500₸/кг',
  senderId: 'farmer1',
  senderName: 'Нурлан',
  isMe: false,
  timestamp: new Date(Date.now() - 7200000),
  type: 'text',
  badge: 'Verified Seller'
},
{
  id: 'c2m2',
  communityId: 2,
  text: 'Мёд горный натуральный, 1500₸/кг. Место 12 на рынке',
  senderId: 'farmer2',
  senderName: 'Бабушка Роза',
  isMe: false,
  timestamp: new Date(Date.now() - 5400000),
  type: 'text',
  badge: 'Verified Seller'
},
{
  id: 'c2m3',
  communityId: 2,
  text: 'Сколько у вас осталось мёда?',
  senderId: 'me',
  senderName: 'Вы',
  isMe: true,
  timestamp: new Date(Date.now() - 3600000),
  type: 'text'
},
{
  id: 'c2m4',
  communityId: 2,
  text: 'Есть 10 банок по 1 кг. Приходите до 16:00',
  senderId: 'farmer2',
  senderName: 'Бабушка Роза',
  isMe: false,
  timestamp: new Date(Date.now() - 3000000),
  type: 'text',
  badge: 'Verified Seller'
},
{
  id: 'c2m5',
  communityId: 2,
  text: 'Картошка свежая с поля, 150₸/кг, мешок 25 кг — 3000₸',
  senderId: 'farmer3',
  senderName: 'Серик',
  isMe: false,
  timestamp: new Date(Date.now() - 1800000),
  type: 'text'
},

// Community 3: ЖК Светлый
{
  id: 'c3m1',
  communityId: 3,
  text: 'Соседи, лифт в 3 подъезде снова сломался 😤',
  senderId: 'neighbor1',
  senderName: 'Айгуль',
  isMe: false,
  timestamp: new Date(Date.now() - 10800000),
  type: 'text',
  badge: 'Neighbor'
},
{
  id: 'c3m2',
  communityId: 3,
  text: 'Уже вызвала мастера, придёт сегодня после 14:00',
  senderId: 'neighbor2',
  senderName: 'Татьяна',
  isMe: false,
  timestamp: new Date(Date.now() - 9000000),
  type: 'text',
  badge: 'Neighbor'
},
{
  id: 'c3m3',
  communityId: 3,
  text: 'Спасибо Татьяна! Вы всегда помогаете 🙏',
  senderId: 'me',
  senderName: 'Вы',
  isMe: true,
  timestamp: new Date(Date.now() - 7200000),
  type: 'text'
},
{
  id: 'c3m4',
  communityId: 3,
  text: 'Кто-нибудь видел объявление про парковку?',
  senderId: 'neighbor3',
  senderName: 'Иван',
  isMe: false,
  timestamp: new Date(Date.now() - 3600000),
  type: 'text'
},
{
  id: 'c3m5',
  communityId: 3,
  text: 'Да, новые правила с 1-го числа. Штраф 5000₸',
  senderId: 'neighbor1',
  senderName: 'Айгуль',
  isMe: false,
  timestamp: new Date(Date.now() - 1800000),
  type: 'text',
  badge: 'Neighbor'
},

// Community 4: Родители
{
  id: 'c4m1',
  communityId: 4,
  text: 'Напоминаю: собрание в пятницу в 18:00 в актовом зале',
  senderId: 'teacher',
  senderName: 'Классный руководитель',
  isMe: false,
  timestamp: new Date(Date.now() - 86400000),
  type: 'text',
  badge: 'Admin'
},
{
  id: 'c4m2',
  communityId: 4,
  text: 'Буду, спасибо за напоминание',
  senderId: 'parent1',
  senderName: 'Мама Алины',
  isMe: false,
  timestamp: new Date(Date.now() - 72000000),
  type: 'text'
},
{
  id: 'c4m3',
  communityId: 4,
  text: 'Я тоже приду',
  senderId: 'me',
  senderName: 'Вы',
  isMe: true,
  timestamp: new Date(Date.now() - 43200000),
  type: 'text'
},
{
  id: 'c4m4',
  communityId: 4,
  text: 'Дети, пожалуйста принесите деньги на экскурсию — 2000₸',
  senderId: 'teacher',
  senderName: 'Классный руководитель',
  isMe: false,
  timestamp: new Date(Date.now() - 21600000),
  type: 'text',
  badge: 'Admin'
},
{
  id: 'c4m5',
  communityId: 4,
  text: 'Когда экскурсия?',
  senderId: 'parent2',
  senderName: 'Папа Тимура',
  isMe: false,
  timestamp: new Date(Date.now() - 7200000),
  type: 'text'
},

// Community 5: Авторемонт
{
  id: 'c5m1',
  communityId: 5,
  text: 'Ищу мастера по ходовой части для Toyota Camry 2018',
  senderId: 'user1',
  senderName: 'Болат',
  isMe: false,
  timestamp: new Date(Date.now() - 14400000),
  type: 'text'
},
{
  id: 'c5m2',
  communityId: 5,
  text: 'Я занимаюсь ходовой, пишите в личку. Адрес: Жибек Жолы 45',
  senderId: 'master1',
  senderName: 'Мастер Алексей',
  isMe: false,
  timestamp: new Date(Date.now() - 12600000),
  type: 'text',
  badge: 'Verified Seller'
},
{
  id: 'c5m3',
  communityId: 5,
  text: 'Сколько стоит замена амортизаторов?',
  senderId: 'me',
  senderName: 'Вы',
  isMe: true,
  timestamp: new Date(Date.now() - 10800000),
  type: 'text'
},
{
  id: 'c5m4',
  communityId: 5,
  text: 'Зависит от марки. Оригинал 25-40 тыс, аналог 12-18 тыс',
  senderId: 'master1',
  senderName: 'Мастер Алексей',
  isMe: false,
  timestamp: new Date(Date.now() - 9000000),
  type: 'text',
  badge: 'Verified Seller'
},
{
  id: 'c5m5',
  communityId: 5,
  text: 'Масло поменял у них — всё отлично, рекомендую 👍',
  senderId: 'user2',
  senderName: 'Руслан',
  isMe: false,
  timestamp: new Date(Date.now() - 3600000),
  type: 'text'
}];


export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
{
  id: 'm1_1',
  communityId: 1,
  title: 'Видеорегистратор Xiaomi',
  price: '15,000₸',
  category: 'Продаю',
  sellerName: 'Арман',
  sellerEmoji: '🚕',
  description: 'Почти новый, 2 месяца использования',
  postedTime: '2 ч назад'
},
{
  id: 'm1_2',
  communityId: 1,
  title: 'Коврики для авто',
  price: '8,000₸',
  category: 'Продаю',
  sellerName: 'Дамир',
  sellerEmoji: '🚗',
  description: 'Универсальные, подходят для большинства авто',
  postedTime: '5 ч назад'
},
{
  id: 'm1_3',
  communityId: 1,
  title: 'Ищу напарника для ночных смен',
  price: 'Договорная',
  category: 'Ищу',
  sellerName: 'Сергей',
  sellerEmoji: '👤',
  description: 'Работаю в Яндекс Такси, нужен второй водитель',
  postedTime: '1 д назад'
},
{
  id: 'm2_1',
  communityId: 2,
  title: 'Мёд горный натуральный',
  price: '1,500₸/кг',
  category: 'Продаю',
  sellerName: 'Бабушка Роза',
  sellerEmoji: '🍯',
  description: 'Свежий, с пасеки в горах. Место 12',
  postedTime: 'Сегодня'
},
{
  id: 'm2_2',
  communityId: 2,
  title: 'Картошка свежая',
  price: '150₸/кг',
  category: 'Продаю',
  sellerName: 'Серик',
  sellerEmoji: '🥔',
  description: 'Мешок 25 кг — 3000₸. Доставка от 50 кг',
  postedTime: 'Сегодня'
},
{
  id: 'm2_3',
  communityId: 2,
  title: 'Ищу домашнее молоко',
  price: 'до 500₸/л',
  category: 'Ищу',
  sellerName: 'Нурлан',
  sellerEmoji: '🥛',
  description: 'Нужно регулярно, 5 литров в неделю',
  postedTime: '3 ч назад'
},
{
  id: 'm2_4',
  communityId: 2,
  title: 'Клубника свежая',
  price: '500₸/кг',
  category: 'Продаю',
  sellerName: 'Нурлан',
  sellerEmoji: '🍓',
  description: 'Сегодня привёз с теплицы, очень сладкая',
  postedTime: 'Утром'
},
{
  id: 'm3_1',
  communityId: 3,
  title: 'Детская коляска',
  price: '25,000₸',
  category: 'Продаю',
  sellerName: 'Айгуль',
  sellerEmoji: '👶',
  description: 'Б/у, хорошее состояние. Самовывоз из подъезда 2',
  postedTime: '1 д назад'
},
{
  id: 'm3_2',
  communityId: 3,
  title: 'Стиральная машина',
  price: 'Отдам даром',
  category: 'Отдам даром',
  sellerName: 'Татьяна',
  sellerEmoji: '🫧',
  description: 'Рабочая, просто купили новую. Самовывоз',
  postedTime: '2 д назад'
},
{
  id: 'm3_3',
  communityId: 3,
  title: 'Ищу репетитора по математике',
  price: 'до 3,000₸/ч',
  category: 'Ищу',
  sellerName: 'Иван',
  sellerEmoji: '📐',
  description: 'Для ребёнка 7 класс, 2 раза в неделю',
  postedTime: '4 ч назад'
},
{
  id: 'm4_1',
  communityId: 4,
  title: 'Учебники 4 класс',
  price: 'Отдам даром',
  category: 'Отдам даром',
  sellerName: 'Мама Алины',
  sellerEmoji: '📚',
  description: 'Полный комплект, хорошее состояние',
  postedTime: '3 д назад'
},
{
  id: 'm4_2',
  communityId: 4,
  title: 'Школьная форма, р.134',
  price: '5,000₸',
  category: 'Продаю',
  sellerName: 'Папа Тимура',
  sellerEmoji: '👔',
  description: 'Носили 1 год, почти новая',
  postedTime: '1 д назад'
},
{
  id: 'm5_1',
  communityId: 5,
  title: 'Амортизаторы Toyota Camry',
  price: '18,000₸',
  category: 'Продаю',
  sellerName: 'Мастер Алексей',
  sellerEmoji: '🔧',
  description: 'Аналог, новые в упаковке, 2 штуки',
  postedTime: '6 ч назад'
},
{
  id: 'm5_2',
  communityId: 5,
  title: 'Ищу б/у двигатель 2JZ',
  price: 'до 150,000₸',
  category: 'Ищу',
  sellerName: 'Болат',
  sellerEmoji: '🚙',
  description: 'Для Toyota Supra, рассмотрю варианты',
  postedTime: '2 д назад'
},
{
  id: 'm5_3',
  communityId: 5,
  title: 'Диски R17 5x114',
  price: '40,000₸',
  category: 'Продаю',
  sellerName: 'Руслан',
  sellerEmoji: '⚙️',
  description: 'Комплект 4 штуки, без резины',
  postedTime: '1 д назад'
}];


export const DM_CONVERSATIONS: DMConversation[] = [
{
  id: 'dm1',
  participantName: 'Арман',
  participantEmoji: '🚕',
  lastMessage: 'Хорошо, договорились!',
  lastMessageTime: '14:20',
  unreadCount: 2,
  isOnline: true
},
{
  id: 'dm2',
  participantName: 'Бабушка Роза',
  participantEmoji: '🍯',
  lastMessage: 'Мёд свежий, приходите',
  lastMessageTime: '12:30',
  unreadCount: 0,
  isOnline: false
},
{
  id: 'dm3',
  participantName: 'Мастер Алексей',
  participantEmoji: '🔧',
  lastMessage: 'Запчасти будут завтра',
  lastMessageTime: '11:45',
  unreadCount: 1,
  isOnline: true
},
{
  id: 'dm4',
  participantName: 'Айгуль',
  participantEmoji: '🏠',
  lastMessage: 'Спасибо за помощь!',
  lastMessageTime: '10:15',
  unreadCount: 0,
  isOnline: false
},
{
  id: 'dm5',
  participantName: 'Нурлан',
  participantEmoji: '🥕',
  lastMessage: 'Клубника закончилась, завтра привезу',
  lastMessageTime: '09:00',
  unreadCount: 3,
  isOnline: true
},
{
  id: 'dm6',
  participantName: 'Татьяна',
  participantEmoji: '🏠',
  lastMessage: 'Собрание перенесли на понедельник',
  lastMessageTime: 'Вчера',
  unreadCount: 0,
  isOnline: false
}];


export const INITIAL_DM_MESSAGES: DMMessage[] = [
{
  id: 'dm1m1',
  conversationId: 'dm1',
  text: 'Привет! Ты сегодня работаешь?',
  senderId: 'arman',
  senderName: 'Арман',
  timestamp: new Date(Date.now() - 7200000),
  isMe: false
},
{
  id: 'dm1m2',
  conversationId: 'dm1',
  text: 'Да, до вечера буду',
  senderId: 'me',
  senderName: 'Вы',
  timestamp: new Date(Date.now() - 6000000),
  isMe: true
},
{
  id: 'dm1m3',
  conversationId: 'dm1',
  text: 'Хорошо, договорились!',
  senderId: 'arman',
  senderName: 'Арман',
  timestamp: new Date(Date.now() - 3600000),
  isMe: false
},
{
  id: 'dm3m1',
  conversationId: 'dm3',
  text: 'Здравствуйте, нужна замена тормозных колодок',
  senderId: 'me',
  senderName: 'Вы',
  timestamp: new Date(Date.now() - 86400000),
  isMe: true
},
{
  id: 'dm3m2',
  conversationId: 'dm3',
  text: 'Какая марка авто?',
  senderId: 'master1',
  senderName: 'Мастер Алексей',
  timestamp: new Date(Date.now() - 82800000),
  isMe: false
},
{
  id: 'dm3m3',
  conversationId: 'dm3',
  text: 'Toyota Camry 2020',
  senderId: 'me',
  senderName: 'Вы',
  timestamp: new Date(Date.now() - 79200000),
  isMe: true
},
{
  id: 'dm3m4',
  conversationId: 'dm3',
  text: 'Запчасти будут завтра',
  senderId: 'master1',
  senderName: 'Мастер Алексей',
  timestamp: new Date(Date.now() - 43200000),
  isMe: false
}];


export const EVENTS: EventItem[] = [
{
  id: 'e1',
  type: 'market',
  title: 'Новое объявление',
  description: 'Видеорегистратор Xiaomi — 15,000₸',
  emoji: '🛒',
  communityName: 'Таксисты Города',
  time: '5 мин назад',
  color: 'from-green-400 to-emerald-500'
},
{
  id: 'e2',
  type: 'trending',
  title: 'Популярное обсуждение',
  description: 'React или Vue для нового проекта?',
  emoji: '🔥',
  communityName: 'IT-специалисты',
  time: '15 мин назад',
  color: 'from-orange-400 to-red-500'
},
{
  id: 'e3',
  type: 'activity',
  title: 'Новое сообщение',
  description: 'Лифт снова не работает, вызвали мастера',
  emoji: '💬',
  communityName: 'ЖК Светлый: Соседи',
  time: '30 мин назад',
  color: 'from-blue-400 to-sky-500'
},
{
  id: 'e4',
  type: 'system',
  title: 'Обновление системы',
  description: 'Добавлены новые функции маркетплейса',
  emoji: '⚡',
  time: '1 ч назад',
  color: 'from-purple-400 to-violet-500'
},
{
  id: 'e5',
  type: 'market',
  title: 'Новое объявление',
  description: 'Мёд горный натуральный — 1,500₸/кг',
  emoji: '🛒',
  communityName: 'Рынок: Свежие продукты',
  time: '2 ч назад',
  color: 'from-green-400 to-emerald-500'
},
{
  id: 'e6',
  type: 'trending',
  title: 'Активное сообщество',
  description: 'Кто идет сегодня на кроссфит?',
  emoji: '🔥',
  communityName: 'Спортзал Алматы',
  time: '3 ч назад',
  color: 'from-orange-400 to-red-500'
},
{
  id: 'e7',
  type: 'activity',
  title: 'Собрание',
  description: 'Собрание в пятницу в 18:00, явка обязательна',
  emoji: '📋',
  communityName: 'Родители школы №15',
  time: '4 ч назад',
  color: 'from-purple-400 to-violet-500'
},
{
  id: 'e8',
  type: 'system',
  title: 'Добро пожаловать!',
  description: 'Вы присоединились к 5 сообществам',
  emoji: '🎉',
  time: '1 д назад',
  color: 'from-pink-400 to-rose-500'
}];


const DM_AUTO_REPLIES: Record<string, string[]> = {
  dm1: ['Ок, буду ждать', 'Понял', 'Давай позже созвонимся', 'Отлично!'],
  dm2: ['Приходите, жду', 'Конечно', 'Спасибо за покупку', 'До свидания'],
  dm3: [
  'Сделаем в лучшем виде',
  'Приезжайте на диагностику',
  'Цена зависит от запчастей',
  'Понял вас'],

  dm4: ['Хорошо', 'Спасибо!', 'До встречи', 'Поняла'],
  dm5: ['Завтра будет свежее', 'Ок', 'Договорились', 'Жду'],
  dm6: ['Передам остальным', 'Хорошо', 'Поняла', 'Спасибо за инфу']
};

export function getCommunityById(id: number): Community | undefined {
  return COMMUNITIES.find((c) => c.id === id);
}

export function getMessagesForCommunity(
communityId: number,
allMessages: Message[])
: Message[] {
  return allMessages.
  filter((m) => m.communityId === communityId).
  sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function getRandomAutoReply(communityId: number): string {
  const community = getCommunityById(communityId);
  if (!community) return 'Понял, спасибо!';
  const replies = community.autoReplies;
  return replies[Math.floor(Math.random() * replies.length)];
}

export function getDMAutoReply(conversationId: string): string {
  const replies = DM_AUTO_REPLIES[conversationId] || ['Ок', 'Понял', 'Хорошо'];
  return replies[Math.floor(Math.random() * replies.length)];
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const AUTO_REPLY_SENDERS = [
{ id: 'user_a', name: 'Алексей' },
{ id: 'user_b', name: 'Марат' },
{ id: 'user_c', name: 'Гульнара' },
{ id: 'user_d', name: 'Асет' },
{ id: 'user_e', name: 'Наталья' }];


export function getRandomSender() {
  return AUTO_REPLY_SENDERS[
  Math.floor(Math.random() * AUTO_REPLY_SENDERS.length)];

}