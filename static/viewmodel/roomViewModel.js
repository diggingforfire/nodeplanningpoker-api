define(['ko', 'config'], function(ko, config) {
    'use strict';
    
    function RoomViewModel(socket) {
        var self = this;

        self.socket = socket;

        self.name = ko.observable();
        self.estimate = ko.observable('');
        self.nextStory = ko.observable('');
        self._players = ko.observable();
        self.players = ko.computed(function() {
            var result = [];

            for (var key in self._players()) {
                if (self._players().hasOwnProperty(key)) {
                    result.push(self._players()[key]);
                }
            }

            return result;
        });

        self.storyPoints = ko.observableArray(config.pointValues.map(function (point) {
            return {
                value: point,
                isSelected: ko.computed(function() {
                    return point === self.estimate();
                })
            };
        }));

        self.setEstimate = function(card) {
            self.socket.emit('setEstimate', card.value);
        };
        
        self.setNextStory = function () {
            self.socket.emit('nextStory', self.nextStory());
        };

        self.toggleCards = function() {
            self.socket.emit('toggleCards');
        };

        self.socket.on('updateRoom', function(room) {

            console.log(room);
            self.nextStory(room.currentStory);
            self.name(room.name);
            self._players(room.players);

            var players = self.players().filter(function(element) {
               return element.id.indexOf(self.socket.id, element.id.length - self.socket.id.length) !== -1;
            });

            if (players) {
                self.estimate(players[0].currentEstimate);
            }

        });
    }

    return RoomViewModel;
});