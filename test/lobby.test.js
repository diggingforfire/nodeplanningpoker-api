'use strict';

var should = require('should');
var sinon = require('sinon');
var Lobby = require('../model/Lobby');
var Room = require('../model/Room');
var Player = require('../model/Player');

describe('Lobby', function () {

    describe('joinRoom', function() {
        /*it('should use an existing room when it was joined before', function() {
            // TODO: implement with rewire, proxyuire or such   
        });*/

        it('should add a room with the given name to the lobby', function() {
            var lobby = new Lobby();
            
            lobby.joinRoom('The chamber of secrets', 'Harry', 1);
            
            lobby.rooms.should.have.property('The chamber of secrets');
        });

        /*
        it('should create a new player', function() {
             // TODO: implement with rewire, proxyuire or such  
             
            var spy = sinon.spy(Player);
            var lobby = new Lobby();
            
            lobby.joinRoom('The chamber of secrets', 'Harry', 1);
            console.log(spy);
            spy.should.not.be.calledWithNew;
        });*/

        it('should call the \'joined\' callback once', function() {
            var spy = sinon.spy();
            var lobby = new Lobby();

            lobby.joinRoom('The chamber of secrets', 'Harry', 1, spy);

            spy.should.be.calledOnce;
        });
    });

    describe('leaveRoom', function() {

        it('should delete the room when the last player has left the room', function() {
            var lobby = new Lobby(Room, Player);
            
            lobby.joinRoom('Batcave', 'Bruce', 1);
            lobby.leaveRoom('Batcave', 'Bruce');

            lobby.rooms.should.not.have.property('Batcave');
        });

        it('should not delete the room when other players still remain in the room', function() {
            var lobby = new Lobby(Room, Player);

            lobby.joinRoom('Batcave', 'Bruce', 1);
            lobby.joinRoom('Batcave', 'Alfred', 2);
            lobby.leaveRoom('Batcave', 'Bruce');

            lobby.rooms.should.have.property('Batcave');
        });

        it('should call the \'left\' callback once', function() {
            var spy = sinon.spy();
            var lobby = new Lobby(Room, Player);

            lobby.joinRoom('The chamber of secrets', 'Harry', 1);
            lobby.leaveRoom('The chamber of secrets', 'Harry', spy);

            spy.should.be.calledOnce;
        });
    });
});