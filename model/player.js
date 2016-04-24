'use strict';

module.exports = function Player(name, id) {
    var self = this;

    self.name = name;
    self.id = id;
    self.currentEstimate = '';
};