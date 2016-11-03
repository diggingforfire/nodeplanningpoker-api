app.controller('appCtrl', function($scope, $sce, $cookies, socket) {
    var snd = new Audio("static/audio/applause.wav");

    $scope.storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100, '?', '∞', '🍵'];

    $scope.lobbyVisible = true;
    $scope.roomVisible = false;
    $scope.cardsVisible = false;
    $scope.storyVisible = false;

    $scope.roomName = $cookies.get("roomName");
    $scope.playerName = $cookies.get("playerName");
    $scope.isObserver = ($cookies.get("isObserver") === undefined || $cookies.get("isObserver") === null || $cookies.get("isObserver") === "false" || $cookies.get("isObserver") === false) ? false : true;

    $scope.nextStory = '';
    $scope.nextStoryEntered = '';
    $scope.roomHistroy = '';

    $scope.players = {};

    $scope.estimate = -1;

    $scope.joinRoom = function() {
        $cookies.put("roomName", $scope.roomName);
        $cookies.put("playerName", $scope.playerName);
        $cookies.put("isObserver", $scope.isObserver);
        socket.joinRoom($scope.roomName, $scope.playerName, $scope.isObserver);
        $scope.lobbyVisible = false;
        $scope.roomVisible = true;
    };

    $scope.leaveRoom = function() {
        socket.leaveRoom();
        $scope.lobbyVisible = true;
        $scope.roomVisible = false;
    };

    $scope.setRoomName = function(value) {
        $scope.roomName = value;
        socket.getActivePlayers($scope.roomName);
    }

    socket.updateRoomList(function(roomList) {
        $scope.roomList = roomList;
        $scope.$apply();
    });

    socket.updatePlayerList(function(playerList) {
        $scope.playerList = playerList;
        $scope.$apply();
    });

    socket.updateRoom(function(room) {
        $scope.nextStory = room.currentStory;
        $scope.roomName = room.name;
        $scope.players = room.players;
        $scope.cardsVisible = room.cardsOpened;

        $scope.storyVisible = room.currentStory != null && room.currentStory != '';

        if ($scope.storyVisible === true && $scope.cardsVisible === true) {
            var estimatesEqual = true;
            var commonVal = '';
            var i = 0;

            if (room.players.length == 0){
                estimatesEqual = false;
            } else {
                for (var playerKey in room.players) {
                    if (room.players.hasOwnProperty(playerKey) && room.players[playerKey].isObserver === false) {
                        if (room.players[playerKey].currentEstimate == null || room.players[playerKey].currentEstimate == '') {
                            estimatesEqual = false;
                            break;
                        }
                        if (i > 0) {
                            if (room.players[playerKey].currentEstimate != commonVal) {
                                estimatesEqual = false;
                                break;
                            }
                        } else {
                            commonVal = room.players[playerKey].currentEstimate;
                        }
                        i++;
                    }
                }
            }
            if (estimatesEqual === true) {
                snd.play();
            }
        }

		$scope.roomHistory = '';
        for (var storyKey in room.history) {
            if (room.history.hasOwnProperty(storyKey)) {
                $scope.roomHistory = $scope.roomHistory + "<span class='history-st-name'>" + storyKey + "</span>";
                for (var playerKey in room.history[storyKey]) {
                    if (room.history[storyKey].hasOwnProperty(playerKey)) {
                        $scope.roomHistory = $scope.roomHistory + "<span class='player'>" + room.history[storyKey][playerKey].name + ": " + room.history[storyKey][playerKey].estimate + "</span>";
                    }
                }
                $scope.roomHistory = $scope.roomHistory;
            }
        }

        if (room.players[$scope.playerName] != undefined && room.players[$scope.playerName] != null && room.players[$scope.playerName].isObserver === false)
            $scope.estimate = room.players[$scope.playerName].currentEstimate;

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

    socket.getActiveRooms();
    socket.getActivePlayers($scope.roomName);

});
