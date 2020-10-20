const {
    check,
    validationResult
} = require('express-validator/check');

module.exports = function(app, db) {

    app.route('/api')
        .get((req, res) => {
            res.render(process.cwd() + '/views/pug/pages/api', {
                title: 'API',
            });
        });

    app.route('/api/ftoc')
        .post(
            [check('fahrenheit')
                .not()
                .isEmpty()
                .trim()
                .escape()
            ], (req, res) => {
                console.log(req.body.fahrenheit)
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({
                        errors: errors.array()
                    });
                } else if (isNaN(req.body.fahrenheit)) {

                    return res.status(422).json({
                        errors: [{
                            location: 'body',
                            param: 'farenheit',
                            msg: 'Invalid value: Not an number'
                        }]
                    });

                } else {
                    let faren = req.body.fahrenheit;
                    let f = +((faren - 32) / 1.800).toFixed(2);
                    res.json({
                        Celsius: f
                    })
                }
            });



    app.route('/api/ctof')
        .post(
            [check('celsius')
                .not()
                .isEmpty()
                .trim()
                .escape()
            ], (req, res) => {

                const errors = validationResult(req);

                if (!errors.isEmpty()) {

                    return res.status(422).json({
                        errors: errors.array()
                    });

                } else if (isNaN(req.body.celsius)) {

                    return res.status(422).json({
                        errors: [{
                            location: 'body',
                            param: 'farenheit',
                            msg: 'Invalid value: Not an number'
                        }]
                    });

                } else {
                    let celsius = req.body.celsius;
                    const c = +((celsius * 1.8000) + 32.00).toFixed(2);
                    res.json({
                        Farenheit: c
                    })
                }
            });
}