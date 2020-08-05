const express = require('express');
const router = express.Router();
const timestampLogic = require('../public/js/timeStampLogic');

// if no param supplied
router.get('/', function(req, res){

    // output as JSON
    res.json({ "unix": null, "natural": null } );
});

// timestamp Route
router.get('/:timestamp', function(req, res){
    
    
    let usersTimeStamp = req.params.timestamp;
    
    let timeToValidate  = new timestampLogic(usersTimeStamp);

    let isValidUnixTime = timeToValidate.isUnixTimeStamp();

    let isValidNaturalTime = timeToValidate.isNaturalTimeStamp();
    
    // if one value is valid carry on
    if(isValidUnixTime || isValidNaturalTime){
        
        // Check if unix first because date object in js allows numbers also
        if(isValidUnixTime){
        
            // store unix
            let unixTime = usersTimeStamp;

            // Convert to Natural
            let naturalTime = timeToValidate.UnixToNatural(unixTime);

            // output as JSON
            res.json({ "unix": unixTime, "natural": naturalTime } );         
        }
        else if(isValidNaturalTime){
          
            // Store Natural Time
            let naturalTime = usersTimeStamp;

            // Convert Natural to Unix
            let unixTime  = timeToValidate.NaturalToUnix(naturalTime);

            // output as JSON
            res.json({ "unix": unixTime, "natural": naturalTime } );
            // { "unix": 1450137600, "natural": "December 15, 2015" } 
        }
    }
    // fails to be a valid unix or a natural date 
    else {
        res.json({ "unix": null, "natural": null } );
    }
  });


  module.exports = router;
  