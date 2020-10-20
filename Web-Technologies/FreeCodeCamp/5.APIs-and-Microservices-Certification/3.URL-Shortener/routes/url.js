const express = require('express');
const router = express.Router();

const url = require("url");

const shortid = require('shortid');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const validUrl = require('valid-url');

// URL Model
let URLS = require('../models/urls');

// Add Route
router.get('/new/(*)', function (req, res) {

    let urlToConvert = req.originalUrl.replace(/^\/new\//, "");//this is necessary to get any query strings after possible ? in url, otherwise ignored by req.params
    console.log("original: " + req.originalUrl);
    console.log("original: " + urlToConvert);
    // validate url :    1.1: validate URL parameter

    if (validUrl.isUri(urlToConvert)) {
        // Create New URL
        let saveURL = new URLS();

        saveURL.long_url = urlToConvert;

        let shortCode = shortid.generate()
        saveURL.short_code = shortCode;

        saveURL.date_created = new Date();


        saveURL.save(function (err) {
            if (err) {
                console.log(err.error);
                // then go find it and display to user
                res.json({ "message" :"Error, expected `url` to be unique." });
            } else {
                // shorten address = use ID key
                res.json({
                    "original_url": urlToConvert,
                    "short_url": "https://appname/" + shortCode
                });
            }
        });





        // 2.1: Return null if invalid
    } else {
        // if URL is invalid, do this
        res.json({ error: "Wrong url format, make sure you have a valid protocol and real site." });
    };







});

// 3.1 User Story: When I visit that shortened URL, it will redirect me to my original link.
router.get('/:shortcode', (req, res) => {

    let shortCodeToLookup = req.params.shortcode;

    URLS.findOne({ 'short_code': shortCodeToLookup }, (err, url) => {
        if (err) {
            res.json({ error: "no website found for this code" });
        } else {
            if (url === null) {
                res.json({ error: "no website found for this code" });
            }
            else {
                // cause redirect
                res.redirect(url.long_url);
            }
        }
    });
})


module.exports = router;


