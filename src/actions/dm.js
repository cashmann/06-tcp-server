'use strict';

const events = require('../lib/events');
const socketPool = require('../lib/socket-pool');

events.on('@dm', (client, message)=>{
  message = message.split(' ');
  var target = message.slice(0,1);
  console.log(target);
  message.splice(0,1);
  var sent;
  socketPool.forEach(onlineClient =>{
    if(onlineClient.nick === `${target}\r\n`){
      onlineClient.socket.write(`<${onlineClient.nick}>: ${message}`);
      sent = true;
    }
  });
  if(!sent) client.socket.write(`Could not find user ${target}`);
});