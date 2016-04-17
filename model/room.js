'use strict';

module.exports = function Room(name) {
    var self = this;

    self.name = name;
    self.cardsOpened = false;
    self.players = {};
    self.currentStory = '';

    self.addPlayer = function(player) {
        self.players[player.name] = player;
    };

    self.removePlayerByName = function(playerName) {
        delete self.players[playerName];
    };

    self.toggleCards = function() {
        self.cardsOpened = !self.cardsOpened;
    };
};