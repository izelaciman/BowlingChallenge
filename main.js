if (typeof(bowlingChallange) == 'undefined') {
    var bowlingChallange = {};
}

(function(scope) {


    //Resets Board and Generates new Game.
    var createNewGame = function() {


        var numberOfPlayers = document.getElementById('txtPlayerAmount').value;

        var parsedValue = parseInt(numberOfPlayers, 10);
        if (!isNaN(parsedValue)) {
            if (parsedValue < 1 || parsedValue > 6) {
                alert('Please choose between 1 to 6 players');
                return;
            }
            scope.players = [];
            scope.currentPlayerIndex = 0;
            scope.numberOfPlayers = numberOfPlayers;
            scope.remainingPins = 10;
            scope.animation = document.getElementById('chkAnimation').checked;
            for (var i = 0; i < numberOfPlayers; i++) {
                scope.players.push(new scope.player(i));
            }
            scope.drawScoreBoard();
            scope.updateRollButton();
            scope.drawPinStates();

        } else {
            alert('Please enter a valid integer value');
        }


    }

    //Iniates new Game
    document.getElementById('btnNewGame').onclick = function() {
        createNewGame();

    };

    document.getElementById('chkAnimation').onchange = function() {
            createNewGame();
        }
        //Roll Ball for current player
    document.getElementById('btnRoll').onclick = function() {
        scope.players[scope.currentPlayerIndex].rollBall(scope.rollBallSimulator(scope.remainingPins));
    }

    //AutoStart
    createNewGame();



})(bowlingChallange || {})
