'use strict';

module.exports = Connection;

function Connection(lobby, socket, io, disconnect) {
    var self = this;

    self.lobby = lobby;
    self.socket = socket;
    self.io = io;

    socket.on('joinRoom', function(roomName, playerName) {
        self.joinRoom(roomName, playerName);
    });

    socket.on('setEstimate', function(estimate) {
        self.setEstimate(estimate);
    });

    socket.on('toggleCards', function() {
        self.toggleCards();
    });

    socket.on('nextStory', function(story) {
        self.nextStory(story);
    });

    socket.on('disconnect', function() {
        self.disconnect(disconnect);
    });
}

Connection.prototype.joinRoom = function(roomName, playerName) {
    var self = this;
    var socket = self.socket;

    console.log('player ' + playerName + ' joined room ' + roomName);

    self.lobby.joinRoom(roomName, playerName, socket.id, function(room, player) {
        socket.join(roomName);
        socket.room = room;
        socket.player = player;
        self.updateRoom(room);
    });
};

Connection.prototype.setEstimate = function(estimate) {
    var self = this;
    var socket = self.socket;

    if (socket.room && socket.player) {

        console.log('player ' + socket.player.name + ' set estimate to ' + estimate);

        socket.player.currentEstimate = estimate;
        self.updateRoom(socket.room);
    }
};

Connection.prototype.toggleCards = function() {
    var self = this;
    var socket = self.socket;

    if (socket.room && socket.player) {
        socket.room.toggleCards();

        console.log('player ' + socket.player.name + ' toggled cards to ' + socket.room.cardsOpened);

        self.updateRoom(socket.room);
    }
};

Connection.prototype.nextStory = function(story) {
    var self = this;
    var socket = self.socket;

    if (socket.room && socket.player) {

        socket.room.currentStory = story;

        console.log('player ' + socket.player.name + ' called next story with subject ' + story);

        self.updateRoom(socket.room);
    }
}

Connection.prototype.disconnect = function(disconnect) {
    var self = this;
    var socket = self.socket;

    if (socket.room && socket.player) {
        console.log('player ' + socket.player.name + ' left room ' + socket.room.name);

        self.lobby.leaveRoom(socket.room.name, socket.player.name, function(room) {
            socket.leave(room.name);
            self.updateRoom(room);
        });
    }

    if (disconnect) {
        disconnect(self);
    }
};

Connection.prototype.updateRoom = function(room) {
    var self = this;
    self.io.sockets.in(room.name).emit('updateRoom', room);
};