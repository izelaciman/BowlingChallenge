'use strict';

if (typeof(bowlingChallenge) == 'undefined') {
    var bowlingChallenge = {};
}

(function(scope) {


    scope.player = function(index) {
        this.index = index;
        this.frameIndex = 0;
        this.scores = [];


        //Create EmptyScore Array for 10 Frames
        for (var i = 0; i < 10; i++) {
            this.scores.push(new scope.score(i, this.index));
        }
        this.switchToNextPlayer = function() {
            scope.disableRollButtonForAnimation();
            var switchOperations = function() {
                if (scope.currentPlayerIndex + 2 > scope.numberOfPlayers) {
                    scope.currentPlayerIndex = 0;
                } else {
                    scope.currentPlayerIndex++;
                }
                scope.remainingPins = scope.maxNumOfPins;

                scope.updateRollButton();
                scope.drawPinStates();
            };


            if (scope.animation) {
                setTimeout(function() {
                    switchOperations();
                }, 1000);
            } else {
                switchOperations();
            }

        };
        this.getPlayerTotalScore = function() {
            var total = 0;
            for (var i = 0; i < this.scores.length; i++) {
                var intTotal = parseInt(this.scores[i].total());
                if (!isNaN(intTotal)) {
                    total += intTotal;
                }

            }

            return total;
        };
        this.rollBall = function() {

            var rollScore = scope.rollBallSimulator();

            if (typeof(this.scores[this.frameIndex]) === 'undefined') {
                scope.gameEnd = true;
                window.alert('GAME OVER ! Start a new game');
                return;
            }

            if (this.scores[this.frameIndex].firstRoll === null) { // First Roll
                this.scores[this.frameIndex].firstRoll = rollScore;
                scope.remainingPins = scope.maxNumOfPins - rollScore;

                if (rollScore == scope.maxNumOfPins) { //  Check if it's a strike

                    //this.scores[this.frameIndex].secondRoll = 0;
                    this.frameIndex++;
                    this.switchToNextPlayer();
                }
            } else { //Second Roll
                this.scores[this.frameIndex].secondRoll = rollScore;
                scope.remainingPins = scope.remainingPins - rollScore;
                this.frameIndex++;
                this.switchToNextPlayer();
            }

            if (scope.sound) {
                if (rollScore === 0) {
                    document.getElementById('failSound').play();
                } else if (scope.remainingPins === 0) {
                    document.getElementById('cheerSound').play();
                } else {
                    document.getElementById('rollSound').play();
                }
            }
            scope.drawPinStates(rollScore);
            scope.drawScoreBoard();

        };

        return true;
    };

})(bowlingChallenge || {});
