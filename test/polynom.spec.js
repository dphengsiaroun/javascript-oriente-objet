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

    it('should product', () => {
        const a = [1, 3, 5];
        const b = [4, 2, 1];
        assert.deepStrictEqual(Polynom.product(a, b), [4, 14, 27, 13, 5]);
    });

    it('should product', () => {
        const a = [1, 0, 0, 0, 0, 1];
        const b = [-1, 0, 0, 1];
        assert.deepStrictEqual(Polynom.product(a, b), [-1, 0, 0, 1, 0, -1, 0, 0, 1]);
    });
});