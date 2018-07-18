const assert = require('assert');

require('../array');

describe('Array should', () => {
    it('min', () => {
        const b = [3, 5];
        assert.equal(b.min(), 3);
    });

    it('max', () => {
        const b = [3, 5];
        assert.equal(b.max(), 5);
    });

    it('sum', () => {
        const b = [3, 5];
        assert.equal(b.sum(), 8);
    });

    it('mean', () => {
        const b = [3, 5];
        assert.equal(b.mean(), 4);
    });

    it('geometricMean', () => {
        const b = [3, 5];
        assert.equal(b.geometricMean(), 3.872983346207417);
    });

    it('min with callback', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.min(n => (n[0]**2 + n[1]**2)**0.5), [1, 8]);
    });

    it('max with callback', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.max(n => (n[0]**2 + n[1]**2)**0.5), [2, 13]);
    });

    it('weightedArithmeticMean', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.equal(b.weightedArithmeticMean(), 11.25);
    });

    it('reduce2', () => {
        const b = [3, 8, 5];
        assert.equal(b.reduce2((acc, n) => acc + n, 0), 16);
    });

    it('map2', () => {
        const b = [3, 8, 5];
        assert.deepStrictEqual(b.map2(n => n * 2), [6, 16, 10]);
    });

    it('flat', () => {
        const b = [[[1], 2],[1, 8], 3];
        assert.deepStrictEqual(b.flat(), [1, 2, 1, 8, 3]);
    });

    it('[].reduce2', () => {
        try {
            [].reduce2((acc, n) => acc + n);
        } catch (e) {
            assert.equal(e.message, 'Reduce2 needs initial value on empty array');
        }
    });
    
});
