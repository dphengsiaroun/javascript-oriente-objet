const assert = require('assert');
const {
    Polynom
} = require('../math/polynom');

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
        const a = [1, 0, 0, 0, 0, -1, 0, 0];
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

    it('should multiply', () => {
        const a = [1, 1, 5];
        assert.deepStrictEqual(Polynom.multiply(4, a), [4, 4, 20]);
    });

    it('should plus', () => {
        const a = [1, 1, 5, 2];
        const b = [2, 3, 0];
        assert.deepStrictEqual(Polynom.plus(a, b), [3, 4, 5, 2]);
    });

    it('should minus', () => {
        const a = [6, -5, 3];
        const b = [3, 0, 3];
        assert.deepStrictEqual(Polynom.minus(a, b), [3, -5]);
    });

    it('should divide', () => {
        const a = [1, 1, 5];
        const b = [-1, 1];
        assert.deepStrictEqual(Polynom.divide(a, b), {
            quotient: [6, 5],
            remainder: [7]
        });
    });

    it('should divide also', () => {
        const a = [6, 1, 3, 6];
        const b = [1, 0, 1];
        assert.deepStrictEqual(Polynom.divide(a, b), {
            quotient: [3, 6],
            remainder: [3, -5]
        });
    });

    it('should normalize', () => {
        const a = [4, 0, 6, 2];
        assert.deepStrictEqual(Polynom.normalize(a), [2, 0, 3, 1]);
    });

    it('should canonize', () => {
        const a = [0, 0, 0, 0];
        assert.deepStrictEqual(Polynom.canonize(a), []);
    });

    it('should get the PGCD', () => {
        const a = [2, 6, 6, 2];
        const b = [1, 2, 2, 1];
        assert.deepStrictEqual(Polynom.pgcd(a, b), [1, 1]);
    });

    it('should get is irreductible', () => {
        const a = [1, 1, 1];
        assert.equal(Polynom.isIrreductible(a), true);
    });
});