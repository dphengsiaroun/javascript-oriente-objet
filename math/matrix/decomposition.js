const {
    Vector
} = require('../vector');

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

    Matrix.performDUDecomposition = function (a) {
        const d = Matrix.identity(a.length);
        for (let i = 0; i < a.length; i++) {
            d[i][i] = a[i][i];
        }
        const dInverse = Matrix.identity(a.length);
        for (let i = 0; i < a.length; i++) {
            dInverse[i][i] = 1 / d[i][i];
        }
        const u = Matrix.product(dInverse, a);
        return {
            d,
            u
        };
    };

    Matrix.performLDUDecomposition = function (a) {
        const {
            l,
            u
        } = Matrix.performLUDecomposition(a);
        const du = Matrix.performDUDecomposition(u);
        return {
            l,
            d: du.d,
            u: du.u
        };
    };

    Matrix.performQRGramSchmidtDecomposition = function (a) {
        const n = a.length;

        function proj(u, a) {
            return Vector.multiply(Vector.dotProduct(u, a) / Vector.dotProduct(u, u), u);
        }

        const aSeq = Matrix.transpose(a);

        const uSeq = new Array(n).fill(0);
        uSeq.forEach((x, i, uSeq) => {
            let result = aSeq[i];
            for (let j = 0; j < i; j++) {
                const uj = uSeq[j];
                result = Vector.minus(result, proj(uj, aSeq[i]));
            }
            uSeq[i] = result;
        });

        const eSeq = uSeq.map(u => Vector.multiply(1 / Vector.euclideanNorm(u), u));

        const q = Matrix.transpose(eSeq);
        const r = Matrix.zero(n);
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const result = Vector.dotProduct(eSeq[i], aSeq[j]);
                r[i][j] = result;
            }
        }

        return {
            q,
            r
        };
    };
};