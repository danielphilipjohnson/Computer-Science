
var isGameModeStrict = false;
var isGameOn = false;
var isGameStarted = false;
function powerGame() {
    $('#switch').on('change', function () {
        if (isGameOn) {

            
            isGameOn = false;
            $('.strict').prop('disabled', false);
            $('.count').addClass("led-off");
        }
        else {

           $('.count').removeClass("led-off");
            
            isGameOn = true;

        }
    });
}

//how to get running 
// then cancel
function startSimon() {
    var newGame = new Game();
    $('.start').on('click', function () {
        if (!isGameStarted && isGameOn) {
            isGameStarted = true;
            
            newGame.run();
            $('.strict').prop('disabled', true);
        }
        else if(isGameOn) {

            newGame.reset();
            
        }
    });

}

function strictMode() {
    $('.strict').on('click', function () {
        if (isGameModeStrict) {
            isGameModeStrict = false;
             $('#led').addClass("led-on");
        }
        else {
            $('#led').removeClass("led-on");
            isGameModeStrict = true;
        }
    })
}

// starts on button click to start game
function Game() {
    var mySimon = new simon();

    var player = new Player();

    
    this.reset = function () {
            //var that = this;
        
        player.resetTotal();
        player.updateCount("!!");
        mySimon.simonReset();
        mySimon.simonUpdate();
    }
    this.displaySequenceAgain = function () {
        player.resetTotal();

        //display color sequence
        mySimon.displayColorToUser();



    }
    this.run = function () {
        //simon generates a color //stored in its array
        mySimon.generateColour();
        mySimon.displayColorToUser();
        console.log(mySimon.generatedSequence);

        var that = this;

        //player press button 
        var colorButtons = document.querySelectorAll('.color-button');

        // add event to each button
        for (var i = 0; i < colorButtons.length; i++) {

            colorButtons[i].addEventListener('click', function () {

                var playersResponse = this.id;
                //&& maybe ? 
                if (mySimon.letPlayerClick) {

                    if (mySimon.checkPlayersAnswer(player.playerCorrectTotal, playersResponse)) {


                        player.playerCorrectTotal++;
                        if (player.playerCorrectTotal === mySimon.sequenceLength) {

                            //updateCount
                            player.updateCount(mySimon.sequenceLength);

                            //simon generate another color
                            mySimon.generateColour();

                            //display color sequence to user
                            mySimon.displayColorToUser();

                            // reset players guesses 
                            player.resetTotal();



                        }
                        if(player.hasPlayerBeatSimon()){
                            player.updateCount("win");
                            that.reset();
                        }
                    }
                    else {
                        if (isGameModeStrict) {
                            that.reset();
                        }
                        else {
                            player.updateCount("!!");
                            that.displaySequenceAgain();
                        }
                    }
                }
            });
        }
    }
}


function simon() {
    this.sequenceLength = 0;

    this.defaultColors = {
        'green': '#00a74a',
        'red': '#9f0f17',
        'yellow': '#cca707',
        'blue': '#094a8f',

    }
    this.lightColors = {
        'green': '#13ff7c',
        'red': '#ff6c4c',
        'yellow': '#fed94f',
        'blue': '#1c8cff',
    }
    //future button choice single player or multiple
    this.greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    this.redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    this.yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    this.blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

    this.colorAudioSounds = {
        'green': this.greenAudio,
        'red': this.redAudio,
        'yellow': this.greenAudio,
        'blue': this.blueAudio,
    }

    this.generatedSequence = [];

    this.letPlayerClick = false;
    this.enablePlayerClick = function () {
        return this.letPlayerClick = true;
    }
    this.disablePlayerClick = function () {
        return this.letPlayerClick = false;
    }
    //longer the game goes on increase speed
    this.setTimeStep = function (sequenceLength) {
        var tSteps = [1250, 1000, 750, 500];
        if (sequenceLength < 4)
            return tSteps[0];
        if (sequenceLength < 8)
            return tSteps[1];
        if (sequenceLength < 12)
            return tSteps[2];
        return tSteps[3];
    }
    this.simonReset = function () {
    
            this.sequenceLength = 0;
            this.generatedSequence = [];
    }
    this.simonUpdate = function(){
        this.generateColour();
        this.displayColorToUser();
    }
    //color enum
    this.generateColour = function () {
        // is this working
        //var len = this.sequenceLength;
        // change hard coded value of 3
        var randomness = Math.round(Math.random() * 3);

        if (randomness === 0) {
            this.generatedSequence.push('green');
        }
        else if (randomness === 1) {
            this.generatedSequence.push('red');
        }
        else if (randomness === 2) {
            this.generatedSequence.push('yellow');
        }
        else if (randomness === 3) {
            this.generatedSequence.push('blue');
        }

        this.sequenceLength = this.generatedSequence.length;

    }
    this.animateColor = function (colorToHighlight, index, color, animationTime) {

        $('#' + colorToHighlight[index]).animate({
            backgroundColor: this.lightColors[color],
        }, animationTime, function () {
            // Animation complete.
        });

        // back to original
        $('#' + colorToHighlight[index]).animate({
            backgroundColor: this.defaultColors[color],
        }, animationTime, function () {
            // Animation complete.
        });
    }

    this.displayColorToUser = function () {

        this.disablePlayerClick();
        //disable button press
        $('.start').prop('disabled', true);
        var colorsToHighlight = this.generatedSequence;
        console.log(this.generatedSequence);
        var that = this;
        var i = 0;

        var colorGeneration = setInterval(function () {

            if (colorsToHighlight[i] === 'green') {
                that.animateColor(colorsToHighlight, i, 'green', 500);
                that.colorAudioSounds[colorsToHighlight[i]].play();
            }
            else if (colorsToHighlight[i] === 'red') {
                that.animateColor(colorsToHighlight, i, 'red', 500);
                that.colorAudioSounds[colorsToHighlight[i]].play();
            }
            else if (colorsToHighlight[i] === 'yellow') {
                that.animateColor(colorsToHighlight, i, 'yellow', 500);
                that.colorAudioSounds[colorsToHighlight[i]].play();
            }
            else if (colorsToHighlight[i] === 'blue') {
                that.animateColor(colorsToHighlight, i, 'blue', 500);
                that.colorAudioSounds[colorsToHighlight[i]].play();
            }
            if (i === colorsToHighlight.length) {
                that.enablePlayerClick();
                $('.start').prop('disabled', false);
                clearInterval(colorGeneration);
            }
            else {
                i++;
            }

        }, this.setTimeStep(this.sequenceLength));
        
    }
    this.playAudioForCorrectSound = function (color) {
        if (color === 'green') {
            this.colorAudioSounds[color].play();
        }
        else if (color === 'red') {
            this.colorAudioSounds[color].play();

        }
        else if (color === 'yellow') {
            this.colorAudioSounds[color].play();
        }
        else if (color === 'blue') {
            this.colorAudioSounds[color].play();
        }
    }
    //make static and return true
    this.checkPlayersAnswer = function (index, value) {

        if (this.generatedSequence[index] === value) {
            this.playAudioForCorrectSound(value);
            return true;
        }
        else {
            return false;
        }
    }
    
}
function Player() {

    this.isActive = false;

    this.guessedSequence = [];

    this.playerCurrentGuess = 0;

    this.playerCorrectTotal = 0;
    this.resetTotal = function () {
        this.playerCorrectTotal = 0;
    }
    this.updateCount = function (count) {
        $('.count').text(count);
    }
    this.hasPlayerBeatSimon = function(){
        if(this.playerCurrentGuess >= 20){
            return true;
        }
        else {
            return false;
        }
    }
  
}




// power the game 
powerGame();
// StartGame 
startSimon()


// bind strict button 
strictMode();