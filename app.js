'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var ConnectionHandler = require('./model/connectionHandler');
var Lobby = require('./model/lobby');

var config = require('./config');
var logger = require('./logger');

var lobby = new Lobby();
var connectionHandler = new ConnectionHandler(io, lobby);

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

http.listen(config.serverPort, function() {
    logger.log.write('Running server on port ' + config.serverPort, logger.logType.INFO);
});
