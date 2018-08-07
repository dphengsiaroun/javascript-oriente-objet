const assert = require('assert');
const {
    Polynom
} = require('../polynom');

describe.only('Polynom', () => {
    it('should product', () => {
        const a = [1, 1];
        const b = [-2, 1];
        assert.deepStrictEqual(Polynom.product(a, b), [-2, -1, 1]);
    });

    it('should product', () => {
        const a = [1, 3, 5];
        const b = [4, 2, 1];
        assert.deepStrictEqual(Polynom.product(a, b), [4, 14, 27, 13, 5]);
    });

    it('should product', () => {
        const a = [1, 0, 0, 0, 0, 1];
        const b = [-1, 0, 0, 1];
        assert.deepStrictEqual(Polynom.product(a, b), [-1, 0, 0, 1, 0, -1, 0, 0, 1]);
    });

    it('should get degree', () => {
        const a = [1, 0, 0, 0, 0, 1, 0, 0];
        assert.equal(Polynom.degreeOf(a), 5);
    });

    it('should get degree -Infinity', () => {
        const a = [0, 0, 0, 0, 0, 0, 0, 0];
        assert.equal(Polynom.degreeOf(a), -Infinity);
    });

    it('should get dominant coef', () => {
        const a = [1, 3, 4, 2, 0];
        assert.equal(Polynom.dominantCoef(a), 2);
    });
});