'use strict';

exports.parser = function(line, emitCallback) {
  
  if (line.startsWith('@all')) {
    return emitCallback('@all', line.substring(5));
  }

  if (line.startsWith('@list')) {
    return emitCallback('@list', line.substring(6));
  }

  if(line.startsWith('@nickname')){
    return emitCallback('@nickname', line.substring(10));
  }

  if(line.startsWith('@dm')){
    return emitCallback('@dm',line.substring(4));
  }

  if(line.startsWith('@quit')){
    return emitCallback('@quit', line.substring(6));
  }

  // if line starts with @all, emit @all message
  //if line starts with @dm <name> message
  //  emit @dm with [name, message]
  //if line starts with @nick <name>,
  // emit @nick with [name]
};
