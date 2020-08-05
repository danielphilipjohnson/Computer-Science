var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var server = require('../../metric-Imperial-converter/myApp'); /** import the Express app **/

var chaiHttp = require('chai-http'); /** require the chai-http plugin **/
chai.use(chaiHttp); /** use the chai-http plugin **/


suite('HomePage routes', function() {

    // ### INDEX ### 
    suite('GET index', function() {
        test('/', function(done) {
            chai.request(server)
                .get('/')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.html;
                    done();
                })
                .catch(function(err) {
                    throw err;
                });
        });
    });
    // ### capacity ### 
    suite('GET capacity', function() {
        test('/capacity', function(done) {
            chai.request(server)
                .get('/capacity')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.html;
                    done();
                })
                .catch(function(err) {
                    throw err;
                });
        });
    });



    // ### imperial ### 
    suite('GET imperial', function() {
        test('/imperial', function(done) {
            chai.request(server)
                .get('/imperial')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.html;
                    done();
                })
                .catch(function(err) {
                    throw err;
                });
        });
    });


    // ### length ### 
    suite('GET length', function() {
        test('/length', function(done) {
            chai.request(server)
                .get('/length')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.html;
                    done();
                })
                .catch(function(err) {
                    throw err;
                });
        });
    });


    // ### metric ### 
    suite('GET metric', function() {
        test('/metric', function(done) {
            chai.request(server)
                .get('/metric')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.html;
                    done();
                })
                .catch(function(err) {
                    throw err;
                });
        });
    });
    // ### weight ### 
    suite('GET weight', function() {
        test('/weight', function(done) {
            chai.request(server)
                .get('/weight')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.html;
                    done();
                })
                .catch(function(err) {
                    throw err;
                });
        });
    });
    // ### Api INDEX ### 
    suite('Api index', function() {
        test('/api', function(done) {
            chai.request(server)
                .get('/api')
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res).to.not.redirect;
                    expect(res).to.be.html;
                    done();
                })
                .catch(function(err) {
                    throw err;
                });
        });
    });


});