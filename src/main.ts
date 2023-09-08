import './style.css';
import './main.css';

import { client } from './tmi';

client.on('message', (_channel, _tags, message) => {
  document.querySelector<HTMLMarqueeElement>('#app marquee')!.innerHTML = message;
  // marquee.innerText = message;
});