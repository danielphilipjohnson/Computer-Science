const apiRoutes = require('./api/api');


module.exports = function(app, db) {
    app.route('/')
        .get((req, res) => {
            res.render(process.cwd() + '/views/pug/pages/index', {
                title: 'Metric to Imperial Converter',

            });
        });
    // Route Files
    apiRoutes(app);



    app.route('/capacity')
        .get((req, res) => {
            res.render(process.cwd() + '/views/pug/pages/capacity', {
                title: 'Capacity',

            });
        });


    app.route('/imperial')
        .get((req, res) => {
            res.render(process.cwd() + '/views/pug/pages/imperial', {
                title: 'Imperial',

            });
        });
    app.route('/length')
        .get((req, res) => {
            res.render(process.cwd() + '/views/pug/pages/length', {
                title: 'Length',

            });
        });

    app.route('/metric')
        .get((req, res) => {
            res.render(process.cwd() + '/views/pug/pages/metric', {
                title: 'Metric',

            });
        });
    app.route('/weight')
        .get((req, res) => {
            res.render(process.cwd() + '/views/pug/pages/weight', {
                title: 'Weight',

            });
        });
    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });
}