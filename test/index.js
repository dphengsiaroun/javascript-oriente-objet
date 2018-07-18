const assert = require('assert');
const {
    flat
} = require('../function');
require('../array');

describe('Mes tests', () => {
    it('should get 3', () => {
        const b = [3, 5];
        assert.equal(b.min(), 3);
    });

    it('should get 5', () => {
        const b = [3, 5];
        assert.equal(b.max(), 5);
    });

    it('should get 8', () => {
        const b = [3, 5];
        assert.equal(b.sum(), 8);
    });

    it('should get 4', () => {
        const b = [3, 5];
        assert.equal(b.mean(), 4);
    });

    it('should get 3.872983346207417', () => {
        const b = [3, 5];
        assert.equal(b.geometricMean(), 3.872983346207417);
    });

    it('should get [1, 8]', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.min(n => (n[0]**2 + n[1]**2)**0.5), [1, 8]);
    });

    it('should get [2, 13]', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.max(n => (n[0]**2 + n[1]**2)**0.5), [2, 13]);
    });

    it('should get 11.25', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.equal(b.weightedArithmeticMean(), 11.25);
    });

    it('should get 16', () => {
        const b = [3, 8, 5];
        assert.equal(b.reduce2((acc, n) => acc + n, 0), 16);
    });

    it('should get [6, 16, 10]', () => {
        const b = [3, 8, 5];
        assert.deepStrictEqual(b.map2(n => n * 2), [6, 16, 10]);
    });

    it('should get [1, 2, 1, 8, 3]', () => {
        const b = [[[1], 2],[1, 8], 3];
        assert.deepStrictEqual(flat(b), [1, 2, 1, 8, 3]);
    });
    
});
