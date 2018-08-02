const assert = require('assert');

describe.only('Trigonometry', () => {

    it('should be equal to 1', () => {
        const a = 1000 * Math.random();
        assert.ok(Math.cos(a)**2 + Math.sin(a)**2 -1 < 1e-15);
    });
    

});