app.controller('appCtrl', function($scope, $cookies, socket) {
    $scope.storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?', '∞', '🍵'];
    
    $scope.lobbyVisible = true;
    $scope.roomVisible = false;
    $scope.cardsVisible = false;
    $scope.storyVisible = false;

    $scope.roomName = $cookies.get("roomName");
    $scope.playerName = $cookies.get("playerName");

    $scope.nextStory = '';
    $scope.nextStoryEntered = '';
    $scope.roomHistroy = '';

    $scope.players = {};

    $scope.estimate = -1;

    $scope.joinRoom = function() {
        socket.joinRoom($scope.roomName, $scope.playerName);
        $cookies.put("roomName", $scope.roomName);
        $cookies.put("playerName", $scope.playerName);
        $scope.lobbyVisible = false;
        $scope.roomVisible = true;
    };

    socket.updateRoom(function(room) {
        $scope.nextStory = room.currentStory;
        $scope.roomName = room.name;
        $scope.players = room.players;
        $scope.cardsVisible = room.cardsOpened;
        $scope.estimate = room.players[ $scope.playerName].currentEstimate;

        $scope.storyVisible = room.currentStory != null && room.currentStory != '';
        
        $scope.roomHistory = '';
        for (var storyKey in room.history) {
            if (room.history.hasOwnProperty(storyKey)) {
                $scope.roomHistory = $scope.roomHistory + "<b>" + storyKey + "</b><br/>";
                for (var playerKey in room.history[storyKey]) {
                    if (room.history[storyKey].hasOwnProperty(playerKey)) {
                        $scope.roomHistory = $scope.roomHistory + "&nbsp;&nbsp;&nbsp;" + room.history[storyKey][playerKey].name + ": " + room.history[storyKey][playerKey].estimate + "</b><br/>";
                    }
                }
                $scope.roomHistory = $scope.roomHistory + "<br/>";
            }
        }

        $scope.$apply();
    });

    $scope.setEstimate = function(value) {
        socket.setEstimate(value);
        $scope.estimate = value;
    };

    $scope.setNextStory = function() {
        socket.setNextStory($scope.nextStoryEntered);
        
    };
    
    $scope.toggleCards = function() {
        socket.toggleCards();
    };

    $scope.resetHistory = function() {
        socket.resetHistory();
    };
});
