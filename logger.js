'use strict';

var database = require('./data/Database');
var config = require('./config');

var logger = module.exports = {};

logger.log = new Log();
logger.logType = Object.freeze({'DEBUG': 1, 'INFO': 2, 'WARNING': 3, 'ERROR': 4})

function Log() {
    var self = this;

    self.write = function(message, type, object) {

        if (config.logToConsole) {
            console.log(getTimeFormattedMessage(message));
        }

        database.getServer(function(err, server) {
            if (err) {
                console.warn(getTimeFormattedMessage('Error writing to log: ' + err));
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
                        console.warn(getTimeFormattedMessage(err.message));
                    }
                });
            }
        });
    };

    function getTimeFormattedMessage(message) {
        return '[' + new Date().toISOString() +  '] ' + message;
    }
}
