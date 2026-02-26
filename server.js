import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fastify = Fastify({ logger: false }); 
const PORT = 8080;

// Регистрация статики (твоя папка dist)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
});

// SPA fallback: все пути ведут на index.html
fastify.setNotFoundHandler((req, reply) => {
  reply.sendFile('index.html');
});

// Имитация БД (в памяти)
const messagesDB = {
  community: [],
  dm: []
};

/**
 * Логика Heartbeat: предотвращает разрыв соединения на мобильных устройствах.
 */
function heartbeat() {
  this.isAlive = true;
}

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    
    // Создаем WS сервер поверх HTTP сервера Fastify
    const wss = new WebSocketServer({ server: fastify.server });

    /**
     * Рассылка счетчика онлайна всем клиентам
     */
    const broadcastOnlineCount = () => {
      const count = wss.clients.size;
      const payload = JSON.stringify({ type: 'connections_count', data: count });
      
      console.log(`[WS Сервер] 👥 Людей онлайн: ${count}`);
      
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    };

    wss.on('connection', (ws, req) => {
      const ip = req.socket.remoteAddress;
      ws.isAlive = true;
      
      // Настройка для Heartbeat
      ws.on('pong', heartbeat);

      console.log(`[WS Сервер] 🟢 Подключился: ${ip}`);
      broadcastOnlineCount();

      // Сразу отправляем историю сообщений при входе
      ws.send(JSON.stringify({ type: 'init', data: messagesDB }));

      ws.on('message', (raw) => {
        try {
          const msg = JSON.parse(raw);
          
          // Обработка разных типов сообщений
          switch (msg.type) {
            case 'new_community_message':
              messagesDB.community.push(msg.data);
              broadcast(wss, { type: 'broadcast_community', data: msg.data });
              break;
              
            case 'new_dm_message':
              messagesDB.dm.push(msg.data);
              // Пока что рассылаем всем (как в твоем исходнике), 
              // позже сюда можно добавить фильтрацию по ID получателя.
              broadcast(wss, { type: 'broadcast_dm', data: msg.data });
              break;

            default:
              console.warn(`[WS Сервер] ⚠️ Неизвестный тип сообщения: ${msg.type}`);
          }
        } catch (e) {
          console.error('[WS Сервер] ❌ Ошибка парсинга сообщения:', e);
        }
      });

      ws.on('close', (code, reason) => {
        // Код 1001 — уход со страницы, 1006 — обрыв сети/краш
        console.log(`[WS Сервер] 🔴 Клиент ${ip} отключился. Код: ${code}, Причина: ${reason.toString() || 'не указана'}`);
        broadcastOnlineCount();
      });

      ws.on('error', (err) => {
        console.error(`[WS Сервер] 💥 Ошибка сокета (${ip}):`, err.message);
      });
    });

    /**
     * Вспомогательная функция для чистой рассылки
     */
    function broadcast(server, payload) {
      const data = JSON.stringify(payload);
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }

    /**
     * Интервал для проверки "зависших" соединений (каждые 30 секунд).
     * Это критично для iPhone в локальной сети.
     */
    const interval = setInterval(() => {
      wss.clients.forEach((ws) => {
        if (ws.isAlive === false) return ws.terminate();
        
        ws.isAlive = false;
        ws.ping(); // Отправляем ping, ждем pong от клиента
      });
    }, 30000);

    wss.on('close', () => clearInterval(interval));

    console.log(`\n🚀 Сервер для Karim Vildanov запущен:`);
    console.log(`🔗 Локально: http://localhost:${PORT}`);
    console.log(`🔗 В сети:   http://192.168.10.14:${PORT}\n`);

  } catch (err) {
    console.error('Ошибка при запуске:', err);
    process.exit(1);
  }
};

start();
