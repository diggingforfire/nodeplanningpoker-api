'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var ConnectionHandler = require('./model/connectionHandler');
var Connection = require('./model/connection');
var Lobby = require('./model/lobby');
var Room = require('./model/room');
var Player = require('./model/player');

var config = require('./config');
var lobby = new Lobby(Room, Player);
var connectionHandler = new ConnectionHandler(Connection, io, lobby);

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

http.listen(config.port, function() {
    console.log('running server on port ' + config.port);
});