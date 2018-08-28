const assert = require('assert');
const {
    Polynomial
} = require('../math/polynomial');

const {
    Analysis
} = require('../math/analysis');

describe('Analysis', () => {
    it('find root with Newton-Raphson', () => {
        const fn = Polynomial.toFunction([-120, 274, -225, 85, -15, 1]);
        const root = Analysis.findRootWithNewtonRaphson(fn);
        assert.deepStrictEqual(root, 1);
    });
});