'use strict';

const Client = require('./models/client');
const events = require('./lib/events');
const { parser } = require('./lib/parser');
const socketPool = require('./lib/socket-pool');
const actions = require('./actions');

const net = require('net');
const server = net.createServer();

server.on('connection', function(socket){
  const client = new Client(socket);
  socketPool.addUser(client);

  socket.write(`Your client ID is ${client.id}!\r\n`);
  socket.line = '';
  socket.on('data', function(data){
    console.log(data);
    socket.line += data.toString();
    if(!socket.line.endsWith('\r\n')) return;
    console.log(socket.line);
    parser(socket.line, (event, ...args)=>{
      //Emit chat event with current client plus args
      events.emit(event, client, ...args);
    });

    socket.line = '';
  });
  socket.on('error', (err)=>{
    console.error(err);
  });
  socket.on('close', function (){
    delete this;
  });
});



events.on('start', (portFromStartEvent)=>{
  console.log(`Listening on port ${portFromStartEvent}!`);
});



exports.startServer = (port) => {
  server.listen(port, ()=>{
    events.emit('start', port);
  });
};
