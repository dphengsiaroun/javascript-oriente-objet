const assert = require('assert');
const {
    Polynom
} = require('../polynom');

describe.only('Polynom', () => {
    it('should product', () => {
        const a = [1, 1];
        const b = [-2, 1];
        assert.deepStrictEqual(Polynom.product(a, b), [-2, -1, 1]);
    });
});