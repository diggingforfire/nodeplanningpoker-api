app.controller('appCtrl', function($scope, socket) {
    $scope.storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?', '∞', '🍵'];
    
    $scope.lobbyVisible = true;
    $scope.roomVisible = false;

    $scope.estimate = -1;

    $scope.joinRoom = function() {
        socket.joinRoom($scope.roomName, $scope.playerName);
        $scope.lobbyVisible = false;
        $scope.roomVisible = true;
    };

    $scope.setEstimate = function(value) {
        socket.setEstimate(value);
        $scope.estimate = value;
    };
    
});
