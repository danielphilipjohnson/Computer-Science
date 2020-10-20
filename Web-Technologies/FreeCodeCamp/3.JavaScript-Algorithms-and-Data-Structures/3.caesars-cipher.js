String.prototype.isUpper = function() {
    return this.valueOf().toUpperCase() === this.valueOf();
};

String.prototype.isLower = function() {
    return this.valueOf().toLowerCase() === this.valueOf();
};

function rot13(str) { // LBH QVQ VG!
  var result = "";
  var key = 13;

	for (var i = 0; i < str.length; i++) {
        
		var c = str.charCodeAt(i);
        console.log(c);
        if(c >= 'A'.charCodeAt() && c <= 'Z'.charCodeAt()){
                result += String.fromCharCode((c +  13 - 65) %26 + 65);
                console.log((c +  13 - 65) %26 + 65);
        }
        else{

            result += String.fromCharCode(c);
            }
        
	}
    //need to read spaces 
	return result;
}

// Change the inputs below to test
var x = rot13("SERR CVMMN!");

console.log(x);