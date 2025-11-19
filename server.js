const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { createProxyServer } = require('http-proxy');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Replace with your Aternos server IP and port
const ATERNOS_HOST = ELAboys.aternos.me;
const ATERNOS_PORT = 25565;

wss.on('connection', (wsClient) => {
  const proxy = createProxyServer({
    target: {
      host: ATERNOS_HOST,
      port: ATERNOS_PORT
    },
    ws: true
  });

  wsClient.on('message', (message) => {
    proxy.ws(wsClient, null, null);
  });

  wsClient.on('close', () => {
    proxy.close();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WSS proxy running on port ${PORT}`);
});
