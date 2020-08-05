var express = require('express');
var router = express.Router();
let Exercise = require('../models/Exercise')

// Get exercises
router.get('/:userId&:from&:to&:limit', function(req, res) {

    let limitValue = parseInt(req.params.limit);
    let fromDate = req.params.from;
    let toDate = req.params.to;
    // eg. localhost:3000/api/exercise/log/1&2018-05-13&2019-06-14&10

    Exercise
        .find({
            userId: +req.params.userId,
            date: { $lte: toDate, $gte: fromDate }
        })
        .limit(limitValue)
        .exec(function(err, exercises) {
            if (err) {
                res.send(err);
                return next(err);
            } else {
                res.json({ userexercises: exercises })
            }
        });
});


module.exports = router;