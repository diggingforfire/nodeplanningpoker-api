app.factory('socket', function ($rootScope) {
  var socket = io.connect('localhost'), {reconnect: true});
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