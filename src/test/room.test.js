'use strict';

var should = require('should');
var Room = require('../model/Room');
var Player = require('../model/Player');

describe('Room', function () {

	describe('addPlayer', function () {
		it('should add a player with the given name to the room', function () {
			var room = new Room('Living room');
			var player = new Player('Mike');

			room.addPlayer(player);

			room.players.should.have.property('Mike');
		});
	});

	describe('removePlayerByName', function () {
		it('should remove the player with the given name from the room', function () {
			var room = new Room('Living room');
			var player = new Player('Rafael');

			room.addPlayer(player);
			room.removePlayerByName('Rafael');

			room.players.should.not.have.property('Rafael');
		});
	});

	describe('resetPlayerEstimates', function () {
		it('should reset the estimate of all players in the room', function () {
			var room = new Room('Room with a view');

			var leo = new Player('Leo');
			leo.currentEstimate = '5';

			var dona = new Player('Dona')
			dona.currentEstimate = '13'

			room.addPlayer(leo);

			room.resetPlayerEstimates();

			leo.currentEstimate.should.equal('')
			dona.currentEstimate.should.equal('13')
		});

		it('should not reset the estimate of observers in the room', function () {
			var room = new Room('Room with a view');

			var leo = new Player('Leo', 5, true);
			leo.currentEstimate = '5';

			var dona = new Player('Dona')
			dona.currentEstimate = '13'

			room.addPlayer(leo);

			room.resetPlayerEstimates();

			leo.currentEstimate.should.equal('5')
			dona.currentEstimate.should.equal('13')
		});
	});

	describe('toggleCards', function () {
		it('should set cardsOpened to true when false', function () {
			var room = new Room('Living room');
			room.toggleCards();

			room.cardsOpened.should.be.true();
		});

		it('should set cardsOpened to false when true', function () {
			var room = new Room('Living room');
			room.cardsOpened = true;

			room.toggleCards();

			room.cardsOpened.should.not.be.true();
		});

		it('should set cardsOpened to the same value when called twice', function () {
			var room = new Room('Living room');
			room.cardsOpened = true;

			room.toggleCards();
			room.toggleCards();

			room.cardsOpened.should.be.true();
		});

		it('should call addStoryToHistory when cards are opened', function () {

		});

		it('should not call addStoryToHistory when cards are closed', function () {

		});
	});

	describe('hideCards', function () {
		it('should set cardsOpened to false when true', function () {
			var room = new Room('My room');

			room.toggleCards();
			room.hideCards();

			room.cardsOpened.should.be.false();
		});

		it('should set cardsOpened to false when false', function () {
			var room = new Room('My room');

			room.hideCards();

			room.cardsOpened.should.be.false();
		});


		it('should set cardsOpened to false when called multiple times', function () {
			var room = new Room('My room');

			room.hideCards();
			room.hideCards();
			room.hideCards();

			room.cardsOpened.should.be.false();
		});
	});

	describe('addStoryToHistory', function () {

	});

	describe('resetHistory', function () {

	});
});