'use strict';

module.exports = new Config();

function Config() {
    var self = this;

    self.serverPort = 5050;
    self.mongoConnectionString = 'mongodb://192.168.178.100:27017/nodeplanningpoker';
    self.logToConsole = process.argv.indexOf('logToConsole') != -1;
}