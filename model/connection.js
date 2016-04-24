'use strict';

var logger = require('../logger');

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

    logger.log.write('Player ' + playerName + ' joined room ' + roomName, logger.logType.debug);

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

        logger.log.write('Player ' + socket.player.name + ' set estimate to ' + estimate, logger.logType.debug);

        socket.player.currentEstimate = estimate;
        self.updateRoom(socket.room);
    }
};

Connection.prototype.toggleCards = function() {
    var self = this;
    var socket = self.socket;

    if (socket.room && socket.player) {
        socket.room.toggleCards();

        logger.log.write('Player ' + socket.player.name + ' toggled cards to ' + socket.room.cardsOpened, logger.logType.debug, socket.room);

        self.updateRoom(socket.room);
    }
};

Connection.prototype.nextStory = function(story) {
    var self = this;
    var socket = self.socket;

    if (socket.room && socket.player) {

        socket.room.currentStory = story;

        logger.log.write('Player ' + socket.player.name + ' called next story with subject ' + story, logger.logType.debug);

        self.updateRoom(socket.room);
    }
}

Connection.prototype.disconnect = function(disconnect) {
    var self = this;
    var socket = self.socket;

    if (socket.room && socket.player) {
        logger.log.write('Player ' + socket.player.name + ' left room ' + socket.room.name, logger.logType.debug);

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