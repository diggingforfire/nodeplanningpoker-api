'use strict';

var Room = require('./room');
var Player = require('./player');

module.exports = Lobby;

function Lobby() {
    var self = this;

    self.rooms = {};

    self.joinRoom = function(roomName, playerName, playerId, joined) {
        var room = self.rooms[roomName] || new Room(roomName);

        if (!self.rooms.hasOwnProperty(roomName)) {
            self.rooms[roomName] = room;
        }

        var newPlayer = new Player(playerName, playerId);

        room.addPlayer(newPlayer);

        if (joined) {
            joined(room, newPlayer);
        }
    };

    self.leaveRoom = function(roomName, playerName, left) {
        var room = self.rooms[roomName];

        room.removePlayerByName(playerName);

        if (!Object.keys(room.players).length) {
            delete self.rooms[roomName];
        }

        if (left) {
            left(room);
        }
    };
}