function timestamp(time) {

    this.monthsIndex = [
         { month: "January", maxDays: 31},
         { month:"February", maxDays: 28},
         { month:"March", maxDays:  31},
         { month: "April", maxDays: 30},
        { month: "May", maxDays:  31},
        { month: "June", maxDays: 30},
         { month: "July", maxDays:  31},
        { month: "August", maxDays:  31},
         { month: "September", maxDays: 30},
         { month: "October", maxDays:  31},
       { month: "November", maxDays: 30},
       { month: "December", maxDays:  31},
    ];
    // might add shorter month names
    this.monthsKeys = {
        "january": { exists: true, id: 0 },
        "february":  { exists: true, id: 1 },
        "march":  { exists: true, id: 2 },
        "april":  { exists: true, id: 3 },
        "may":  { exists: true, id: 4 },
        "june":  { exists: true, id: 5 },
        "july":  { exists: true, id: 6 },
        "august":  { exists: true, id: 7 },
        "september":  { exists: true, id: 8 },
        "october":  { exists: true, id: 9 },
        "november":  { exists: true, id: 10 },
        "december":  { exists: true, id: 11 }
    };

    // The value we will be working with and validating
    this.timeStamp = time;

    // works as expected 
    this.isNaturalTimeStamp = function () {

        // split date 
        let timeStampArr = this.timeStamp.split(' ');

        // check the timestamp have three items
        // month, day, year
        if (timeStampArr.length === 3) {

            // probably short circuit month day and year nested if to stop evaulting others 
            // if one fails

            //check if month correct


            let month = timeStampArr[0].toLowerCase();

            // check if month exists
            let isValidMonth = this.monthsKeys[month]["exists"];

            // check day input 15,
            // so remove comma
            let day = timeStampArr[1].replace(",", "");
            
            // get the correct month via its key and fetch its id  
            // fetches correct month
            let correctMonth = this.monthsIndex[this.monthsKeys[month]["id"]];
            
            let amountOFDaysInGivenMonth = correctMonth.maxDays;

            // date logic between 1 and max amount for each month
            // eventually work out months and max date
            // prevent 0
            let validDay = day.length <= 2 && day.length > 0  && day >= 1 && day <= amountOFDaysInGivenMonth ? true : false;

            //check year 
            let year = timeStampArr[2];
            let validYear = year.length === 4 ? true : false;
           
            if (isValidMonth && validDay && validYear) {

                let isValidNaturalTime = Date.parse(this.timeStamp);
                
                if (isNaN(isValidNaturalTime)) {
                    return true;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        // if it doesnt dont bother to evaulate
        else {
            return false;
        }

    };

    // works as expected 
    this.isUnixTimeStamp = function () {
        console.log(this.timeStamp.length);
        if (!isNaN(this.timeStamp) && this.timeStamp.length >= 8) {
            return true;

        }
        else {
            return false;
        }

    };

    // works as expected
    this.UnixToNatural = function (unixTimeStamp) {

        let naturalTime = new Date(unixTimeStamp * 1000);

        // Get the month via JS which returns a number
        // look up dictionary for correct month
        let month = this.monthsIndex[naturalTime.getMonth()].month;
        
        let day = naturalTime.getDate();

        let year = naturalTime.getFullYear();

        // // time to format { December 15, 2015}
        let formatedDate = month + " " + day + ", " + year;

        return formatedDate;
    }
    // works as expected
    this.NaturalToUnix = function (naturalTimestamp) {

        let formattedUnix = new Date(naturalTimestamp).getTime() / 1000;

        return formattedUnix;

    }
}

module.exports = timestamp;