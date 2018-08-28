const {
    round
} = require('./decimal');

class Analysis {

    static findRootWithNewtonRaphson(fn) {
        const xSeq = [Math.random()];
        const ITERATION_MAX = 5000;
        const EPSILON = 1e-10;
        for (let i = 1; i < ITERATION_MAX; i++) {
            const x = xSeq[i - 1];
            const y = fn(x);
            const d = Analysis.differentiate(fn)(x);
            if (d === 0) {
                xSeq[i] = x + Math.random();
            } else {
                xSeq[i] = x - (fn(x) / d);
            }
            if (Math.abs(xSeq[i] - xSeq[i - 1]) < EPSILON) {
                const result = round(xSeq[i]);
                return result;
            }
        }
        throw new Error('ITERATION_MAX reached.');
        // return undefined;
        
    }

    static differentiate(fn) {
        const h = 1e-10;
        return x => (fn(x + h) - fn(x)) / h;
    }
}

module.exports = {
    Analysis
};