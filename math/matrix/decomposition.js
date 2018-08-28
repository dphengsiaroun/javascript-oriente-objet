module.exports = function (Matrix) {
    Matrix.performLUDecomposition = function (a) {
        const n = a.length;
        const aSeq = [a];
        const lSeq = [];
        for (let i = 0; i < n - 1; i++) {
            const li = Matrix.identity(n);
            for (let j = i + 1; j < n; j++) {
                li[j][i] = -aSeq[i][j][i] / aSeq[i][i][i];
            }
            lSeq.push(li);
            const ai = Matrix.product(lSeq[i], aSeq[i]);
            aSeq.push(ai);
        }
        const lInverse = Matrix.product(...lSeq.reverse());
        const l = Matrix.inverse(lInverse);
        const u = aSeq[n - 1];
        return {
            l,
            u
        };
    };

    Matrix.performLDUDecomposition = function (a) {
        const {l, u} = Matrix.performLUDecomposition(a);
        const d = Matrix.identity(a.length);
        for (let i = 0; i < a.length; i++) {
            d[i][i] = u[i][i];
        }
        const dInverse = Matrix.identity(a.length);
        for (let i = 0; i < a.length; i++) {
            dInverse[i][i] = 1 / u[i][i];
        }     
        const u2 = Matrix.product(dInverse, u);
        return {l, d, u: u2};
    };
};