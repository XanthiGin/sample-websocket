'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(__dirname));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws) {
  const id = setInterval(function () {
    ws.send(JSON.stringify(process.memoryUsage()), function () {
      //
      // Ignoring errors.
      //
    });
  }, 100);
  console.log('started client interval');

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.listen(443, function () {
  console.log('Listening on http://0.0.0.0:443');
});

// Serve a simple HTML page when visiting http://0.0.0.0:8080
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
