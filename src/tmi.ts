import tmi from 'tmi.js';

// connect tmi client
export const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: 'neolectron',
    password: `oauth:${import.meta.env.VITE_TWITCH_TOKEN}`,
  },
  channels: ['neolectron'],
});
client.connect();