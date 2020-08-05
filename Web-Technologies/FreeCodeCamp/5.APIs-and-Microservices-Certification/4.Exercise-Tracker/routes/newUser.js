var express = require('express');
var router = express.Router();

const {
    check,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');


const userLogic = require('../models/logic/User');

// works and running
router.post('/', [

    check('username').isLength({
        min: 1
    })

], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({
            errors: errors.array()
        });
    } else {

        const userData = userLogic.fetchUserForm(req);
        userLogic.createUser(userData, req, res);


    }
});

module.exports = router;