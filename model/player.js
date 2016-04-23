'use strict';

module.exports = Player;

function Player(name, id) {
    var self = this;

    self.name = name;
    self.id = id;
    self.currentEstimate = '';
}