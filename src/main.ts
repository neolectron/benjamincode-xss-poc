import './style.css';
import './main.css';

import { client } from './tmi';

client.on('message', (_channel, _tags, message) => {
  const marquee = document.querySelector<HTMLMarqueeElement>('#app marquee')!
  marquee.innerHTML = message;
  // marquee.innerText = message;
});