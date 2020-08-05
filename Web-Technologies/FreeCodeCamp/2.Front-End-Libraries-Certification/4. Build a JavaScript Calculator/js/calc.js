function calculateAddition() {
    //get the current value from the box add to the result 
    var sumEntry = result + parseFloat(entryBox);
    // swap the result of sum into result
    result = sumEntry;
    entryBox = result;
    entryBox = '';
    //displayUI
    displayUI("clear");
    displayUI(result + " + ");
}

function calculateSubtraction() {
    //get the current value from the box add to the result 
    var sumEntry = result - parseFloat(entryBox);
    // swap the result of sum into result
    result = sumEntry;
    //hidden result box
    entryBox = result;
    entryBox = '';
    //displayUI
    displayUI("clear");
    displayUI(result + " - ");
}
function calculateMutliply() {
    //get the current value from the box add to the result 
    var sumEntry = result * parseFloat(entryBox);
    // swap the result of sum into result
    result = sumEntry;
    //hidden result box
    entryBox = result;
    entryBox = '';
    //displayUI
    displayUI("clear");
    displayUI(result + " * ");
}

function calculateDivide() {

    //get the current value from the box add to the result 
    var sumEntry = result / parseFloat(entryBox);
    // swap the result of sum into result
    result = sumEntry;
    //hidden result box
    entryBox = result;
    entryBox = '';
    //displayUI
    displayUI("clear");
    displayUI(result + " / ");
}