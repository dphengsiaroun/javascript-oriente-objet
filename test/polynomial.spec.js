const assert = require('assert');
const {
    Polynomial
} = require('../math/polynomial');

const rand = (min, max) => Math.round(Math.random() * (max - min) + min);

describe('Polynomial', () => {
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
        assert.equal(Polynomial.toString([1, 2, 1], 'js'), 'x**2 + 2*x + 1');
        assert.equal(Polynomial.toString([1, 1, 1], 'js'), 'x**2 + x + 1');
        assert.equal(Polynomial.toString([1, 2, 2], 'js'), '2*x**2 + 2*x + 1');
        assert.equal(Polynomial.toString([0, 0, 0], 'js'), '0');
        assert.equal(Polynomial.toString([-1, 2, -1], 'js'), '-x**2 + 2*x - 1');

        assert.equal(Polynomial.toString([1, 2, 1]), 'x^2 + 2x + 1');
        assert.equal(Polynomial.toString([1, 1, 1]), 'x^2 + x + 1');
        assert.equal(Polynomial.toString([1, 2, 2]), '2x^2 + 2x + 1');
        assert.equal(Polynomial.toString([0, 0, 0]), '0');
        assert.equal(Polynomial.toString([-1, 2, -1]), '-x^2 + 2x - 1');

        assert.equal(Polynomial.toString([1, 2, 1], 'html'), 'x<sup>2</sup> + 2x + 1');
        assert.equal(Polynomial.toString([1, 1, 1], 'html'), 'x<sup>2</sup> + x + 1');
        assert.equal(Polynomial.toString([1, 2, 2], 'html'), '2x<sup>2</sup> + 2x + 1');
        assert.equal(Polynomial.toString([0, 0, 0], 'html'), '0');
        assert.equal(Polynomial.toString([-1, 2, -1], 'html'), '-x<sup>2</sup> + 2x - 1');

    });

    it('should divide by increasing power order', () => {
        const a = [2, 2, 3];
        const b = [2, 1];
        assert.deepStrictEqual(Polynomial.divideByIPO(a, b, 0), {
            quotient: [1],
            remainder: [1, 3]
        });
        assert.deepStrictEqual(Polynomial.divideByIPO(a, b, 1), {
            quotient: [1, 0.5],
            remainder: [2.5]
        });
        assert.deepStrictEqual(Polynomial.divideByIPO(a, b, 2), {
            quotient: [1, 0.5, 1.25],
            remainder: [-1.25]
        });
    });

    it('should compute the ppcm', () => {
        const ap = [-1, 1];
        const bp = [-2, 1];
        const c = [1, 1];

        const a = Polynomial.product(c, ap);
        const b = Polynomial.product(c, bp);

        const pgcd = Polynomial.pgcd(a, b);

        assert.deepStrictEqual(pgcd, c);
        assert.deepStrictEqual(Polynomial.ppcm(a, b), Polynomial.product(a, bp));

    });

    it('should generate a polynomial from roots', () => {
        assert.deepStrictEqual(Polynomial.fromRoots(2, 3, 4), [-24, 26, -9, 1]);
    });

    it('should differentiate a polynomial', () => {
        assert.deepStrictEqual(Polynomial.differentiate([2, 3, 4]), [3, 8]);
    });

    it('should integrate a polynomial', () => {
        assert.deepStrictEqual(Polynomial.integrate([3, 8]), [0, 3, 4]);
    });

    it('should resolve the root of a polynomial with degree 0', () => {
        assert.deepStrictEqual(Polynomial.getRoots([1]), []);
    });

    it('should resolve the root of a polynomial with degree 1', () => {
        assert.deepStrictEqual(Polynomial.getRoots([1, 2]), [-1 / 2]);
    });

    it('should resolve the root of a polynomial with degree 2', () => {
        assert.deepStrictEqual(Polynomial.getRoots([2, -3, 1]), [1, 2]);
        assert.deepStrictEqual(Polynomial.getRoots([0, 0, 1]), [0, 0]);
        assert.deepStrictEqual(Polynomial.getRoots([2, 3, 4]), []);
        assert.deepStrictEqual(Polynomial.getRoots([1, 2, 1]), [-1, -1]);
    });

    it('should resolve the root of a polynomial with degree 3', () => {
        assert.deepStrictEqual(Polynomial.getRoots([0, 1, -3, 2]), [0, 0.5, 1]);
        assert.deepStrictEqual(Polynomial.getRoots([-2, 1, 0, 1]), [1]);
        assert.deepStrictEqual(Polynomial.getRoots([-2, -3, 0, 1]), [-1, -1, 2]);
        assert.deepStrictEqual(Polynomial.getRoots([0, -1, 0, 1]), [-1, 0, 1]);
        assert.deepStrictEqual(Polynomial.getRoots([1, 2, 3, 4]), [-0.605829586188268]);
        assert.deepStrictEqual(Polynomial.getRoots([-1, -1, 4, 4]), [-1, -0.5, 0.5]);
        assert.deepStrictEqual(Polynomial.getRoots(Polynomial.fromRoots(1, 1, 2)), [1, 1, 2]);
    });

    it('should power a polynomial', () => {
        assert.deepStrictEqual(Polynomial.pow([1, 2, 3], 4), [1, 8, 36, 104, 214, 312, 324, 216, 81]);
    });

    it('should compose 2 polynomials', () => {
        assert.deepStrictEqual(Polynomial.compose([1, 1, 1], [2, 1]), [7, 5, 1]);
    });

    it('should Tschirnhaus of degree 2', () => {
        assert.deepStrictEqual(Polynomial.compose([1, 1, 1], [-0.5, 1]), [0.75, 0, 1]);
    });

    it('should Tschirnhaus of degree 3', () => {
        assert.deepStrictEqual(Polynomial.compose([1, 1, 3, 1], [-1, 1]), [2, -2, 0, 1]);
    });

    it('should Tschirnhaus of degree 4', () => {
        assert.deepStrictEqual(Polynomial.compose([1, 1, 3, 4, 1], [-1, 1]), [0, 3, -3, 0, 1]);
    });

    it('should resolve the root of a polynomial with degree 4', () => {
        assert.deepStrictEqual(Polynomial.getRoots([24, -50, 35, -10, 1]), [1, 2, 3, 4]);
        assert.deepStrictEqual(Polynomial.getRoots([ -1, 0, 0, 0, 1 ]), [-1, 1]);
        assert.deepStrictEqual(Polynomial.getRoots([ -2, 1, 0, 0, 1 ]), [-1.3532099641993245, 1]);
        assert.deepStrictEqual(Polynomial.getRoots(Polynomial.pow([-1, 1], 4)), [1, 1, 1, 1]);
    });

    it('should resolve the root of a polynomial with degree 5', () => {
        const roots = [1.125, 2.2, 3, 4, 5, 6, 7];
        const p = Polynomial.fromRoots(...roots);
        assert.deepStrictEqual(Polynomial.getRoots(p), roots);
    });

});