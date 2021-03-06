'use strict';

if (typeof(bowlingChallenge) == 'undefined') {
    var bowlingChallenge = {};
}

(function(scope) {


    //Resets Board and Generates new Game.
    var createNewGame = function() {


        var numberOfPlayers = document.getElementById('txtPlayerAmount').value;

        var parsedValue = parseInt(numberOfPlayers, 10);
        if (!isNaN(parsedValue)) {
            if (parsedValue < 1 || parsedValue > 6) {
                window.alert('Please choose between 1 to 6 players');
                return;
            }
            scope.gameEnd = false;
            scope.players = [];
            scope.currentPlayerIndex = 0;
            scope.numberOfPlayers = numberOfPlayers;
            scope.maxNumOfPins = 10;
            scope.remainingPins = scope.maxNumOfPins;
            scope.animation = document.getElementById('chkAnimation').checked;
            scope.sound = document.getElementById('chkSound').checked;

            //Add Players to players array
            for (var i = 0; i < numberOfPlayers; i++) {
                scope.players.push(new scope.player(i));
            }

            scope.drawScoreBoard();
            scope.updateRollButton();
            scope.drawPinStates();
         

        } else {
            window.alert('Please enter a valid integer value');
        }


    };

    //Initiates new Game
    document.getElementById('btnNewGame').onclick = function() {
        createNewGame();

    };
    //Turn off or on the animation
    document.getElementById('chkAnimation').onchange = function() {
        scope.animation = document.getElementById('chkAnimation').checked;
    };

    //Turn off or on the sound effect
    document.getElementById('chkSound').onchange = function() {
        scope.sound = document.getElementById('chkSound').checked;
    };




    //Roll Ball for current player
    document.getElementById('btnRoll').onclick = function() {
        scope.players[scope.currentPlayerIndex].rollBall();
    };

    //Simulates Entire Game Automaticlly.
    document.getElementById('btnAutoPlay').onclick = function() {
        //turn off animation to prevent async operation to cause race condition in loop.
        document.getElementById('chkAnimation').checked = false;
        document.getElementById('chkSound').checked = false;

        //If game has ended create new game.
        if (scope.gameEnd) {
            createNewGame();
        }

        scope.animation = false;
        scope.sound = false;

        while (!scope.gameEnd) {
            scope.players[scope.currentPlayerIndex].rollBall();
        }
    };

    //AutoStart
    createNewGame();



})(bowlingChallenge || {});
