const assert = require('assert');

const {
    getReversedSortedArray,
    isEven,
} = require('../function');

describe('Function', () => {
    it('getReversedSortedArray', () => {
        const b = [6, 3, 18, 10, 48, 2];
        assert.deepStrictEqual(getReversedSortedArray(b), [48, 18, 10, 6, 3, 2]);
    });

    it('isEven', () => {
        assert.deepStrictEqual(isEven(3), false);
    });

});