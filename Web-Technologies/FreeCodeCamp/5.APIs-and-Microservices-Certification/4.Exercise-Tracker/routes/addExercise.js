var express = require('express');
var router = express.Router()
const exerciseLogic = require('../models/logic/Exercise');


const {
    check,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');


// Home Route
router.post('/', [

    check('userId')
    .not()
    .isEmpty()
    .trim()
    .escape(),
    check('description').not().isEmpty()
    .trim()
    .escape(),
    check('duration')
    .not().isEmpty()
    .trim()
    .escape(),
    check('date').not().isEmpty()
    .trim()
    .escape(),
    sanitizeBody('date').toDate()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).json({
            errors: errors.array()
        });
    } else {

        const exerciseData = exerciseLogic.fetchExerciseForm(req);
        exerciseLogic.createExercise(exerciseData, req, res);

    }
});


module.exports = router;