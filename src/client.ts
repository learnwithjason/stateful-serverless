import './styles.css';

import PartySocket from 'partysocket';

declare const PARTYKIT_HOST: string;

// Let's append all the messages we get into this DOM element
const output = document.getElementById('app') as HTMLDivElement;
const button = document.getElementById('increment') as HTMLButtonElement;

// A PartySocket is like a WebSocket, except it's a bit more magical.
// It handles reconnection logic, buffering messages while it's offline, and more.
const conn = new PartySocket({
  host: PARTYKIT_HOST,
  room: 'my-new-room',
});

// You can even start sending messages before the connection is open!
conn.addEventListener('message', (event) => {
  output.innerHTML = event.data;
});

button.addEventListener('click', () => {
  conn.send('increment');
});
