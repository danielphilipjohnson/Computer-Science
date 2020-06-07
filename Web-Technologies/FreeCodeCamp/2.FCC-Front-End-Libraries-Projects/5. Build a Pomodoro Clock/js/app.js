/**
 * Free Code camp Javascript Calculator.

 * @module Pomodoro
 * @version 1.0.0
 * @author UndreamtMayhem <undreamtmayhem@gmail.com>
 */

//break button and set value

//possible look
// https://www.bing.com/images/search?view=detailV2&ccid=J1JYfkcZ&id=E955E2638E4F1A3A0DA31B31FCBD4678302151B2&thid=OIP.J1JYfkcZmrtGPwDKTB04FAD6D6&q=Digital+Square+Alarm+Clock&simid=608034261118353976&selectedIndex=15&ajaxhist=0

// Required DOM elements

var clockTimer = document.getElementById('clock-timer');

var breakTimerElem = document.getElementById('break-timer');

var startButton = document.getElementById('start');

var resetButton = document.getElementById('reset');

//Global Timer and break 
var timerRunning = true;

var breakRunning = false;

var pausedTime = 0;

var toggled = false

var reset = false;




/**
 * Display equation and result to UI
 * @module Calculator
 * @method secondsToHms
 * @param {number} d
 * @param {number} displayToUpdate
 * @return {number} Value
 */

function secondsToHms(d, displayToUpdate) {

    d = Number(d);

    var m = Math.floor(d % 3600 / 60);

    var s = Math.floor(d % 3600 % 60);

    displayToUpdate.textContent = "" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}



/**
 * Runs breaktimer
 * @module Calculator
 * @method breakTimer
 * @param {number} breakLength
 */
function breakTimer(breakLength) {
    // repetitive
    var breakLength = (pausedTime === 0 ? breakLength : pausedTime);
    var refreshIntervalId = setInterval(function() {

        secondsToHms(breakLength, breakTimerElem);

        breakLength--;

        if (breakLength < 0) {
            pausedTime = 0;
            clearInterval(refreshIntervalId);

            startButton.innerText = "Start";
            timerRunning = false;

        } else if (breakRunning === false) {

            pausedTime = breakLength;
            clearInterval(refreshIntervalId);

        }
        // doesnt work
        else if (toggled) {
            clearInterval(refreshIntervalId);
            startButton.innerText = "Start Break";
            pausedTime = 0;
        }

    }, 1000);
}


/**
 * ToggleTimer between modes
 * @module Calculator
 * @method toggleTimer
 * @param {number} counter
 * @param {number} breakLength
 * @param {number} start
 */
function toggleTimer(counter, breakLength, start) {
    // if paused is equal to zero then the timer hasnt been paused used the value of the session length

    var counter = (pausedTime === 0 ? counter : pausedTime);

    var breakLength = breakLength;


    function runTimer() {
        secondsToHms(counter, clockTimer);
        secondsToHms(breakLength, breakTimerElem);
        counter--;
        if (counter < 0) {

            clearInterval(refreshIntervalId);

            startButton.innerText = "Stop Break";

            breakRunning = true;

            timerRunning = false;

            pausedTime = 0;
            // maybe run set timeout so there a bit of a break inbetween
            breakTimer(breakLength);

        }
        // replace name with paused
        else if (timerRunning === false) {

            pausedTime = counter;

            clearInterval(refreshIntervalId);

        }
        // sliders toggled stop time
        else if (toggled) {
            console.log("toggle working");
            pausedTime = 0;
            clearInterval(refreshIntervalId);

            startButton.innerText = "Start";
        }
    }
    if (start) {



        var refreshIntervalId = setInterval(function() {
            if (reset) {
                console.log('in reset');
                console.log(pausedTime);
                reset = false;
                pausedTime = 0;
                startButton.textContent = "Stop";
                counter = (pausedTime === 0 ? counter : pausedTime);
                clearInterval(refreshIntervalId);
                runTimer();


            } else {

                runTimer();
            }

        }, 1000);
    }
}



/**
 * Start button onClick
 * @module Calculator
 * @event startButton
 * @param {number} counter
 * @param {number} breakLength
 * @param {number} start
 */
startButton.addEventListener('click', function() {

    // get session length and break length
    var sessionLength = parseInt(document.getElementById('session-length').innerText) * 60;

    var breakLength = parseInt(document.getElementById('break-length').innerText) * 60;


    /**
     * Start button is pressed
     * users isnt on break
     * and toggle is false
     */
    if (this.innerText === "Start") {

        this.innerText = "Stop";

        timerRunning = true;

        breakRunning = false;

        toggled = false;

        toggleTimer(sessionLength, breakLength, timerRunning);
    }
    /**
     * If stop button is pressed
     * stop the timer
     */
    else if (this.innerText === "Stop") {

        timerRunning = false;
        breakRunning = false;

        this.innerText = "Start";
        /**
         * If its time to start break
         * stop the timer
         */
    } else if (this.innerText === "Start Break") {

        timerRunning = false;

        breakRunning = true;

        toggled = false;

        this.innerText = "Stop Break"

        breakTimer(breakLength);
        /**
        * Stop the break
  
    */
    } else if (this.innerText === "Stop Break") {
        timerRunning = false;
        breakRunning = false;
        toggled = false;
        this.innerText = "Start Break"
    }
});


function sliderButtons(minusButton, plusButton, lengthOfTime, displayElem) {
    // requires checks no more than 25 mins no less than zero

    var minusButton = document.getElementById(minusButton);

    var plusButton = document.getElementById(plusButton);


    minusButton.addEventListener('click', function() {
        var valueButton = document.getElementById(lengthOfTime);

        var sessionLength = parseInt(valueButton.innerText);
        console.log(sessionLength);
        if (sessionLength <= 1) {
            valueButton.innerText = 1;
        } else {
            console.log(displayElem);
            sessionLength = sessionLength - 1;

            secondsToHms(sessionLength * 60, displayElem);

            valueButton.innerText = sessionLength;
            pausedTime = 0;
            toggled = true;


        }
    });

    plusButton.addEventListener('click', function() {
        var valueButton = document.getElementById(lengthOfTime);

        var sessionLength = parseInt(valueButton.innerText);
        if (sessionLength >= 25) {
            valueButton.innerText = 25;
        } else {
            console.log(displayElem);
            sessionLength = sessionLength + 1;
            pausedTime = 0;
            console.log(sessionLength);
            valueButton.innerText = sessionLength;
            secondsToHms(sessionLength * 60, displayElem);

            toggled = true

        };

    });
}

sliderButtons('minus-break-session', 'plus-break-session', 'break-length', breakTimerElem);
sliderButtons('minus-session', 'plus-session', 'session-length', clockTimer);






resetButton.addEventListener('click', function() {


    // get session length and break length
    var sessionLength = parseInt(document.getElementById('session-length').innerText) * 60;

    var breakLength = parseInt(document.getElementById('break-length').innerText) * 60;

    //var breakTimer = document.getElementById('break-timer');
    //breakTimer.innerText = document.getElementById('break-length').innerText + ":00";


    //Hit start button run timer 

    // break is false

    // toggle is false user has selected a time
    if (this.innerText === "Reset") {
        var breakLength = parseInt(document.getElementById('break-length').innerText) * 60;
        //how do i put a zero before

        timerRunning = true;

        breakRunning = false;

        toggled = false;
        pausedTime = 0;
        reset = true;
        startButton.innerText = "Start";


        toggleTimer(sessionLength, breakLength, timerRunning);


    }
});