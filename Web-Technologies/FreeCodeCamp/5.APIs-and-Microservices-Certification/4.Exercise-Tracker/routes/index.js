var express = require('express');
var router = express.Router();
var User = require('../models/User');

// Home Route
router.get('/', function(req, res) {
    res.render('index');

});


module.exports = router