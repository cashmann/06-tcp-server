'use strict';

const events = require('../lib/events');
const socketPool = require('../lib/socket-pool');

events.on('@all', (client, message)=>{
  socketPool.forEach(onlineClients =>{
    onlineClients.socket.write(`<${client.nick}>: ${message}`);
  });
});