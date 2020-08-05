
// tidy up
function convertToRoman(num) {

  // decimal to roman lookup
  
  const romBase1 = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
                  //1	2	     3	   4	5     6		7		8		9
  
  
  //						10		20		30		40		50		60		70			80			90
  const romBase10 = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  
  
  //							100		200		300		400		500		600		700		800			900
  const romBase100 = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  // 1000, 2000, 3000
  const romBase1000 = ["M", "MM", "MMM"];

  // general case split into 1s, 10s, 100s, 1000s

  // check for 1000s : for example 3000 would return 3
  let num1000 = Math.floor(num / 1000);

  // check if there is 100s: for example 300 would return 3
  let num100 = Math.floor((num - num1000 * 1000) / 100);
  // check if there is 10s: for example 30 would return 3
  let num10 = Math.floor((num - num1000 * 1000 - num100 * 100) / 10);
  // check units between 1-9: for example 9 would return 9
  let num1to9 = num % 10;

  let romanArray = [];

  // greater than zero then we know there are 1000s
  if (num1000 > 0) {

    // num1000 will be how many 1000 there is
    // 3000 will be 3 - 1 = 2 : which is array index 2 which will be MMM
    romanArray.push(romBase1000[num1000 - 1]);
  }
  // greater than zero then we know there are 100s
  if (num100 > 0) {
    // similar to above  
    romanArray.push(romBase100[num100 - 1]);
  }
  // greater than zero then we know there are 10s
  if (num10 > 0) {

    romanArray.push(romBase10[num10 - 1]);
  }
  // greater than zero then we know there is a number between 1-9
  if (num1to9 > 0) {

    romanArray.push(romBase1[num1to9 - 1]);
  }

  return romanArray.join("");
}

convertToRoman(2);