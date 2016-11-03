define([], function() {
    'use strict';

    var config = {};

    config.serverUrl = 'https://nodejs-planning-poker.herokuapp.com:5050';
    config.pointValues = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?', '∞', '🍵'];
    config.nameCookieId = 'name';
    config.roomCookieId = 'room';

    return config;
});
