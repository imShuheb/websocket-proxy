const express = require('express');
const http = require('http');
const { createProxyServer } = require('http-proxy');

const app = express();
const server = http.createServer(app);
const proxy = createProxyServer({ ws: true }); 

app.get('/', (req, res) => {
    res.send('running on port 3000');
});

server.on('upgrade', (req, socket, head) => {
    const pathname = req.url;

    let targetWsUrl;

    if (pathname === '/ws1') {
        targetWsUrl = 'ws://localhost:3001';
    } else if (pathname === '/ws2') {
        targetWsUrl = 'ws://localhost:3002';
    } else if (pathname === '/ws3') {
        targetWsUrl = 'ws://localhost:3003';
    } else {
        socket.destroy();  
        return;
    }

    proxy.ws(req, socket, head, { target: targetWsUrl }, (err) => {
        if (err) {
            console.error(`Proxy error: ${err.message}`);
            socket.destroy();
        }
    });
});

server.listen(3000, () => {
    console.log('WebSocket Proxy server running on port 3000.');
});
