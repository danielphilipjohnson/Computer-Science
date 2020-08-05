const express = require('express');
const router = express.Router();


// URL Model
let recentSearches = require('../models/recentSearches');

// Add Route
router.get('/api/latest/imagesearch/', function (req, res) {


    recentSearches
        .find({})
        .sort( {search_date: 'descending'})
        .limit(10)
        .exec(function (err, searchs) {
        if (err) {
            res.send(err);
            return next(err);
        }
        else {
            //iterate 
            let searchObject = [];
            let searchLen = searchs.length;
            for (var i = 0; i < searchLen; i++) {
                searchObject.push({search_term: searchs[i].term, search_date: searchs[i].search_date})
                            
            }
            res.json(searchObject);

        }
    });

        
     
        
        
        
//res.send("RECENT IMAGE REQUESTS");


});



module.exports = router;


