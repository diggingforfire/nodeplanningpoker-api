'use strict';

module.exports = function Player(name, id, isObserver) {
	var self = this;

	self.name = name;
	self.id = id;
	self.currentEstimate = '';
	self.isObserver = isObserver;
};