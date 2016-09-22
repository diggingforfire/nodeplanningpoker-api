app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:5050', {reconnect: true});
  return {
      joinRoom: function(roomName, playerName) {
        socket.emit('joinRoom', roomName, playerName);
      },
      updateRoom: function(callback) {
          socket.on('updateRoom', callback);
      },
      setEstimate: function(value) {
        socket.emit('setEstimate', value);
      }

  };
});