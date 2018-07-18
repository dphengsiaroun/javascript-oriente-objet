const assert = require('assert');

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

    it('should get [1, 8]', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.min(n => (n[0]**2 + n[1]**2)**0.5), [1, 8]);
    });

    it('should get [2, 13]', () => {
        const b = [[1, 11], [1, 8], [2, 13]];
        assert.deepStrictEqual(b.max(n => (n[0]**2 + n[1]**2)**0.5), [2, 13]);
    });
});
