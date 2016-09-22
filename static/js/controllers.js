app.controller('appCtrl', function($scope, socket) {
    $scope.storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?', '∞', '🍵'];
    
    $scope.lobbyVisible = true;
    $scope.roomVisible = false;
    $scope.roomName = '';

    $scope.nextStory = '';

    $scope.players = {};

    $scope.estimate = -1;

    $scope.joinRoom = function() {
        socket.joinRoom($scope.roomName, $scope.playerName);
        $scope.lobbyVisible = false;
        $scope.roomVisible = true;

        $scope.getPlayers();
    };

    socket.updateRoom(function(room) {
        console.log(room);
        $scope.nextStory = room.currentStory;
        $scope.roomName = room.name;
        $scope.players = room.players;
/*
        var players = $scope.players().filter(function(element) {
            return element.id.indexOf(self.socket.id, element.id.length - self.socket.id.length) !== -1;
        });

        if (players) {
            self.estimate(players[0].currentEstimate);
        }
   */     
    });

    $scope.setEstimate = function(value) {
        socket.setEstimate(value);
        $scope.estimate = value;
    };
    
});
