const assert = require('assert');
const {
    Complex,
    deg2Rad
} = require('../complex');

describe('Complex', () => {
    it('should multiply', () => {
        const a = new Complex(3, 4);
        const b = new Complex(1, 1);
        assert.deepStrictEqual(a.multiply(b), new Complex(-1, 7));
    });

    it('should convert to polar', () => {
        const a = Complex.newFromPolar(5, deg2Rad(10));
        const b = Complex.newFromPolar(2, deg2Rad(20));
        assert.equal(a.multiply(b).equals(Complex.newFromPolar(10, deg2Rad(30))), true);
    });
});


// describe.only('Array should', () => {
    
// });