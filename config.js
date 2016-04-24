'use strict';

module.exports = new Config();

function Config() {
    var self = this;

    self.webServerPort = 5050;
    self.mongoConnectionString = 'mongodb://192.168.178.100:27017/nodeplanningpoker';
}