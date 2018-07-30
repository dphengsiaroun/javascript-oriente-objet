const assert = require('assert');
const {
    Vector
} = require('../vector');

describe.only('Vector', () => {

    it('should euclidean norm', () => {
        const a = [3, 4];
        assert.deepStrictEqual(Vector.euclideanNorm(a), 5);
    });

    it('should be a norm', () => {
        const a = [0, 0, 0, 0, 0];
        assert.deepStrictEqual(Vector.euclideanNorm(a), 0);
        const u = [1, 2];
        const v = [3, 4];
        assert.ok(Vector.euclideanNorm(Vector.plus(u, v)) < Vector.euclideanNorm(u) + Vector.euclideanNorm(v));
        const n = 3;
        assert.ok(n * Vector.euclideanNorm(v) === Vector.euclideanNorm(Vector.scalarProduct(n, v)));

    });

    it('should be a norm', () => {
        const a = [1, 2];
        const b = [3, 4];
        assert.deepStrictEqual(Vector.plus(a, b), [4, 6]);
    });

    it('should compute the scalarProduct', () => {
        const a = [3, 4];
        assert.deepStrictEqual(Vector.scalarProduct(2, a), [6, 8]);
    });

    it('should compute the manhattan norm', () => {
        const a = [3, 1, 6, -2];
        assert.deepStrictEqual(Vector.manhattanNorm(a), 12);
    });


});