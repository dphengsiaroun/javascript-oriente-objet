const assert = require('assert');
const {
    Vector
} = require('../vector');

describe.only('Vector', () => {

    it('should vector', () => {
        const a = [3, 4];
        assert.deepStrictEqual(Vector.euclideanNorm(a), 5);
    });

});