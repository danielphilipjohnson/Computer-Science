/**
 * Free Code camp Javascript Calculator.

 * @module Calculator
 * @version 1.0.0
 * @author UndreamtMayhem <undreamtmayhem@gmail.com>
 */


/**
 * Display equation and result to UI
 * @module Calculator
 * @method displayUI
 * @return {number} Value
 */
function displayUI(value) {
    var entryBoxx = document.getElementById('entry-box');
    if (value === 'clear') {
        entryBoxx.textContent = '';
    } else {
        entryBoxx.textContent += value;
    }
}



var finalResult = 0.0;

var entryBox = '';
var entryValue = '';
var isAddition = false;
var isSubtract = false;
var isDivide = false;
var isMutliply = false;
var isModulus = false;
var isEqual = false;
var isDecimal = false;


/**
 * Display equation and result to UI
 * @summary connected to operator buttons
 * @module Calculator
 * @method operationClicked
 * @return {number} Value
 */
function operationClicked(value) {
    // add mod to all other operations
    if (value === '+' && entryBox !== '' && entryBox !== '-') {
        if (isAddition === true) {
            calculateAddition();
            isDecimal = false;
        } else {
            // do subtraction then add
            if (isSubtract) {
                calculateSubtraction();
                displayUI("clear");
                displayUI(finalResult + " + ");
                isAddition = true;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // do multiple then add
            else if (isMutliply) {
                calculateMutliply();
                displayUI("clear");
                displayUI(finalResult + " + ");
                isAddition = true;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // do divide then add
            else if (isDivide) {
                calculateDivide();
                displayUI("clear");
                displayUI(finalResult + " + ");
                isAddition = true;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else if (isModulus) {
                calculateMod();
                displayUI("clear");
                displayUI(finalResult + " + ");
                isAddition = true;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else {
                displayUI("clear");
                displayUI(entryBox + " + ");
                //here is all it can go wrong
                finalResult = parseFloat(entryBox);
                entryBox = '';
                isAddition = true;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
        }
    }
    if (value === '-' && entryBox !== '' && entryBox !== '-') {
        if (isSubtract === true) {
            calculateSubtraction();
            isDecimal = false;
        } else {
            // do addition then subtract
            if (isAddition) {
                calculateAddition();
                displayUI("clear");
                displayUI(finalResult + " - ");
                isAddition = false;
                isSubtract = true;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // do multiplying then subtract
            else if (isMutliply) {
                calculateMutliply();
                displayUI("clear");
                displayUI(finalResult + " - ");
                isAddition = false;
                isSubtract = true;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // Do subtract then divide
            else if (isDivide) {
                calculateDivide();
                displayUI("clear");
                displayUI(finalResult + " - ");
                isAddition = false;
                isSubtract = true;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else if (isModulus) {
                calculateMod();
                displayUI("clear");
                displayUI(finalResult + " - ");
                isAddition = false;
                isSubtract = true;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else {
                displayUI("clear");
                displayUI(entryBox + " - ");
                finalResult = parseFloat(entryBox);
                console.log(finalResult);
                entryBox = '';
                isAddition = false;
                isSubtract = true;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
        }

    }
    if (value === '*' && entryBox !== '' && entryBox !== '-') {
        if (isMutliply === true) {
            calculateMutliply();
            isDecimal = false;
        } else {
            // do subtract then multiple
            if (isSubtract) {
                calculateSubtraction();
                displayUI("clear");
                displayUI(finalResult + " * ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = true;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // do add then multiple
            else if (isAddition) {
                calculateAddition();
                displayUI("clear");
                displayUI(finalResult + " * ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = true;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // do divide then multiple
            else if (isDivide) {
                calculateDivide();
                displayUI("clear");
                displayUI(finalResult + " * ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = true;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else if (isModulus) {
                calculateMod();
                displayUI("clear");
                displayUI(finalResult + " * ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = true;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else {
                displayUI("clear");
                displayUI(entryBox + " * ");
                finalResult = parseFloat(entryBox);
                entryBox = '';
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = true;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
        }
    }
    if (value === '/' && entryBox !== '' && entryBox !== '-') {
        if (isDivide === true) {
            console.log("running");
            calculateDivide();
            isDecimal = false;
        } else {
            // do subtract then divide
            if (isSubtract) {
                calculateSubtraction();
                displayUI("clear");
                displayUI(finalResult + " / ");
                isAddition = false;
                isSubtract = false;
                isDivide = true;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // do add then divide
            else if (isAddition) {
                calculateAddition();
                displayUI("clear");
                displayUI(finalResult + " / ");
                isAddition = false;
                isSubtract = false;
                isDivide = true;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
            // do multiply then divide
            else if (isMutliply) {
                console.log("you are a cunt: final result " + finalResult);
                calculateMutliply();
                displayUI("clear");
                displayUI(finalResult + " / ");
                isAddition = false;
                isSubtract = false;
                isDivide = true;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else if (isModulus) {
                calculateMod();
                displayUI("clear");
                displayUI(finalResult + " / ");
                isAddition = false;
                isSubtract = false;
                isDivide = true;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            } else {
                displayUI("clear");
                displayUI(entryBox + " / ");
                finalResult = parseFloat(entryBox);
                entryBox = '';
                isAddition = false;
                isSubtract = false;
                isDivide = true;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = false;
            }
        }
    }
    if (value === '=' && entryBox !== '' && entryBox !== '-') {
        if (isAddition) {
            calculateAddition();
        }
        if (isSubtract) {
            calculateSubtraction();
        }
        if (isMutliply) {
            calculateMutliply();
        }
        if (isDivide) {
            calculateDivide();
        }
        if (isModulus) {
            calculateMod();
        }

        displayUI("clear");
        displayUI(" = " + finalResult);
        isAddition = false;
        isSubtract = false;
        isDivide = false;
        isMutliply = false;
        isEqual = true;
        isDecimal = false;
        isModulus = false;

    }
    if (value === '%' && entryBox !== '' && entryBox !== '-') {
        if (isModulus === true) {
            calculateMod();
            isDecimal = false;
        } else {
            // do subtraction then mod
            if (isSubtract) {
                calculateSubtraction();
                displayUI("clear");
                displayUI(finalResult + " % ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = true;
            }
            // do multiple then mod
            else if (isMutliply) {
                calculateMutliply();
                displayUI("clear");
                displayUI(finalResult + " % ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = true;
            }
            // do divide then mod
            else if (isDivide) {
                calculateDivide();
                displayUI("clear");
                displayUI(finalResult + " % ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = true;
            } else if (isAddition) {
                calculateDivide();
                displayUI("clear");
                displayUI(finalResult + " % ");
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = true;
            } else {
                displayUI("clear");
                displayUI(entryBox + " % ");
                finalResult = parseFloat(entryBox);
                entryBox = '';
                isAddition = false;
                isSubtract = false;
                isDivide = false;
                isMutliply = false;
                isEqual = false;
                isDecimal = false;
                isModulus = true;
            }
        }
    }
    if (value === 'ac') {
        entryBox = '';
        displayUI("clear");
        finalResult = 0.0;
    }
    if (value == '.' && entryBox !== '' && entryBox !== '-') {
        //if in add mode  act differently
        if ((isAddition || isSubtract || isMutliply || isDivide) && isDecimal === false) {
            //display is wrong
            console.log(entryBox);
            console.log(value);
            entryBox += value;
            //extra 1
            console.log(entryBox);
            displayUI(value);
            isDecimal = true;
        } else {
            if (isDecimal === false) {
                console.log("inside entry box")

                entryBox += value;
                console.log(entryBox);
                displayUI('clear');
                displayUI(entryBox);
                //is now a decimeal must press a number
                isDecimal = true;

            }
        }
    }
    if (value === '+/-' && entryBox === '') {
        if (isEqual) {
            displayUI("clear");
            entryBox += '-';
            displayUI(entryBox);
            isEqual = false;
        } else {
            entryBox += '-';
            displayUI(entryBox);
        }
    }
}




// value of buttons
function numberClicked(value) {
    var output = parseFloat(value);

    //condense one line
    function operationCheck() {
        if (isAddition === true || isSubtract === true ||
            isDivide === true || isMutliply === true || isModulus === true) {
            entryBox += value;
            displayUI("" + value);
            return true;
        }
        if (isEqual === true) {
            //entryBox = '';
            //finalResult = 0.0;
            return true;
        }
        return false;
    }

    if (isNaN(output)) {
        console.log("hfsjdf");
        entryBox = 0;
        //draw to screen
    }
    if (operationCheck()) {
        // what operation to perform
        if (isEqual) {
            console.log("were i want to check");
            displayUI("clear");
            finalResult = 0.0;
            entryBox += value;
            displayUI("" + value);
            isEqual = false;
        }
    } else {
        // Display UI
        displayUI('clear');
        entryBox += value;
        console.log(entryBox);
        displayUI(entryBox);


    }
}


function calculateAddition() {
    //get the current value from the box add to the finalResult 
    var sumEntry = parseFloat(finalResult) + parseFloat(entryBox);
    console.log("before addition type: finalResult" + typeof sumEntry);
    updateResult(sumEntry, "+");

}

function calculateSubtraction() {
    //get the current value from the box add to the finalResult 
    var sumEntry = parseFloat(finalResult) - parseFloat(entryBox);
    updateResult(sumEntry, "-");

}

function calculateMutliply() {
    //get the current value from the box add to the finalResult 
    var sumEntry = parseFloat(finalResult) * parseFloat(entryBox);
    updateResult(sumEntry, "*");
}

function calculateDivide() {
    //get the current value from the box add to the finalResult 
    var sumEntry = parseFloat(finalResult) / parseFloat(entryBox);
    console.log("overall sum: " + sumEntry);
    updateResult(sumEntry, "/");
    // swap the finalResult of sum into finalResult
}

function calculateMod() {
    //get the current value from the box add to the finalResult 
    var sumEntry = parseFloat(finalResult) % parseFloat(entryBox);
    updateResult(sumEntry, "%");
}



/**
 * Update UI with result
 * @module MODULE
 * @method updateResult
 * @param {string} sumEntry   
 * @param {string} operation '+' '-' '*' '/'
 */
function updateResult(sumEntry, operation) {
    // swap the finalResult of sum into finalResult
    sumEntry = parseFloat(sumEntry).toPrecision(6);
    finalResult = sumEntry;

    //hidden finalResult box
    //empty what was in the hidden result box
    entryBox = '';

    displayUI("clear");
    var boxAnswer = finalResult + " " + operation + " ";
    displayUI(boxAnswer);
}




















// Test case

function complexOperation() {
    // 33 + 2 + 1 + 1 = 7
    numberClicked('33');
    operationClicked('+');
    numberClicked('2');
    operationClicked('+');
    numberClicked('1');
    operationClicked('+');
    numberClicked('1');
    document.write(" 33 + 2 + 1 + 1 =  7 ");
    document.write(entryBox);
}
//complexOperation();


//operations back to back doesnt work
function multipleOperations() {
    numberClicked('2');
    operationClicked('+');
    numberClicked('2');
    operationClicked('=');
    document.write("<br> " + entryBox);
    console.log(entryBox);
    numberClicked('2');
    operationClicked('+');
    numberClicked('2');
    operationClicked('=');
    document.write("<br> " + entryBox);
    numberClicked('2');
    operationClicked('*');
    numberClicked('2');
    operationClicked('=');
    document.write("<br> " + entryBox);
    numberClicked('2');
    operationClicked('-');
    numberClicked('2');
    operationClicked('=');
    document.write("<br> " + entryBox);
    numberClicked('2');
    operationClicked('/');
    numberClicked('2');
    operationClicked('=');
    document.write("<br> " + entryBox);



}




// operation check
/*
document.write(operationClicked('+'));
document.write(isAddition);
document.write(operationClicked('-'));
document.write(isSubtract);
document.write(operationClicked('/'));
document.write(isDivide);
document.write(operationClicked('*'));
document.write(isMultiply);
*/


function intCheck() {
    // 1 + 1 = 2
    function test1() {

        numberClicked('1');
        operationClicked('+');
        numberClicked('1');
        document.write("1 + 1 = ");
        document.write(entryBox);

    }

    test1();
    document.write('<br/>' + entryBox);
    // 10 + 1 = 12
    function test2() {
        numberClicked('10');
        operationClicked('+');
        numberClicked('1');
        document.write("\n 10 + 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = 0;
    }
    test2();


    // 99 + 1 = 100
    function test3() {
        numberClicked('99');
        operationClicked('+');
        numberClicked('1');
        document.write("<br/> 99 + 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = 0;
    }
    test3();
}

function intCheckSub() {
    // 1 + 1 = 2

    function test1Sub() {
        numberClicked('1');
        operationClicked('-');
        numberClicked('1');
        document.write("1 - 1 = ");
        document.write(entryBox);
        finalResult = 0;
        entryBox = 0;
        //  isSubtract = false;
    }
    test1Sub();

    //document.write('<br/>' + entryBox);
    // 10 - 1 = 9
    function test2Sub() {
        numberClicked('10');
        operationClicked('-');
        numberClicked('1');
        document.write("<br> 10 - 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = '';
        //isSubtract = false;
    }
    test2Sub();

    // 99 + 1 = 98
    function test3Sub() {
        // problem is here 
        numberClicked('99');
        operationClicked('-');
        numberClicked('1');
        document.write("<br/> 99 - 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = '';
        //isSubtract = false;
    }
    test3Sub();
}
//intCheckSub();

function intCheckMul() {
    // 1 + 1 = 2

    function test1Mul() {
        numberClicked('1');
        operationClicked('*');
        numberClicked('2');
        document.write("1 * 2 = ");
        document.write(entryBox);
        finalResult = 0;
        entryBox = 0;
        //  isSubtract = false;
    }
    test1Mul();

    //document.write('<br/>' + entryBox);
    // 10 - 1 = 9
    function test2Mul() {
        numberClicked('10');
        operationClicked('*');
        numberClicked('1');
        document.write("<br> 10 * 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = '';
        //isSubtract = false;
    }
    test2Mul();

    // 99 + 1 = 98
    function test3Mul() {
        // problem is here 
        numberClicked('99');
        operationClicked('*');
        numberClicked('1');
        document.write("<br/> 99 * 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = '';
        //isSubtract = false;
    }
    test3Mul();
}
//intCheckMul();

function intCheckDiv() {
    // 1 + 1 = 2

    function test1Div() {
        numberClicked('2');
        operationClicked('/');
        numberClicked('1');
        document.write("2 / 1 = ");
        document.write(entryBox);
        finalResult = 0;
        entryBox = 0;
        //  isSubtract = false;
    }
    test1Div();

    //document.write('<br/>' + entryBox);
    // 10 - 1 = 9
    function test2Div() {
        numberClicked('10');
        operationClicked('/');
        numberClicked('1');
        document.write("<br> 10 / 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = '';
        //isSubtract = false;
    }
    test2Div();

    // 99 + 1 = 98
    function test3Div() {
        // problem is here 
        numberClicked('99');
        operationClicked('/');
        numberClicked('1');
        document.write("<br/> 99 / 1 = ")
        document.write(entryBox);
        finalResult = 0;
        entryBox = '';
        //isSubtract = false;
    }
    test3Div();
}
//intCheckDiv();