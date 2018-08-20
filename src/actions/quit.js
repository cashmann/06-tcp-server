'use strict';

const events = require('../lib/events');
const socketPool = require('../lib/socket-pool');

events.on('@quit', (client)=>{
  socketPool.forEach(onlineClient =>{
    if(onlineClient.id === client.id){
      socketPool.delete(onlineClient);
      client.socket.end(`Goodbye ${client.nick}! `);
    }
  });
});