'use strict';

module.exports = function ConnectionHandler(Connection, io, lobby) {

    var connections = [];

    io.sockets.on('connection', function(socket){
        addConnection(socket);
    })

    function addConnection(socket) {

        console.log('new connection in lobby with id ' + socket.id);

        var connection = new Connection(lobby, socket, io, function(connection) {
            removeConnection(socket, connection);
        });

        connections.push(connection);

        logConnectionCount();
    }

    function removeConnection(socket, connection) {

        console.log('connection dropped with id ' + socket.id);

        var index = connections.indexOf(connection);
        if (index > - 1) {
            connections.splice(index, 1);
        }

        logConnectionCount();
    }

    function logConnectionCount() {
        console.log('number of active connections: ' + connections.length);
    }
};