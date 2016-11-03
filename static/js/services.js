app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
      joinRoom: function(roomName, playerName, isObserver) {
        socket.emit('joinRoom', roomName, playerName, isObserver);
      },
      leaveRoom: function() {
        socket.emit('leaveRoom');
      },
      updateRoom: function(callback) {
          socket.on('updateRoom', callback);
      },
      updateRoomList: function(callback) {
          socket.on('updateRoomList', callback);
      },
      updatePlayerList: function(callback) {
          socket.on('updatePlayerList', callback);
      },
      getActiveRooms: function(roomList) {
          socket.emit('getActiveRooms', roomList);
      },
      getActivePlayers: function(room, playerList) {
          socket.emit('getActivePlayers', room, playerList);
      },
      setEstimate: function(value) {
        socket.emit('setEstimate', value);
      },
      toggleCards: function() {
        socket.emit('toggleCards');
      },
      resetHistory: function() {
        socket.emit('resetHistory');
      },
      setNextStory: function(nextStory) {
        socket.emit('nextStory', nextStory);
      },
      getSocketId: function() {
        return socket.id;
      }

  };
});