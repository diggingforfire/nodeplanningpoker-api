'use strict';

var Connection = require('./Connection');
var logger = require('../logger');

module.exports = ConnectionHandler;

function ConnectionHandler(io, lobby) {

	var connections = [];

	io.sockets.on('connection', function (socket) {
		addConnection(socket);
	})

	function addConnection(socket) {

		logger.log.write('New connection with id ' + socket.id, logger.logType.DEBUG);

		var disconnect = function (connection) {
			removeConnection(socket, connection);
		};

		var connection = new Connection(lobby, socket, io, disconnect);

		connections.push(connection);

		logConnectionCount();
	}

	function removeConnection(socket, connection) {

		logger.log.write('Connection dropped with id ' + socket.id, logger.logType.DEBUG);

		var index = connections.indexOf(connection);
		if (index > - 1) {
			connections.splice(index, 1);
		}

		logConnectionCount();
	}

	function logConnectionCount() {
		logger.log.write('Number of active connections: ' + connections.length, logger.logType.DEBUG);
	}
};
