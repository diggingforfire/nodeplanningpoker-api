'use strict';

define(['ko', 'lobby', 'room', 'io'], function(ko, LobbyViewModel, RoomViewModel, io) {

    function MasterViewModel() {
        var self = this;

        self.socket = io();

        var room = new RoomViewModel(self.socket);
        var lobby = new LobbyViewModel(self.socket, function() {
            self.lobbyVisible(false);
            self.roomVisible(true);
        });
        
        self.room = ko.observable(room);
        self.lobby = ko.observable(lobby);

        self.lobbyVisible = ko.observable(true);
        self.roomVisible = ko.observable(false);
    }

    return MasterViewModel;
});