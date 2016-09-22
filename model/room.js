'use strict';

module.exports = Room;

function Room(name) {
    var self = this;

    self.name = name;
    self.cardsOpened = false;
    self.players = {};
    self.currentStory = '';
}

Room.prototype.addPlayer = function(player) {
    var self = this;
    self.players[player.name] = player;
};

Room.prototype.removePlayerByName = function(playerName) {
    var self = this;
    delete self.players[playerName];
};

Room.prototype.toggleCards = function() {
    var self = this;
    self.cardsOpened = !self.cardsOpened;
};

Room.prototype.getPlayers = function() {
    var self = this
    return self.players;
}