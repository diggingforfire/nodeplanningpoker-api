define(['ko', 'jquery', 'jquery.cookie'], function(ko, $) {
    'use strict';
    
    function LobbyViewModel(socket, roomJoin) {
        var self = this;

        self.name = ko.observable($.cookie('name'));
        self.room = ko.observable($.cookie('room'));

        self.socket = socket;
            
        self.joinRoom = function() {
            self.socket.emit('joinRoom', self.room(), self.name());

            $.cookie('room', self.room(), {expires: 365});
            $.cookie('name', self.name(), {expires: 365});

            if (roomJoin) {
                roomJoin();
            }
        };
    }

    return LobbyViewModel;
});