'use strict';

var logger = require('../logger');

module.exports = Connection;

function Connection(lobby, socket, io, disconnect) {
	var self = this;

	self.lobby = lobby;
	self.socket = socket;
	self.io = io;

	socket.on('joinRoom', function (roomName, playerName, isObserver) {
		self.joinRoom(roomName, playerName, isObserver);
	});

	socket.on('setEstimate', function (estimate) {
		self.setEstimate(estimate);
	});

	socket.on('toggleCards', function () {
		self.toggleCards();
	});

	socket.on('resetHistory', function () {
		self.resetHistory();
	});

	socket.on('nextStory', function (story) {
		self.nextStory(story);
	});

	socket.on('disconnect', function () {
		self.disconnect(disconnect);
	});

	socket.on('getPlayers', function () {
		var players = self.getPlayers();
		return players;
	});

	socket.on('getActiveRooms', function () {
		var rooms = self.getActiveRooms();
		return rooms;
	});

	socket.on('getActivePlayers', function (room) {
		var players = self.getActivePlayers(room);
		return players;
	});
}

Connection.prototype.joinRoom = function (roomName, playerName, isObserver) {
	var self = this;
	var socket = self.socket;

	self.lobby.joinRoom(roomName, playerName, socket.id, isObserver, function (room, player) {

		logger.log.write('Player ' + playerName + ' joined room ' + roomName, logger.logType.DEBUG);

		socket.join(roomName);
		socket.room = room;
		socket.player = player;
		self.updateRoom(room);
		self.updateRoomList();
	});
};

Connection.prototype.setEstimate = function (estimate) {
	var self = this;
	var socket = self.socket;

	if (socket.room && socket.player) {

		logger.log.write('Player ' + socket.player.name + ' set estimate to ' + estimate, logger.logType.DEBUG);

		socket.player.currentEstimate = estimate;
		self.updateRoom(socket.room);
	}
};

Connection.prototype.toggleCards = function () {
	var self = this;
	var socket = self.socket;

	if (socket.room && socket.player) {
		socket.room.toggleCards();

		logger.log.write('Player ' + socket.player.name + ' toggled cards to ' + socket.room.cardsOpened, logger.logType.DEBUG, socket.room);

		self.updateRoom(socket.room);
	}
};


Connection.prototype.resetHistory = function () {
	var self = this;
	var socket = self.socket;

	if (socket.room && socket.player) {
		socket.room.resetHistory();

		logger.log.write('Player ' + socket.player.name + ' reset room history ', logger.logType.DEBUG, socket.room);

		self.updateRoom(socket.room);
	}
};


Connection.prototype.nextStory = function (story) {
	var self = this;
	var socket = self.socket;

	if (socket.room && socket.player) {
		socket.room.addStoryToHistory();
		socket.room.currentStory = story;
		socket.room.hideCards();
		socket.room.resetPlayerEstimates();

		logger.log.write('Player ' + socket.player.name + ' called next story with subject ' + story, logger.logType.DEBUG);

		self.updateRoom(socket.room);
	}
}

Connection.prototype.disconnect = function (disconnect) {
	var self = this;
	var socket = self.socket;

	if (socket.room && socket.player) {
		logger.log.write('Player ' + socket.player.name + ' left room ' + socket.room.name, logger.logType.DEBUG);

		self.lobby.leaveRoom(socket.room.name, socket.player.name, function (room) {
			socket.leave(room.name);
			self.updateRoom(room);
		});
	}

	if (disconnect) {
		disconnect(self);
	}
};

Connection.prototype.getPlayers = function () {
	var self = this;
	var socket = self.socket;

	if (socket.room && socket.player) {
		logger.log.write('Player ' + socket.player.name + ' requested all players for room ' + socket.room.name, logger.logType.DEBUG);
		var players = socket.room.getPlayers();
		return players;
	}
}

Connection.prototype.getActiveRooms = function () {
	var self = this;
	self.updateRoomList();
}

Connection.prototype.updateRoomList = function () {
	var self = this;
	var rooms = [];
	for (var key in self.lobby.rooms) {
		if (self.lobby.rooms.hasOwnProperty(key)) {
			rooms[rooms.length] = key;
		}
	}

	self.io.sockets.emit('updateRoomList', rooms);
};

Connection.prototype.getActivePlayers = function (room) {
	var self = this;
	self.updatePlayerList(room);
}

Connection.prototype.updatePlayerList = function (room) {
	var self = this;
	var players = [];
	if (room != undefined && room != null && room != '' && self.lobby.rooms[room] != undefined && self.lobby.rooms[room] != null) {
		for (var key in self.lobby.rooms[room].players) {
			if (self.lobby.rooms[room].players.hasOwnProperty(key)) {
				players[players.length] = { name: key, isObserver: self.lobby.rooms[room].players[key].isObserver };
			}
		}
	}
	self.io.sockets.emit('updatePlayerList', players);
};

Connection.prototype.updateRoom = function (room) {
	var self = this;
	self.io.sockets.in(room.name).emit('updateRoom', room);
};
