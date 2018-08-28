class Analysis {

    static findRootWithNewtonRaphson(fn) {
        const xSeq = [Math.random()];
        const ITERATION_MAX = 500;
        const EPSILON = 1e-18;
        for (let i = 1; i < ITERATION_MAX; i++) {
            const x = xSeq[i - 1];
            const y = fn(x);
            const d = Analysis.differentiate(fn)(x);
            if (d === 0) {
                xSeq[i] = x + Math.random();
            } else {
                xSeq[i] = x - (fn(x) / d);
            }
            // console.log('xSeq[i]', xSeq[i]);
            if (Math.abs(xSeq[i] - xSeq[i - 1]) < EPSILON) {
                return xSeq[i];
            }
        }
        return undefined;
        
    }

    static differentiate(fn) {
        const h = 1e-10;
        return x => (fn(x + h) - fn(x)) / h;
    }
}

module.exports = {
    Analysis
};