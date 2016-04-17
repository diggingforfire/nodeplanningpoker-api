'use strict';

module.exports = function Connection(lobby, socket, io, disconnect) {

    socket.on('joinRoom', function(roomName, playerName) {

        console.log('player ' + playerName + ' joined room ' + roomName);

        lobby.joinRoom(roomName, playerName, socket.id, function(room, player) {
            socket.join(roomName);
            socket.room = room;
            socket.player = player;
            updateRoom(room);
        });
    });

    socket.on('setEstimate', function(estimate) {
        if (socket.room && socket.player) {

            console.log('player ' + socket.player.name + ' set estimate to ' + estimate);

            socket.player.currentEstimate = estimate;
            updateRoom(socket.room);
        }
    });

    socket.on('toggleCards', function() {
        if (socket.room && socket.player) {
            socket.room.toggleCards();

            console.log('player ' + socket.player.name + ' toggled cards to ' + socket.room.cardsOpened);

            updateRoom(socket.room);
        }
    });

    socket.on('nextStory', function(story) {
        if (socket.room && socket.player) {

            socket.room.currentStory = story;

            console.log('player ' + socket.player.name + ' called next story with subject ' + story);

            updateRoom(socket.room);
        }
    });

    socket.on('disconnect', function() {
        if (socket.room && socket.player) {
            console.log('player ' + socket.player.name + ' left room ' + socket.room.name);

            lobby.leaveRoom(socket.room.name, socket.player.name, function(room) {
                socket.leave(room.name);
                updateRoom(room);
            });
        }

        if (disconnect) {
            disconnect();
        }
    });

    function updateRoom(room) {
        io.sockets.in(room.name).emit('updateRoom', room);
    }
};