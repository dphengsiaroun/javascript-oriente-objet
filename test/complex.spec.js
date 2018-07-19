const assert = require('assert');
const {
    Complex
} = require('../complex');

describe.only('Complex', () => {
    it('should multiply', () => {
        const a = new Complex(3, 4);
        const b = new Complex(1, 1);
        assert.deepStrictEqual(a.multiply(b), new Complex(-1, 7));
    });

});


// describe.only('Array should', () => {
    
// });