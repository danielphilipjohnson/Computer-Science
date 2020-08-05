process.env.NODE_ENV = 'test';
var chai = require('chai');
var assert = chai.assert;
var Length = require('../lib/length');
var length = new Length();


describe('Length conversion meterTofeet', function() {

    describe('testing zero value', function() {
        it('using single value e.g 0 should return 0 feet', function() {
            assert.equal(length.meterTofeet(0), 0, ' 0 m = 0 feet ');
        });
        it('using to 2 decimal places e.g 0.00 should return 0 feet', function() {
            assert.equal(length.meterTofeet(0.00), 0, ' 0 m = 0 feet ');
        });
        it('using to 3 decimal places e.g 0.000 should return 0 feet', function() {
            assert.equal(length.meterTofeet(0.000), 0, ' 0 m = 0 feet ');
        });
    });

    describe('testing decimal precision', function() {
        it('using single value e.g 1 should return 3.28 feet', function() {
            assert.equal(length.meterTofeet(1), 3.28, ' 1 m = 3.28 feet ');
        });
        it('using to 2 decimal places e.g 1.00 should return 3.28 feet', function() {
            assert.equal(length.meterTofeet(1.00), 3.28, ' 1 m = 3.28 feet ');
        });
        it('using to 3 decimal places e.g 1.000 should return 3.28 feet', function() {
            assert.equal(length.meterTofeet(1.000), 3.28, ' 1 m = 3.28 feet ');
        });
    });

    describe('testing negative decimal precision', function() {
        it('using single value e.g -1 should return 3.28 feet', function() {
            assert.equal(length.meterTofeet(-1), -3.28, ' 1 m = 3.28 feet ');
        });
        it('using to 2 decimal places e.g -1.00 should return 3.28 feet', function() {
            assert.equal(length.meterTofeet(-1.00), -3.28, ' 1 m = 3.28 feet ');
        });
        it('using to 3 decimal places e.g -1.000 should return 3.28 feet', function() {
            assert.equal(length.meterTofeet(-1.000), -3.28, ' 1 m = 3.28 feet ');
        });
    });

    describe('testing correctness', function() {

        var testValues = length.meterTofeetTestValues();

        for (var i in testValues) {
            it(`meter ${i}  = feet ${testValues[i]}`, function() {
                assert.equal(length.meterTofeet(i), testValues[i], 'incorrect conversion ');
            });
        }
    });

});


describe('Length conversion feetToMeter', function() {

    describe('testing zero value', function() {
        it('using single value e.g 0 feet should return 0 meter', function() {
            assert.equal(length.feetToMeter(0), 0, ' 0 feet = 0 meter ');
        });
        it('using to 2 decimal places e.g 0.00 feet should return 0 meter', function() {
            assert.equal(length.feetToMeter(0.00), 0, ' 0 feet = 0 meter ');
        });
        it('using to 3 decimal places e.g 0.000 feet should return 0 meter', function() {
            assert.equal(length.feetToMeter(0.000), 0, ' 0 feet = 0 meter ');
        });
    });

    describe('testing decimal precision', function() {
        it('using single value e.g 1 feet should return 0.30 meter', function() {
            assert.equal(length.feetToMeter(1), 0.30, ' 1 feet = 0.30 meter ');
        });
        it('using to 2 decimal places e.g 1.00 feet should return 0.30 feet', function() {
            assert.equal(length.feetToMeter(1.00), 0.30, ' 1 feet = 0.30 meter ');
        });
        it('using to 3 decimal places e.g 1.000 feet should return 0.30 feet', function() {
            assert.equal(length.feetToMeter(1.000), 0.30, ' 1 feet = 0.30 meter ');
        });
    });

    describe('testing negative decimal precision', function() {
        assert.equal(length.feetToMeter(-1.00), -0.30, ' -1 feet = -0.30 meter ');
        it('using single value e.g -1 feet should return -0.30 meter', function() {
            assert.equal(length.feetToMeter(-1), -0.30, ' -1 feet = -0.30 meter ');
        });
        it('using to 2 decimal places e.g -1.00 feet should return -0.30 feet', function() {
            assert.equal(length.feetToMeter(-1.00), -0.30, ' -1 feet = -0.30 meter ');
        });
        it('using to 3 decimal places e.g -1.000 feet should return 3.28 feet', function() {
            assert.equal(length.feetToMeter(-1.000), -0.30, ' -1 feet = -0.30 meter ');
        });

    });

    describe('testing correctness', function() {

        var testValues = length.feetToMeterTestValues();

        for (var i in testValues) {
            it(`feet ${i}  = meter ${testValues[i]}`, function() {
                assert.equal(length.feetToMeter(i), testValues[i], 'incorrect conversion ');
            });
        }
    });
});