const WebSocket = require('ws');

function startWebSocketServer(port) {
    const wss = new WebSocket.Server({ port }, () => {
        console.log(`WebSocket server running on port ${port}`);
    });

    wss.on('connection', (ws) => {
        console.log(`connected to server on port ${port}`);
        ws.send(`Hello on server port ${port}`);

        ws.on('message', (message) => {
            console.log(`Received message on port ${port}: ${message}`);
        });

        ws.on('close', () => {
            console.log(`Connection closed on port ${port}`);
        });
    });
}

startWebSocketServer(3001);
startWebSocketServer(3002);
startWebSocketServer(3003);
