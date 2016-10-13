app.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:5050', {reconnect: true});
  return {
      joinRoom: function(roomName, playerName) {
        socket.emit('joinRoom', roomName, playerName);
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
      getActiveRooms: function(roomList) {
          socket.emit('getActiveRooms', roomList);
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