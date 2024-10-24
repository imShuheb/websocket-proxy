const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000/ws2');

ws.on('open', () => {
    console.log('Connected to proxied WebSocket server (ws1)');
});

ws.on('message', (message) => {
    console.log('Received:', message);
});

ws.on('close', () => {
    console.log('Connection closed');
});
