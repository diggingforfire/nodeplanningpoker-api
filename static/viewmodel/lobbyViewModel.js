define(['ko', 'jquery', 'jquery.cookie', 'config'], function(ko, $, $cookie, config) {
    'use strict';

    function LobbyViewModel(socket, roomJoin) {
        var self = this;

        self.name = ko.observable($.cookie(config.nameCookieId));
        self.room = ko.observable($.cookie(config.roomCookieId));

        self.socket = socket;
            
        self.joinRoom = function() {
            self.socket.emit('joinRoom', self.room(), self.name());

            $.cookie(config.nameCookieId, self.name(), {expires: 365});
            $.cookie(config.roomCookieId, self.room(), {expires: 365});


            if (roomJoin) {
                roomJoin();
            }
        };
    }

    return LobbyViewModel;
});