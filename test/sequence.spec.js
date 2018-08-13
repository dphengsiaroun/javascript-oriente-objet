const assert = require('assert');
const {
    Sequence
} = require('../math/Sequence');

const rand = (min, max) => Math.round(Math.random() * (max - min) + min);

describe.only('Sequence', () => {

    it('arithmetic progression', () => {
        const u = n => 2 + 3 * n;
        const n = rand(0, 100000);
        assert.equal(Sequence.serie(u, n), (u(0) + u(n)) * (n + 1) / 2);
    });

    it('geometric progression', () => {
        const q = 2;
        const u = n => 3 * q ** n;
        const n = rand(0, 30);
        assert.equal(Sequence.serie(u, n), u(0) * (1 - q ** (n + 1)) / (1 - q));
    });

});