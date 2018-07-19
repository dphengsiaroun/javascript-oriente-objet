const assert = require('assert');
const { compare } = require('../array');

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
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.min((a, b) => compare(a[1], b[1])), [1, 8]);
    });

    it('min2 with callback', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.min2(n => (n[0]**2 + n[1]**2)**0.5), [1, 8]);
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

    it('map3', () => {
        const b = [3, 8, 5];
        assert.deepStrictEqual(b.map3(n => n * 2), [6, 16, 10]);
    });

    it('reverse2', () => {
        const b = [3, 8, 5];
        assert.deepStrictEqual(b.reverse2(), [5, 8, 3]);
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

    it('filter2', () => {
        const b = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
        assert.deepStrictEqual(b.filter2(n => n.length > 6), ['exuberant', 'destruction', 'present']);
    });

    it('sort2', () => {
        const b = [12, 2, 8, 20, 7];
        assert.deepStrictEqual(b.sort2(), [2, 7, 8, 12, 20]);
    });

    it('sort2 on table', () => {
        const b = [
            [1, 'Dany', 12],
            [2, 'Nadia', 15],
            [3, 'Jean-Louis', 35],
            [4, 'Yannis', 25],
        ];
        assert.deepStrictEqual(b.sort2((a, b) => compare(a[1], b[1])), [
            [1, 'Dany', 12],
            [3, 'Jean-Louis', 35],
            [2, 'Nadia', 15],
            [4, 'Yannis', 25],
        ]);
    });

    it('sort3 on table', () => {
        const b = [
            [1, 'Dany', 12],
            [2, 'Nadia', 15],
            [3, 'Jean-Louis', 35],
            [4, 'Yannis', 25],
        ];
        assert.deepStrictEqual(b.sort3((a, b) => compare(a[1], b[1])), [
            [1, 'Dany', 12],
            [3, 'Jean-Louis', 35],
            [2, 'Nadia', 15],
            [4, 'Yannis', 25],
        ]);
    });

    it('sort4', () => {
        const b = [20, 9, 8, 5, 2];
        assert.deepStrictEqual(b.sort4(), [2, 5, 8, 9, 20]);
    });

    it('sort4 with cb', () => {
        const b = [[8, 5], [3, 4], [6, 2]];
        const dist = p => (p[0]**2 + p[1]**2)**0.5;
        assert.deepStrictEqual(b.sort4((a, b) => compare(dist(a), dist(b))), [[3, 4], [6, 2], [8, 5]]);
    });

    it('sort5', (done) => {
        const b = [20, 9, 8, 5, 2];
        const sort5 = b.sort5();
        setTimeout(() => {
            assert.deepStrictEqual(sort5, [2, 5, 8, 9, 20]);
            done();
        }, 100); 
    });
    

});
