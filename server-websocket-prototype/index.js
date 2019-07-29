'use strict';

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);


// Constants
const PORT = 3001;
const port = process.env.PORT || PORT;
const HOST = '0.0.0.0';
const clients = [];
let admin = undefined;
let overview = undefined;

app.use(express.json());

app.use((req, res, next) => {
  console.log('expressWS middleware');
  req.testing = 'testing';
  return next();
});


app.get('/', (req, res) => {
  console.log('express connection started, get route: ', req.testing);
  res.send('Hello from Websocker Server\n');
  res.end();
});


// ##### CLIENT HANDLING

app.ws('/', (ws, req) => {
  console.log('root websocket connection waiting for data...');

  if (clients.indexOf(ws) === -1) {
    clients.push(ws);
  }
  ws.on('message', (msg) => {
    console.log('root', msg, 'clients: ', clients.length);
    clients.forEach(c => {
      c.send(msg);
    });
    if (overview) {
      console.log('Sending client msg to overview!', overview);
      overview.send(msg); // pass msg to overview
    }
  });
  ws.on('close', (ws, req) => {
    console.log('closing ws', ws);
    clients.splice(clients.indexOf(ws), 1);
  });
  console.log('socket', req.testing);
});


// ##### ADMIN HANDLING

app.ws('/admin', (ws, req) => {
  console.log('admin websocket connection waiting for data...');
  if (!admin) {
    admin = ws;
  } else {
    ws.send('Admin already declared! You cannot be admin!');
    return;
  }
  ws.on('message', (msg) => {
    console.log('admin', msg);
    admin.send(msg);
    if (overview) {
      console.log('Sending admin msg to overview!', overview);
      overview.send(msg);
    }
  })
  ws.on('close', (ws, req) => {
    console.log('closing admin ws', ws);
    admin = undefined;
  });
});


// ##### OVERVIEW HANDLING

app.ws('/overview', (ws, req) => {
  console.log('overview websocket connection waiting for data...');
  if (!overview) {
    overview = ws;
  } else {
    ws.send('Overview already declared!');
    return;
  }
  overview.on('message', (msg) => {
    console.log('overview', msg);
    overview.send(msg);
  })
  overview.on('close', (ws, req) => {
    console.log('closing overview ws', ws);
    overview = undefined;
  });
});


app.listen(PORT, HOST, () => console.log(`listening on http://${HOST}:${PORT}/`));
console.log('>>>>> Started websocket example');