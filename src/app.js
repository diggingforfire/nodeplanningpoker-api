'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var ConnectionHandler = require('./model/ConnectionHandler');
var Lobby = require('./model/Lobby');

var config = require('./config');
var logger = require('./logger');

var lobby = new Lobby();
var connectionHandler = new ConnectionHandler(io, lobby);

http.listen(config.serverPort, function () {
	logger.log.write('Running server on port ' + config.serverPort, logger.logType.INFO);
});