const assert = require('assert');
const {
    Polynomial
} = require('./math/polynomial');

const rand = (min, max) => Math.round(Math.random() * (max - min) + min);

while (true) {
    const a = [rand(0, 10), rand(0, 10), rand(1, 10)];
    const b = [rand(0, 10), rand(0, 10), rand(1, 10)];
    // const a = [6, 8, 5];
    // const b = [2, 2, 3];
    console.log('a', a, 'b', b);
    const {
        u,
        v
    } = Polynomial.bezout(a, b);
    console.log('u', u, 'v', v);
    const au_bv = Polynomial.plus(Polynomial.product(a, u), Polynomial.product(b, v));
    console.log('au_bv', au_bv);
    assert.deepStrictEqual(Polynomial.normalize(au_bv), Polynomial.pgcd(a, b));
}