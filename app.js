'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

var Lobby = require('./model/lobby');
var Connection = require('./model/connection');
var Room = require('./model/room');
var Player = require('./model/player');

var config = require('./config');
var lobby = new Lobby(Room, Player);
var connections = [];

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

http.listen(config.port, function() {
    console.log('running server on port ' + config.port);
});

io.sockets.on('connection', function(socket){

    console.log('new connection in lobby with id ' + socket.id);

    var connection = new Connection(lobby, socket, io, disconnect);
    connections.push(connection);

    logConnectionCount();

    function disconnect() {

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
});