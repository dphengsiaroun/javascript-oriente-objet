const assert = require('assert');
const {
    Polynomial
} = require('../math/polynomial');

const rand = (min, max) => Math.round(Math.random() * (max - min) + min);

describe.only('Polynomial', () => {
    it('should product', () => {
        const a = [1, 1];
        const b = [-2, 1];
        assert.deepStrictEqual(Polynomial.product(a, b), [-2, -1, 1]);
    });

    it('should product', () => {
        const a = [1, 3, 5];
        const b = [4, 2, 1];
        assert.deepStrictEqual(Polynomial.product(a, b), [4, 14, 27, 13, 5]);
    });

    it('should product', () => {
        const a = [1, 0, 0, 0, 0, 1];
        const b = [-1, 0, 0, 1];
        assert.deepStrictEqual(Polynomial.product(a, b), [-1, 0, 0, 1, 0, -1, 0, 0, 1]);
    });

    it('should get degree', () => {
        const a = [1, 0, 0, 0, 0, -1, 0, 0];
        assert.equal(Polynomial.degreeOf(a), 5);
    });

    it('should get degree -1', () => {
        const a = [0, 0, 0, 0, 0, 0, 0, 0];
        assert.equal(Polynomial.degreeOf(a), -1);
    });

    it('should get the leading coef', () => {
        const a = [1, 3, 4, 2, 0];
        assert.equal(Polynomial.leadingCoef(a), 2);
    });

    it('should multiply', () => {
        const a = [1, 1, 5];
        assert.deepStrictEqual(Polynomial.multiply(4, a), [4, 4, 20]);
    });

    it('should plus', () => {
        const a = [1, 1, 5, 2];
        const b = [2, 3, 0];
        assert.deepStrictEqual(Polynomial.plus(a, b), [3, 4, 5, 2]);
    });

    it('should minus', () => {
        const a = [6, -5, 3];
        const b = [3, 0, 3];
        assert.deepStrictEqual(Polynomial.minus(a, b), [3, -5]);
    });

    it('should divide', () => {
        const a = [1, 1, 5];
        const b = [-1, 1];
        assert.deepStrictEqual(Polynomial.divide(a, b), {
            quotient: [6, 5],
            remainder: [7]
        });
    });

    it('should divide also', () => {
        const a = [6, 1, 3, 6];
        const b = [1, 0, 1];
        assert.deepStrictEqual(Polynomial.divide(a, b), {
            quotient: [3, 6],
            remainder: [3, -5]
        });
    });

    it('should normalize', () => {
        const a = [4, 0, 6, 2];
        assert.deepStrictEqual(Polynomial.normalize(a), [2, 0, 3, 1]);
    });

    it('should canonize', () => {
        const a = [0, 0, 0, 0];
        assert.deepStrictEqual(Polynomial.canonize(a), []);
    });

    it('should get the PGCD', () => {
        const a = [2, 6, 6, 2];
        const b = [1, 2, 2, 1];
        assert.deepStrictEqual(Polynomial.pgcd(a, b), [1, 1]);
    });

    it('should check if irreducible', () => {
        const a = [1, 1, 1];
        assert.equal(Polynomial.isIrreducible(a), true);
    });

    it('should get if two polynomials are prime between then', () => {
        const a = [1, 1, 1];
        const b = [2, 3, 4];
        assert.equal(Polynomial.arePrime(a, b), true);
    });

    it('should get the two bezout polynomials', () => {
        const a = [rand(0, 10), rand(0, 10), rand(1, 10)];
        const b = [rand(0, 10), rand(0, 10), rand(1, 10)];
        // const a = [9, 5, 7];
        // const b = [0, 7, 9];
        const {
            u,
            v
        } = Polynomial.bezout(a, b);
        const au_bv = Polynomial.plus(Polynomial.product(a, u), Polynomial.product(b, v));
        assert.deepStrictEqual(Polynomial.normalize(au_bv), Polynomial.pgcd(a, b));
    });

    it('should get the js format of the polynomial', () => {
        const a = [1, 1, 1];
        assert.equal(Polynomial.toString(a, 'js'), 'x**2 + x + 1');
    });
});