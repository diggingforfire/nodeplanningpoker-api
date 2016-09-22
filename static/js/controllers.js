app.controller('appCtrl', function($scope, socket) {
    $scope.lobbyVisible = true;
    $scope.roomVisible = false;

    $scope.joinRoom = function() {
        socket.joinRoom($scope.roomName, $scope.playerName);
        $scope.lobbyVisible = false;
        $scope.roomVisible = true;
    };
});
