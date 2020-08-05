function telephoneCheck(str) {
  var phoneNumToCheck = str;
  var UStelephoneFound = false;
  // All cases
  // 1? optional one at the front the same for most of these
  // s? is allow for whitespace after the one

  // First USE CASE
  // d{3} 3 digits - d{3} 3 digits - d{4} 4 digits
  //   555-555-5555
  var UStelephoneFormat1 = /1?\s?\d{3}-\d{3}-\d{4}/g;

  // with brackets this time digits are the same
  // (555)555-5555
  var UStelephoneFormat2 = /1?\s?\(\d{3}\)\d{3}-\d{4}/g;
  //  with brackets with a space between the 3 digits
  // show example 1 (555) 555-5555
  var UStelephoneFormat3 = /1?\s?\(\d{3}\)\s\d{3}-\d{4}/g;
  // space inbetween all numbers
  // 1 555 555 5555
  var UStelephoneFormat4 = /1?\s?\d{3}\s\d{3}\s\d{4}/g;

  // ten digits
  // starts with 5 then nine numbers after
  var UStelephoneFormat5 = /^5\d{9}/g;

  // assigned in order of most popular
  var validUStelephoneFormats = [
    UStelephoneFormat1,
    UStelephoneFormat2,
    UStelephoneFormat3,
    UStelephoneFormat4,
    UStelephoneFormat5,
  ];

  validUStelephoneFormats.forEach(function (validFormat) {
    if (phoneNumToCheck.search(validFormat) === 0) {
      UStelephoneFound = true;
    }
  });

  if (UStelephoneFound) {
    return true;
  } else {
    return false;
  }
}

telephoneCheck("555-555-5555");
