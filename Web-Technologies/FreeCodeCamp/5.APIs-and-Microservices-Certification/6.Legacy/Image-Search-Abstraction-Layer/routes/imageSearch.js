const express = require('express');
const router = express.Router();

const config = require('../config/keys');

const util = require('util');
const Bing = require('node-bing-api')({ accKey: config.bingKey });
//const searchBing = util.promisify(Bing.web.bind(Bing));

// URL Model
let RecentSearches = require('../models/recentSearches');

// Add Route
router.get('/api/imagesearch/:image*', function (req, res) {

    let count = 10;
    
    let offset = req.query.offset === undefined ? 0: req.query.offset ;
    
    let searchTerm =  req.params.image;


    // Save recent search term
    let recentSearches = new RecentSearches();
    recentSearches.term = searchTerm;
    recentSearches.search_date = new Date();
    recentSearches.save(function (err) {
        if (err) {
            console.log(err.error);
            // then go find it and display to user
            res.json({ "message": "Error saving search term please try again" });
        }
        else {
            console.log("saved");
        }
    });

    
    Bing.images(searchTerm, {
        count: 10,   // Number of results (max 50) 
        offset: offset  * 10    
    }, function (error, rez, body) {
        

        let bingImageData = [];

        for (var i = 0; i < 10; i++) {
            bingImageData.push({
                url: body.value[i].webSearchUrl,
                snippet: body.value[i].name,
                thumbnail: body.value[i].thumbnail
            });
        }
        // I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
        res.json(bingImageData);
    });
});



module.exports = router;


