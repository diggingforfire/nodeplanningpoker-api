define(['ko', 'lobby', 'room', 'io', 'config'], function(ko, LobbyViewModel, RoomViewModel, io, config) {
    'use strict';

    function MasterViewModel() {
        var self = this;

        self.socket = io.connect(config.serverUrl, {reconnect: true});
        
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