module.exports = function (Matrix) {
    Matrix.performLUDecomposition = function (a) {
        const n = a.length;
        const aSeq = [a];
        const lSeq = [];
        for (let i = 0; i < n - 1; i++) {
            const li = Matrix.diagonal(n);
            for (let j = i + 1; j < n; j++) {
                li[j][i] = -aSeq[i][j][i] / aSeq[i][i][i];
            }
            lSeq.push(li);
            const ai = Matrix.product(lSeq[i], aSeq[i]);
            aSeq.push(ai);
        }
        const prod = lSeq.reverse().reduce((acc, n) => {
            return Matrix.product(acc, n);
        }, Matrix.diagonal(n));
        const l = Matrix.inverse(prod);
        const u = aSeq[n - 1];
        return {
            l,
            u
        };
    };
};