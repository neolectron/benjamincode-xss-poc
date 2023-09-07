import './style.css';
import { client } from './tmi';

const marquee = document.querySelector<HTMLMarqueeElement>('#app marquee')!;

client.on('message', (_channel, _tags, message) => {
  marquee.innerHTML = message;
  // marquee.innerText = message;
});