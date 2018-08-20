'use strict';

const users = {};

exports.addUser = function(client){
  users[client.id] = client;
  console.log(users);
};

exports.forEach = function (callback){
  Object.values(users)
    .forEach(callback);
};

exports.delete = function(user){
  delete users[user.id];
};