const assert = require('assert');

const {
    getReversedSortedArray,
    isEven,
    round
} = require('../function');

describe('Function', () => {
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
});