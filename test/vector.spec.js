const assert = require('assert');
const {
    Vector
} = require('../math/vector');

describe('Vector', () => {

    it('should euclidean norm', () => {
        const a = [3, 4];
        assert.deepStrictEqual(Vector.euclideanNorm(a), 5);
    });

    it('should be a norm', () => {
        const a = [0, 0, 0, 0, 0];
        assert.deepStrictEqual(Vector.euclideanNorm(a), 0);
        const u = [1, 2];
        const v = [3, 4];
        assert.ok(Vector.euclideanNorm(Vector.plus(u, v)) <= Vector.euclideanNorm(u) + Vector.euclideanNorm(v));
        const n = 3;
        assert.ok(n * Vector.euclideanNorm(v) === Vector.euclideanNorm(Vector.multiply(n, v)));

    });

    it('should be a manhattanNorm', () => {
        const a = [0, 0, 0, 0, 0];
        assert.deepStrictEqual(Vector.manhattanNorm(a), 0);
        const u = [1, 2];
        const v = [3, 4];
        assert.ok(Vector.manhattanNorm(Vector.plus(u, v)) <= Vector.manhattanNorm(u) + Vector.manhattanNorm(v));
        const n = 3;
        assert.ok(n * Vector.manhattanNorm(v) === Vector.manhattanNorm(Vector.multiply(n, v)));
    });


    it('should be a norm', () => {
        const a = [1, 2];
        const b = [3, 4];
        assert.deepStrictEqual(Vector.plus(a, b), [4, 6]);
    });

    it('should compute the multiply', () => {
        const a = [3, 4];
        assert.deepStrictEqual(Vector.multiply(2, a), [6, 8]);
    });

    it('should compute the manhattan norm', () => {
        const a = [-3, 1, 6, -2];
        assert.deepStrictEqual(Vector.manhattanNorm(a), 12);
    });

    it('should compute the dot product', () => {
        const u = [2, 8];
        const v = [5, 7];
        assert.deepStrictEqual(Vector.dotProduct(u, v), 66);
    });

    it('should compute the cross product', () => {
        const u = [2, 8, 6];
        const v = [5, 7, 2];
        assert.deepStrictEqual(Vector.crossProduct(u, v), [-26, 26, -26]);
        const a = [2, 8];
        const b = [5, 7, 2];
        assert.throws(() => {
            Vector.crossProduct(a, b);
        }, 'Vector must have 3 dimensions');
    });
    
    it('should be orthogonal', () => {
        const u = [Math.random(), Math.random()];
        const c = Math.random();
        const v = [-c * u[1], c * u[0]];
        assert.ok(Vector.dotProduct(u, v) === 0);
    });

    it('the cross product of u and v is orthogonal with u and v', () => {
        const u = [Math.random(), Math.random(), Math.random()];
        const v = [Math.random(), -Math.random(), Math.random()];
        const w = Vector.crossProduct(u, v);
        const a = Vector.dotProduct(u, w);
        const b = Vector.dotProduct(v, w);
        assert.ok(a === 0);
        assert.ok(b === 0);
    });

    it('any combination of u and v is orthogonal with the cross product of u and v', () => {
        const u = [Math.random(), Math.random(), Math.random()];
        const v = [Math.random(), -Math.random(), Math.random()];
        const w = Vector.crossProduct(u, v);
        const t = Vector.plus(Vector.multiply(Math.random(), u), Vector.multiply(Math.random(), v));
        assert.ok(Vector.dotProduct(t, w) === 0);
    });


});