'use strict';

var should = require('should');
var Room = require('../model/Room');
var Player = require('../model/Player');

describe('Room', function() {

    describe('addPlayer', function() {
        it('should add a player with the given name to the room', function() {
            var room = new Room('Living room');
            var player = new Player('Mike');

            room.addPlayer(player);

            room.players.should.have.property('Mike');
        });
    });

    describe('removePlayerByName', function() {
        it('should remove the player with the given name from the room', function() {
            var room = new Room('Living room');
            var player = new Player('Rafael');

            room.addPlayer(player);
            room.removePlayerByName('Rafael');

            room.players.should.not.have.property('Rafael');
        });
    });

    describe('toggleCards', function() {
        it('should set cardsOpened to true when false', function() {
            var room = new Room('Living room');
            room.toggleCards();

            room.cardsOpened.should.be.true();
        });
        
        it('should set cardsOpened to false when true', function() {
            var room = new Room('Living room');
            room.cardsOpened = true;

            room.toggleCards();

            room.cardsOpened.should.not.be.true();
        });

        it('should set cardsOpened to the same value when called twice', function() {
            var room = new Room('Living room');
            room.cardsOpened = true;

            room.toggleCards();
            room.toggleCards();

            room.cardsOpened.should.be.true();
        });
    });
});