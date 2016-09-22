app.controller('appCtrl', function($scope, socket) {
    $scope.storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?', '∞', '🍵'];
    
    $scope.lobbyVisible = true;
    $scope.roomVisible = false;
    $scope.cardsVisible = false;

    $scope.roomName = '';

    $scope.nextStory = '';

    $scope.players = {};

    $scope.estimate = -1;

    $scope.joinRoom = function() {
        socket.joinRoom($scope.roomName, $scope.playerName);
        $scope.lobbyVisible = false;
        $scope.roomVisible = true;
    };

    socket.updateRoom(function(room) {
        $scope.nextStory = room.currentStory;
        $scope.roomName = room.name;
        $scope.players = room.players;
        $scope.cardsVisible = room.cardsOpened;

        $scope.$apply();
    });

    $scope.setEstimate = function(value) {
        socket.setEstimate(value);
        $scope.estimate = value;
    };

    $scope.setNextStory = function() {
        socket.setNextStory($scope.nextStory);
    };
    
    $scope.toggleCards = function() {
        socket.toggleCards();
    };
});
