var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var server = require('../../metric-Imperial-converter/myApp'); /** import the Express app **/

var chaiHttp = require('chai-http'); /** require the chai-http plugin **/
chai.use(chaiHttp); /** use the chai-http plugin **/


suite('Api F to C Temperature ', function() {
    suite('API sending values to farenheit to be validated', function() {
        test('/ftoc send a number', function(done) {
            chai.request(server)
                .post('/api/ftoc')
                .type('form')
                .send({
                    'farenheit': 0,
                })
                .end(function(err, res) {
                    expect(res.body.Celsius).to.be.an('number')
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    done();
                });
        });

        test('/ftoc send empty value', function(done) {
            chai.request(server)
                .post('/api/ftoc')
                .type('form')
                .send({

                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    done();
                });
        });
        test('/ftoc send a string', function(done) {
            chai.request(server)
                .post('/ftoc')
                .type('form')
                .send({
                    'farenheit': 'a',

                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    console.log("returns a json error message")
                    done();
                });
        });

        test('/ftoc send an object', function(done) {
            chai.request(server)
                .post('/ftoc')
                .type('form')
                .send({
                    'farenheit': { 'a': 2 },

                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    console.log("returns a json error message")
                    done();
                });
        });

        test('/ftoc send an array', function(done) {
            chai.request(server)
                .post('/ftoc')
                .type('form')
                .send({
                    'farenheit': [],

                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    console.log("returns a json error message")
                    done();
                });
        });
    });


    // precision tests
    suite('API conversion returns correct values', function() {
        test('/ftoc f 0 = \'17.78f', function(done) {
            chai.request(server)
                .post('/ftoc')
                .type('form')
                .send({
                    'farenheit': 0,
                })
                .end(function(err, res) {
                    expect(res.body.Celsius).to.be.an('number')
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    expect(res.body.Celsius).to.be.eq(-17.78);
                    console.log(res.body.Celsius)
                    done();
                });
        });

        test('/ftoc f 100 = \'37.78f', function(done) {
            chai.request(server)
                .post('/ftoc')
                .type('form')
                .send({
                    'farenheit': 100,
                })
                .end(function(err, res) {
                    expect(res.body.Celsius).to.be.an('number')
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    expect(res.body.Celsius).to.be.eq(37.78);
                    console.log(res.body.Celsius)
                    done();
                });
        });

    });


});





suite('Api C to F Temperature ', function() {

    suite('API sending values to celsius to be validated', function() {

        test('/ctof send empty value: return an error array, status 422 and json', function(done) {
            chai.request(server)
                .post('/ctof')
                .type('form')
                .send({

                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    done();
                });
        });

        test('/ctof send a number: returns a number array, status 200, and json', function(done) {
            chai.request(server)
                .post('/ctof')
                .type('form')
                .send({
                    'celsius': 0,
                })
                .end(function(err, res) {
                    expect(res.body.Farenheit).to.be.an('number')
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    done();
                });
        });

        test('/ctof send a string: return an error array, status 422 and json', function(done) {
            chai.request(server)
                .post('/ctof')
                .type('form')
                .send({
                    'celsius': 'a',
                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    done();
                });
        });

        test('/ctof send an object: return an error array, status 422 and json', function(done) {
            chai.request(server)
                .post('/ctof')
                .type('form')
                .send({
                    'celsius': { 'a': 2 },
                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    done();
                });
        });

        test('/ctof send an array: return an error array, status 422 and json', function(done) {
            chai.request(server)
                .post('/ctof')
                .type('form')
                .send({
                    'celsius': [],
                })
                .end(function(err, res, body) {
                    expect(res.body.errors).to.be.an('array')
                    expect(res).to.have.status(422);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    done();
                });
        });

    });

    // precision tests
    suite('API conversion returns correct values', function() {
        test('/ftoc c 0 = \'32.00f', function(done) {
            chai.request(server)
                .post('/ctof')
                .type('form')
                .send({
                    'celsius': 0,
                })
                .end(function(err, res) {
                    expect(res.body.Farenheit).to.be.an('number')
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    expect(res.body.Farenheit).to.be.eq(32.00);
                    console.log(res.body.Farenheit)
                    done();
                });
        });

        test('/ftoc c 38.00 = \'100.40f', function(done) {
            chai.request(server)
                .post('/ctof')
                .type('form')
                .send({
                    'celsius': 38,
                })
                .end(function(err, res) {
                    expect(res.body.Farenheit).to.be.an('number')
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.json;
                    expect(res.body.Farenheit).to.be.eq(100.40);

                    done();
                });
        });

    });


});