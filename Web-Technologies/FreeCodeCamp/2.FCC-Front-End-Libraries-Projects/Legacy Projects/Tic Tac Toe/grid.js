//experimental
function grid() {

    //this.cells = [];
    this.filledCells = 0;
    

    //work on removing
    this.cellElement = document.querySelectorAll('.cell');
    this.grid = [];
    

    //store setup cells into an array and work with the array
    this.convertToMatrix = function () {

        var cellElement = document.querySelectorAll('.cell');
        
        var rowIndex = -1;
        
        for (var i = 0; i <= cellElement.length - 1; i++) {
            if (i % 3 === 0) {
        
                rowIndex++;
        
                this.grid.push([]);
            }
        
            this.grid[rowIndex].push(cellElement[i].textContent);
        }
    }
    
    this.isWinningGrid = function (toMatch) {
        console.log("what am i matching: " + toMatch);
        //    1 1 1 
        //    - - -
        //    - - -
        if (this.cellElement[0].textContent === toMatch &&
            this.cellElement[1].textContent === toMatch &&
            this.cellElement[2].textContent === toMatch) {
            return true
        }
        //    - - - 
        //    1 1 1
        //    - - -
        else if (this.cellElement[3].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[5].textContent === toMatch) {
            return true
        }
        //    - - - 
        //    - - -
        //    1 1 1
        else if (this.cellElement[6].textContent === toMatch &&
            this.cellElement[7].textContent === toMatch &&
            this.cellElement[8].textContent === toMatch) {
            return true
        }
        //    1 - - 
        //    1 - -
        //    1 - -
        else if (this.cellElement[0].textContent === toMatch &&
            this.cellElement[3].textContent === toMatch &&
            this.cellElement[6].textContent === toMatch) {
            return true

        }
        //    - 1 - 
        //    - 1 -
        //    - 1 -
        else if (this.cellElement[1].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[7].textContent === toMatch) {
            return true
        }
        //    - - 1 
        //    - - 1
        //    - - 1
        else if (this.cellElement[2].textContent === toMatch &&
            this.cellElement[5].textContent === toMatch &&
            this.cellElement[8].textContent === toMatch) {
            return true
        }
        //    1 - - 
        //    - 1 -
        //    - - 1
        else if (this.cellElement[0].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[8].textContent === toMatch) {
            return true
        }
        //    1 - - 
        //    - 1 -
        //    - - 1
        else if (this.cellElement[2].textContent === toMatch &&
            this.cellElement[4].textContent === toMatch &&
            this.cellElement[6].textContent === toMatch) {
            return true
        }
        else {
            return false;
        }
    }
    //faulty logic
    this.isAdraw = function(){
        var cell = document.querySelectorAll('.cell');
        var filledCells = 0;
        for(var i = 0; i < cell.length; i++){
            if(cell[i].textContent === "O" || cell[i].textContent === "X" ){
                filledCells++;
                console.log(filledCells);
                if(this.filledCells === 9){
                    document.write("reset grid");
                }
            }
        }
    }
    this.resetGrid = function () {
        var resetElement = document.getElementById('reset');

        resetElement.addEventListener('click', function(){
            var cellElement = document.querySelectorAll('.cell');
            
            for(var i = 0; i <= cellElement.length -1; i++){
                //console.log(cellElement[0]);    
                cellElement[i].textContent = "";

            }
        });
    }
    this.resetGrid();
    //this.setUpCells(this.cellElement);
}