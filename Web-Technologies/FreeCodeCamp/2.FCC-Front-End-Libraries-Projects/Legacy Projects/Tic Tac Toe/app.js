function grid() {

    this.filledCells = 0;

    this.cellElement = document.querySelectorAll('.cell');
    this.highlightWinning = function(ElementOne, ElementTwo, ElementThree){
        ElementOne.style.backgroundColor = "red";
        ElementTwo.style.backgroundColor = "red";
        ElementThree.style.backgroundColor = "red";

    }
    this.isWinningGrid = function (toMatch) {
        //    1 1 1 
        //    - - -
        //    - - -
        if (this.cellElement[0].textContent === toMatch &&
            this.cellElement[1].textContent === toMatch &&
            this.cellElement[2].textContent === toMatch) {
            // background color of cvells
            this.highlightWinning(this.cellElement[0], this.cellElement[1], this.cellElement[2]);
            return true
        }
        //    - - - 
        //    1 1 1
        //    - - -
        else if (this.cellElement[3].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[5].textContent === toMatch) {
            this.highlightWinning(this.cellElement[3], this.cellElement[4], this.cellElement[5]);

            return true
        }
        //    - - - 
        //    - - -
        //    1 1 1
        else if (this.cellElement[6].textContent === toMatch &&
            this.cellElement[7].textContent === toMatch &&
            this.cellElement[8].textContent === toMatch) {
            this.highlightWinning(this.cellElement[6], this.cellElement[7], this.cellElement[8]);

            return true
        }
        //    1 - - 
        //    1 - -
        //    1 - -
        else if (this.cellElement[0].textContent === toMatch &&
            this.cellElement[3].textContent === toMatch &&
            this.cellElement[6].textContent === toMatch) {
            this.highlightWinning(this.cellElement[0], this.cellElement[3], this.cellElement[6]);

            return true

        }
        //    - 1 - 
        //    - 1 -
        //    - 1 -
        else if (this.cellElement[1].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[7].textContent === toMatch) {
            this.highlightWinning(this.cellElement[1], this.cellElement[4], this.cellElement[7]);
            
            return true
        }
        //    - - 1 
        //    - - 1
        //    - - 1
        else if (this.cellElement[2].textContent === toMatch &&
            this.cellElement[5].textContent === toMatch &&
            this.cellElement[8].textContent === toMatch) {
            this.highlightWinning(this.cellElement[2], this.cellElement[5], this.cellElement[8]);

            return true
        }
        //    1 - - 
        //    - 1 -
        //    - - 1
        else if (this.cellElement[0].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[8].textContent === toMatch) {
            this.highlightWinning(this.cellElement[0], this.cellElement[4], this.cellElement[8]);

            return true
        }
        //    1 - - 
        //    - 1 -
        //    - - 1
        else if (this.cellElement[2].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[6].textContent === toMatch) {
            this.highlightWinning(this.cellElement[2], this.cellElement[4], this.cellElement[6]);

            return true
        }
        else {
            return false;
        }
    }
    //work on removing 
    this.isAdraw = function () {
        var cell = document.querySelectorAll('.cell');
        var filledCells = 0;
        for (var i = 0; i < cell.length; i++) {
            if (cell[i].textContent === "O" || cell[i].textContent === "X") {
                filledCells++;
                if (this.filledCells === 9) {
                    //document.write("reset grid");
                }
            }
        }
    }

    this.removeWinningCells = function () {
      
            var cellElement = document.querySelectorAll('.cell');

            for (var i = 0; i <= cellElement.length - 1; i++) {

                cellElement[i].style.backgroundColor = "transparent";
            }
    }
    this.hardResetGrid = function () {
        var cellElement = document.querySelectorAll('.cell');

        for (var i = 0; i <= cellElement.length - 1; i++) {

            cellElement[i].textContent = "";
        }
    }
    //this.resetGrid();
}


// display UI
function player() {
    this.playerChoice = "";

    this.goesFirst = true;

    this.isAllowedToPress = true;

    this.defaultButtonValue = "";
    // display UI
    this.playerWins = function () {
        display("Player Wins!!! Select X or O to begin a new game");
    }

}


// Display UI
function Computer() {
    //Construct the grid
    var gameGrid = new grid();

    this.enemyChoice = "";

    this.possibleSelection = [];

    this.doesComputerGoFirst = function () {
        var selection = Math.round(Math.random());
        if (selection === 1) {
            return true;
        }
        else {
            return false;
        }

    }
    this.hasComputerPickedLastCell = function () {
        this.enemyPossiblePick();
        // Check whether computer selected last grid place
        var len = this.possibleSelection.length - 1;
        if (len < 0) {
            setTimeout(function () {
                gameGrid.hardResetGrid();
            }, 1500);


        }
        //check length
    }
    this.enemyPossiblePick = function () {
        this.possibleSelection = [];
        var cells = document.querySelectorAll('.cell');
        for (var i = 0; i <= cells.length - 1; i++) {
            if (cells[i].textContent === "") {
                this.possibleSelection.push(i);
            }
        }
    }
    // add more complexity
    this.computerRandomPick = function () {

        // Get the size of the possible selection array
        var len = this.possibleSelection.length - 1;


        if (len >= 0) {

            //Choice an element to pick from it
            var randomGridPick = Math.floor(Math.random() * len);

            var selectedIndex = this.possibleSelection[randomGridPick];

            var cells = document.querySelectorAll('.cell');

            cells[selectedIndex].textContent = this.enemyChoice;
        } else {
            setTimeout(function () {
                // works
                // flash message

                gameGrid.hardResetGrid();
            }, 1500);

            //display message
        }

    }

    // only one that needs changing display UI for win screen
    this.computersTurn = function () {
        var that = this;
        displayTurn("Computer turns");

        setTimeout(function () {

            // Make Enemy pick possible combinations
            that.enemyPossiblePick();

            //Computer picks a random place to pick
            that.computerRandomPick();
            // Check if computer wins
            if (that.hasComputerWin()) {
                // display UI
                display("Computer wins");
                
            }
            // has computer picked the last number
            that.hasComputerPickedLastCell();
            displayTurn("Players turns");
        }, 500);
   
    }

    this.hasComputerWin = function () {
        // Check if computer wins
        if (gameGrid.isWinningGrid(this.enemyChoice)) {
            return true;
        }
        else {
            return false;
        }

    }
}


function game(playerChoice, player, enemy) {

    //game needs a player
    var player = player;

    // store the players choice
    player.playerChoice = playerChoice;

    // create an enemy possibly call it computer
    var enemy = enemy;

    //Construct the grid
    var gameGrid = new grid();

    // make sure grid is empty on start
    //gameGrid.hardResetGrid();
   
    // Check who presses what
    if (player.playerChoice === "X") {
        enemy.enemyChoice = "O";
    }
    else {
        enemy.enemyChoice = "X";
    }

    // work out if computer goes first
    if (enemy.doesComputerGoFirst()) {
        // allow computer to move
        enemy.computersTurn();

    }
    else {
        displayTurn("Players turns");
    }
    // Add a click event to every button
    var cells = document.querySelectorAll('.cell');

    // go over each button and add necessary functions
    for (var i = 0; i <= cells.length - 1; i++) {

        cells[i].addEventListener('click', function () {
            // User is only allowed to push if it is there turn and the buttonn is empty
            if (player.isAllowedToPress && this.textContent === "") {
                // if user still tries to click after game over 
                if (enemy.hasComputerWin()) {
                    player.isAllowedToPress = false;
                }
                // Enemy hasnt won player is allowed to click
                else {

                    // Change Text of Button
                    this.textContent = player.playerChoice;

                    // Chech if player Wins
                    if (gameGrid.isWinningGrid(player.playerChoice)) {

                        player.playerWins();

                    }
                    // if the player hasnt won we need to check for a draw
                    else {
                        //work on remove
                        gameGrid.isAdraw();
                        // Block the player making a move until computer made a move
                        player.isAllowedToPress = false;
                        //put in a time out along with
                        setTimeout(function(){
                            enemy.computersTurn();
                            player.isAllowedToPress = true;
                        }, 1500);
                    }
                }
            }
            if (!player.isAllowedToPress) {

            }
        });
    }
}



function display(text) {
    //winning screen 
    var xS = document.getElementById('x').style.display = 'inline';

    var yS = document.getElementById('y').style.display = 'inline';

    var modal = document.getElementById('modal').style.display = 'block';

    var modalheader = document.querySelector('.modal-header h2');
    modalheader.textContent = text;
    //set timeout 

}
function displayTurn(text) {

    var playerIndicator = document.querySelector('.player-indicator');
    playerIndicator.textContent = text;

}




var gamePlayer = new player();
var enemy = new Computer();


function waitForPlayerSelection() {
    var gameGrid = new grid();
    var xS = document.getElementById('x');
    var yS = document.getElementById('y');
    var modal = document.getElementById('modal');
    // if player presses X run the game as X's
    xS.addEventListener('click', function () {

        this.style.display = 'none';

        yS.style.display = 'none';

        var selectedPlayerChoice = "X";

        modal.style.display = 'none';
        //reset winning sqaures
        gameGrid.removeWinningCells();
        gameGrid.hardResetGrid();
        //feed in game
        game(selectedPlayerChoice, gamePlayer, enemy);

    });
    // if player presses Y run the game as Y's
    yS.addEventListener('click', function () {

        this.style.display = 'none';

        var selectedPlayerChoice = "O";

        xS.style.display = 'none';

        modal.style.display = 'none';
        gameGrid.removeWinningCells();
         gameGrid.hardResetGrid();
        //feed in game
        game(selectedPlayerChoice, gamePlayer, enemy);
       
    });
}
waitForPlayerSelection();

// when reset clicked call game function game
function reset() {
    var resetElement = document.getElementById('reset');

    resetElement.addEventListener('click', function () {

        var xS = document.getElementById('x').style.display = 'inline';

        var yS = document.getElementById('y').style.display = 'inline';

        var modal = document.getElementById('modal').style.display = 'block';
        // get modal header
        var modalheader = document.querySelector('.modal-header h2');
        modalheader.textContent = "Select to be X or O?";

        //game(selectedPlayerChoice, gamePlayer, enemy);
        //hard reset board
    });
}

reset();

