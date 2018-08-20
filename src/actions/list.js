'use strict';

const events = require('../lib/events');
const socketPool = require('../lib/socket-pool');

events.on('@list', (client) =>{
  client.socket.write('Online users: \r\n');
  socketPool.forEach(onlineClient =>{
    console.log(onlineClient);
    client.socket.write(`Nickname: ${onlineClient.nick}UserID: ${onlineClient.id}\r\n`);}
  );
});
