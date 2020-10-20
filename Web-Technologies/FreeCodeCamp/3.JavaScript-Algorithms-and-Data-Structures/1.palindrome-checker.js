function palindrome(str) {
    // Good luck!

    var punctuationless = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    var finalString = punctuationless.replace(/\s{4,}/g,"");
    finalString = finalString.toLowerCase().split(' ').join('').split('').join('');
    
  
    var str_check = finalString.split('').reverse().join('');
  
    if( finalString == str_check){
       
      return true;
    }
    else{
  
      return false;
    }
  }
  
  
  
  palindrome("race car");