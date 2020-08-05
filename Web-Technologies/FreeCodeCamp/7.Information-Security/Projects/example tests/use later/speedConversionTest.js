process.env.NODE_ENV = 'test';
var chai = require('chai');
var assert = chai.assert;
var speed = require('../../metric-Imperial-converter/lib/speed');
var speed = new speed();


describe('Speed conversion kphToMph', function() {

    describe('testing zero value', function() {
        it('using single value e.g 0 should return 0 mph', function() {
            assert.equal(speed.kphToMph(0), 0, ' 0 kph = 0 mph ');
        });
        it('using to 2 decimal places e.g 0.00 should return 0 mph', function() {
            assert.equal(speed.kphToMph(0.00), 0, ' 0 kph = 0 mph ');
        });
        it('using to 3 decimal places e.g 0.000 should return 0 mph', function() {
            assert.equal(speed.kphToMph(0.000), 0, ' 0 kph = 0 mph ');
        });

    });

    describe('testing decimal precision', function() {

        it('using single value e.g 1  should return 0.62 mph', function() {
            assert.equal(speed.kphToMph(1), 0.62, ' 1 kph = 0.62 mph ');
        });
        it('using to 2 decimal places e.g 1.00 should return 0.62 mph', function() {
            assert.equal(speed.kphToMph(1.00), 0.62, ' 1.00 kph = 0.62 mph ');
        });
        it('using to 3 decimal places e.g 1.000 should return 0.62 mph', function() {
            assert.equal(speed.kphToMph(1.000), 0.62, ' 1.000 kph = 0.62 mph ');
        });
    });

    describe('testing negative decimal precision', function() {

        it('using single value e.g -1 should return -0.62 mph', function() {
            assert.equal(speed.kphToMph(-1), -0.62, ' -1 kph = -0.62 mph ');
        });
        it('using to 2 decimal places e.g -1.00 should return -0.62 mph', function() {
            assert.equal(speed.kphToMph(-1.00), -0.62, ' -1.00 kph = -0.62 mph ');
        });
        it('using to 3 decimal places e.g -1.000 should return -0.62 mph', function() {
            assert.equal(speed.kphToMph(-1.000), -0.62, ' -1.000 kph = -0.62 mph ');
        });
    });

    describe('testing correctness', function() {

        var testValues = speed.mphToKphTestValues();

        for (var i in testValues) {
            it(`kph ${i}  = ${testValues[i]}`, function() {
                assert.equal(speed.kphToMph(i), testValues[i], 'incorrect conversion ');
            });
        }
    });
});


describe('Speed conversion mphToKph', function() {
    describe('testing 0 value', function() {

        it('using single value e.g 0 should return 0 kph', function() {
            assert.equal(speed.mphToKph(0), 0, ' 0 mph = 0 kph ');
        });
        it('using to 2 decimal places e.g 0.00 should return 0 kph', function() {
            assert.equal(speed.mphToKph(0.00), 0, ' 0 mph = 0 kph ');
        });
        it('using to 3 decimal places e.g 0.000 should return 0 kph', function() {
            assert.equal(speed.mphToKph(0.000), 0, ' 0 mph = 0 kph ');
        });

    });
    describe('testing decimal precision', function() {

        it('using single value e.g 1 should return 1.61 kph', function() {
            assert.equal(speed.mphToKph(1), 1.61, ' 1 mph = 1.61 kph ');
        });
        it('using to 2 decimal places e.g 1.00 should return 1.61 kph', function() {
            assert.equal(speed.mphToKph(1.00), 1.61, ' 1.00 mph = 1.61 kph ');
        });
        it('using to 3 decimal places e.g 1.000 should return 1.61 kph', function() {
            assert.equal(speed.mphToKph(1.000), 1.61, ' 1.000 mph = 1.61 kph ');
        });
    });


    describe('testing negative decimal precision', function() {

        it('using single value e.g -1 should return -1.61 kph', function() {
            assert.equal(speed.mphToKph(-1), -1.61, ' -1 mph = -1.61 kph ');
        });
        it('using to 2 decimal places e.g -1.00 should return -1.61 kph', function() {
            assert.equal(speed.mphToKph(-1.00), -1.61, ' -1.00 mph = -1.61 kph ');
        });
        it('using to 3 decimal places e.g -1.000 should return -1.61 kph', function() {
            assert.equal(speed.mphToKph(-1.000), -1.61, ' -1.000 mph = -1.61 kph ');
        });
    });

    describe('testing correctness', function() {

        var testValues = speed.kphToMphTestValues();

        for (var i in testValues) {

            it(`kph ${i}  = ${testValues[i]}`, function() {
                assert.equal(speed.mphToKph(i), testValues[i], 'incorrect conversion ');
            });
        }
    });
});