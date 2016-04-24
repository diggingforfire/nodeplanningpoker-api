'use strict';

var database = require('./data/database');

var logger = module.exports = {};

logger.log = new Log();
logger.logType = Object.freeze({'debug': 1, 'info': 2, 'warning': 3, 'error': 4})

function Log() {
    var self = this;

    self.write = function(message, type, object, writeToConsole) {

        if (writeToConsole) {
            console.log(message);
        }
        
        database.getServer(function(err, server) {
            if (err) {
                console.warn('Error writing to log: ' + err);
            } else {
                var logEntry = {
                    message: message,
                    type: type,
                    timestamp: new Date(),
                };

                if (object) {
                    logEntry.context = {
                        constructor: object.constructor.name,
                        object: object
                    };
                }

                server.log.insert(logEntry, function(err) {
                    if (err) {
                        console.warn(err.message);
                    }
                });
            }
        });
    };
}