const assert = require('assert');

const {
    getReversedSortedArray,
    isEven,
    round,
    round125
} = require('../function');

describe.only('Function', () => {
    it('getReversedSortedArray', () => {
        const b = [6, 3, 18, 10, 48, 2];
        assert.deepStrictEqual(getReversedSortedArray(b), [48, 18, 10, 6, 3, 2]);
    });

    it('isEven', () => {
        assert.deepStrictEqual(isEven(3), false);
    });

    it('precision', () => {
        const a = 0.1 + 0.2
        assert.deepStrictEqual(round(a), 0.3);
        assert.deepStrictEqual(round(0.01234567890123456789, 15), 0.0123456789012346);
        assert.deepStrictEqual(round(0.01234567890123456789, 14), 0.012345678901235);
        assert.deepStrictEqual(round(0.01234567890123456789, 13), 0.01234567890123);
    });

    it('round125', () => {
        assert.equal(round125(1234), 1000);
        assert.equal(round125(123), 100);
        assert.equal(round125(6789), 5000);
        assert.equal(round125(92), 100);
        assert.equal(round125(45), 50);
        assert.equal(round125(523), 500);
    });
});