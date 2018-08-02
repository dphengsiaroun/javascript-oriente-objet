const assert = require('assert');
const {
    compare
} = require('../array');

describe('Array should', () => {
    it('min', () => {
        const b = [3, 5];
        assert.equal(b.min(), 3);
    });

    it('min2', () => {
        const b = [3, 5, 2, 8];
        assert.equal(b.min2(), 2);
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

    it('stdDeviation', () => {
        const b = [3, 5];
        assert.equal(b.stdDeviation(), 1);
    });

    it('stdDeviation with 3 elements', () => {
        const b = [3, 5, 7];
        assert.equal(b.stdDeviation(), 1.632993161855452);
    });

    it('geometricMean', () => {
        const b = [3, 5];
        assert.equal(b.geometricMean(), 3.872983346207417);
    });

    it('min with callback', () => {
        const b = [
            [1, 11],
            [1, 8],
            [2, 13]
        ];
        assert.deepStrictEqual(b.min((a, b) => compare(a[1], b[1])), [1, 8]);
    });

    it('min2 with callback', () => {
        const b = [
            [1, 11],
            [1, 8],
            [2, 13]
        ];
        assert.deepStrictEqual(b.min2(n => (n[0] ** 2 + n[1] ** 2) ** 0.5), [1, 8]);
    });

    it('max with callback', () => {
        const b = [
            [1, 11],
            [1, 8],
            [2, 13]
        ];
        assert.deepStrictEqual(b.max(n => (n[0] ** 2 + n[1] ** 2) ** 0.5), [2, 13]);
    });

    it('weightedArithmeticMean', () => {
        const b = [
            [1, 11],
            [1, 8],
            [2, 13]
        ];
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

    it('map3', () => {
        const b = [3, 8, 5];
        assert.deepStrictEqual(b.map3(n => n * 2), [6, 16, 10]);
    });

    it('reverse2', () => {
        const b = [3, 8, 5];
        assert.deepStrictEqual(b.reverse2(), [5, 8, 3]);
    });

    it('flat', () => {
        const b = [
            [
                [1], 2
            ],
            [1, 8], 3
        ];
        assert.deepStrictEqual(b.flat(), [1, 2, 1, 8, 3]);
    });

    it('[].reduce2', () => {
        try {
            [].reduce2((acc, n) => acc + n);
        } catch (e) {
            assert.equal(e.message, 'Reduce2 needs initial value on empty array');
        }
    });

    it('filter2', () => {
        const b = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
        assert.deepStrictEqual(b.filter2(n => n.length > 6), ['exuberant', 'destruction', 'present']);
    });

    it('normalize', () => {
        const b = [3, 5, 7];
        assert.deepStrictEqual(b.normalize(10), [8, 10, 12]);
    });

    it('normalize with stdDeviation', () => {
        const b = [3, 5, 7];
        const c = b.normalize(10, 3);
        assert.deepStrictEqual(c, [ 6.325765385825232, 10, 13.674234614174765 ]);
    });

});
