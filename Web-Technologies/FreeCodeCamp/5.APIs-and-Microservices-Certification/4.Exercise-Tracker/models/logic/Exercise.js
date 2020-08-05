/* jshint esversion: 6 */

let Exercise = require('../Exercise');

ExerciseLogic = {

    // Create a new User save to mongo 
    createExercise: function(exercise, req, res) {

        let newExercise = new Exercise({
            userId: exercise.userId,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
            date_created: new Date(),
        });

        newExercise
            .save(function(err) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                    // display error with flash connect next
                } else {
                    res.redirect('/');

                }
            });
    },

    // Fetch an indivdual user
    fetchExerciseForm: function(req) {
        // get date object and format
        req.body.date;

        let Exercise = {};

        Exercise.userId = req.body.userId;
        Exercise.description = req.body.description;
        Exercise.duration = req.body.duration;
        Exercise.date = req.body.date;
        return Exercise;

    },

};

module.exports = ExerciseLogic