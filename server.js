import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Отключаем стандартные логи Fastify, чтобы видеть только наши чистые логи WS
const fastify = Fastify({ logger: false }); 
const PORT = 8080;

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
});

fastify.setNotFoundHandler((req, reply) => {
  reply.sendFile('index.html');
});

const messagesDB = {
  community: [],
  dm: []
};

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    const wss = new WebSocketServer({ server: fastify.server });

    // Функция для логирования и рассылки количества онлайн-пользователей
    const broadcastOnlineCount = () => {
      const count = wss.clients.size;
      console.log(`[WS Сервер] 👥 Людей онлайн: ${count}`);
      
      wss.clients.forEach((client) => {
        if (client.readyState === 1) { // WebSocket.OPEN
          client.send(JSON.stringify({ type: 'connections_count', data: count }));
        }
      });
    };

    wss.on('connection', (ws) => {
      console.log('[WS Сервер] 🟢 Подключился новый клиент');
      broadcastOnlineCount();

      // Отправляем текущую историю
      ws.send(JSON.stringify({ type: 'init', data: messagesDB }));

      ws.on('message', (raw) => {
        try {
          const msg = JSON.parse(raw);
          console.log(`\n[WS Сервер] 📩 Получено сообщение:`);
          console.log(msg); // Логируем весь объект, который прислал юзер
          
          if (msg.type === 'new_community_message') {
            messagesDB.community.push(msg.data);
            wss.clients.forEach((client) => {
              if (client.readyState === 1) { 
                client.send(JSON.stringify({ type: 'broadcast_community', data: msg.data }));
              }
            });
          } 
          else if (msg.type === 'new_dm_message') {
            messagesDB.dm.push(msg.data);
            wss.clients.forEach((client) => {
              if (client.readyState === 1) { 
                client.send(JSON.stringify({ type: 'broadcast_dm', data: msg.data }));
              }
            });
          }
        } catch (e) {
          console.error('[WS Сервер] ❌ Ошибка парсинга WS:', e);
        }
      });

      ws.on('close', () => {
        console.log('[WS Сервер] 🔴 Клиент отключился');
        broadcastOnlineCount();
      });
    });

    console.log(`🚀 Сервер запущен: http://0.0.0.0:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
