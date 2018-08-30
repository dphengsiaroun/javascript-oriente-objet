const assert = require('assert');
const {
    Permutation
} = require('./permutation');
const {
    Polynomial
} = require('./polynomial');

const {
    round
} = require('./decimal');

require('../array');


class Matrix {

    static plus(a, b, ...args) {
        const sizeA = Matrix.getSize(a);
        const sizeB = Matrix.getSize(b);

        assert.deepStrictEqual(sizeA, sizeB, 'Cannot add 2 matrix with different sizes.');

        const sum = new Array(sizeA[0]).fill(0)
            .map((r, i) => new Array(sizeA[1]).fill(0).map((c, j) => a[i][j] + b[i][j]));

        const s = Matrix.beautiful(sum);
        if (args.length === 0) {
            return s;
        }
        return Matrix.plus(s, ...args);
    }

    static plus2(a, b) {
        const sizeA = Matrix.getSize(a);
        const sizeB = Matrix.getSize(b);

        assert.deepStrictEqual(sizeA, sizeB, 'Cannot add 2 matrix with different sizes.');

        const result = [];
        for (let i = 0; i < sizeA[0]; i++) {
            const r = [];
            for (let j = 0; j < sizeA[1]; j++) {
                r.push(a[i][j] + b[i][j]);
            }
            result.push(r);
        }

        return result;
    }

    static product(a, b, ...args) {
        const sizeA = Matrix.getSize(a);
        const sizeB = Matrix.getSize(b);

        assert.deepStrictEqual(sizeA[1], sizeB[0], 'Cannot multiply 2 matrix: a.col != b.row.');


        const p = new Array(sizeA[0]).fill(0)
            .map((r, i) => new Array(sizeB[1]).fill(0)
                .map((c, j) => new Array(sizeA[1]).fill(1).map((n, k) => a[i][k] * b[k][j]).sum()));
        const prod = Matrix.beautiful(p);
        if (args.length === 0) {
            return prod;
        }
        return Matrix.product(prod, ...args);
    }

    static getSize(arr) {
        Matrix.check(arr);
        return [arr.length, arr[0].length];
    }

    static check(a) {
        a.forEach((r, i, array) => {
            if (r.length !== array[0].length) {
                throw new Error('Bad matrix')
            }
        });
    }

    static zero(n) {
        return new Array(n).fill(0).map(x => new Array(n).fill(0));
    }

    static identity(n) {
        return Matrix.zero(n).map((r, i) => r.map((c, j) => i === j ? 1 : 0));
    }

    static opposite(a) {
        return a.map(r => r.map(c => -c));
    }

    static minus(a, b) {
        return Matrix.plus(a, Matrix.opposite(b));
    }

    static transpose(a) {
        return a[0].map((c, j) => a.map(r => r[j]));
    }

    static det(a) {
        const permutations = Permutation.getAll(new Array(a.length).fill(0).map((k, i) => i));
        return permutations.reduce((acc, p) =>
            acc + Permutation.getSignature(p) * p.reduce((acc, j, i) => acc * a[i][j], 1), 0);
    }

    static submatrix(a, i, j) {
        return a.filter((r, index) => i !== index).map(r => r.filter((c, jj) => j !== jj));
    }

    static cofactor(a, i, j) {
        return ((-1) ** (i + j)) * Matrix.det(Matrix.submatrix(a, i, j));
    }

    static multiply(n, a) {
        return a.map(r => r.map(c => c * n));
    }

    static comatrix(a) {
        return Matrix.beautiful(new Array(a.length).fill(0).map((r, i) => new Array(a.length).fill(0).map((c, j) => Matrix.cofactor(a, i, j))));
    }

    static inverse(a) {
        const det = Matrix.det(a);
        if (det === 0) {
            throw new Error('Matrix not inversible');
        }
        return Matrix.beautiful(Matrix.multiply(1 / det, Matrix.transpose(Matrix.comatrix(a))));
    }

    static beautiful(a) {
        return a.map(r => r.map(c => round(c)));
    }

    static identity(n) {
        return new Array(n).fill(0).map((r, i) => new Array(n).fill(0).map((c, j) => i === j ? 1 : 0));
    }

    static random(n) {
        return new Array(n).fill(0).map(r => new Array(n).fill(0).map(c => Math.random()));
    }

    /**
     * Solve the equation AX = B
     *
     * @static
     * @param {*} a Matrix A
     * @param {*} b Vector B
     * @returns A vector of solution
     * @memberof Matrix 
     */
    static solve(a, b) {
        return Matrix.transpose(Matrix.product(Matrix.inverse(a), Matrix.transpose([b])))[0];
    }

    static isDiagonal(a) {
        return Matrix.isTriangularInf(a) && Matrix.isTriangularSup(a);
    }

    static isTriangular(a) {
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < i; j++) {
                if (a[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    static isTriangularSup(a) {
        for (let i = 1; i < a.length; i++) {
            for (let j = 0; j < i; j++) {
                if (a[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    static isUniTriangularSup(a) {
        if (!Matrix.isTriangularSup(a)) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i][i] !== 1) {
                return false;
            }
        }
        return true;
    }

    static isUniTriangularInf(a) {
        if (!Matrix.isTriangularInf(a)) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i][i] !== 1) {
                return false;
            }
        }
        return true;
    }

    static isTriangularInf(a) {
        for (let i = 0; i < a.length - 1; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (a[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    static equals(a, b) {
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                if (a[i][j] !== b[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    static isSymetric(a) {
        return Matrix.equals(Matrix.transpose(a), a);
    }

    static isOrthogonal(a) {
        const b = Matrix.product(Matrix.transpose(a), a);
        return Matrix.equals(b, Matrix.identity(a.length));
    }

    static getCharacteristicPolynomial(a) {
        const permutations = Permutation.getAll(new Array(a.length).fill(0).map((k, i) => i));
        return permutations.reduce((acc, perm) =>
            Polynomial.plus(
                acc,
                Polynomial.product(
                    [Permutation.getSignature(perm)],
                    perm.reduce((acc, j, i) => i === j ?
                        Polynomial.product(acc, [a[i][j], -1]) :
                        Polynomial.product(acc, [a[i][j]]), [1])
                )
            ), []);
    }

    static getEigenvalues(a) {
        const roots = Polynomial.getRoots(Matrix.getCharacteristicPolynomial(a));
        return roots.reduce((acc, n) => {
            const item = acc.find(c => c.ev === n);
            if (item) {
                item.order++;
            } else {
                acc.push({
                    ev: n,
                    order: 1
                });
            }
            return acc;
        }, []);
    }

    // static getEigenvectors(a) {
    //     const n = a.length;
    //     const eigenvalues = Matrix.getEigenvalues(a);
    //     console.log('eigenvalues', eigenvalues);
    //     console.log('a', a);
    //     for (let item of eigenvalues) {
    //         const l = item.ev;
    //         console.log('l', l);
    //         const a2 = Matrix.minus(a, Matrix.multiply(l, Matrix.identity(n)));
    //         console.log('a2', a2);
    //         console.log('det a2', Matrix.det(a2));
    //         const order = item.order;
    //         console.log('order', order);
    //         const a3 = Matrix.findInversibleSubmatrix(a2, order);
    //         console.log('a3', a3);
    //         console.log('det a3', Matrix.det(a3));
    //     }
    // }



    static trace(a) {
        return a.reduce((acc, r, i) => acc + r[i], 0);
    }

    static gaussElimination(a) {
        const n = a.length;
        const aSeq = [a];
        // Gaussian elimination
        for (let i = 0; i < n; i++) {
            const next = [...aSeq[i]];
            const index = aSeq[i].slice(i).findIndex((r, j) => {
                return r[i] !== 0;
            });
            if (index !== -1) {
                // Swap the line index with i.
                const tmp = next[index];
                next[index] = next[i];
                next[i] = tmp;
                // Normalize the line.
                next[i] = next[i].map((c, k) => c / next[i][i]);
                // Add multiple of this equation to remaining 
                // in order to eliminate the xi variable.
                for (let j = 0; j < n; j++) {
                    if (j === i) {
                        continue;
                    }
                    next[j] = next[j].map((c, k) => c - (next[j][i] * next[i][k]));
                }
            }
            for (let i = 0; i < n; i++) {
                if (Matrix.getRowType(next, i).isNull) {
                    const [row] = next.splice(i, 1);
                    next.push(row);
                }
            }
            aSeq.push(next);

        }
        const result = aSeq[aSeq.length - 1];
        assert.equal(Matrix.isReducedEchelonForm(result), true);
        return result;
    }

    /**
     * isNull: true if there are only zero in the line, ie [0, 0, 0, 0]
     * isReduced: true if the pivot is one, ie [0, 1, 2, 0]
     * isPure: true if there are only zero after the pivot, ie [0, 1, 0, 0]
     *
     * @static
     * @param {*} a the matrix to extract the line
     * @param {*} i the row index
     * @returns
     * @memberof Matrix
     */
    static getRowType(a, i) {
        const result = {
            isNull: true,
            isReduced: true,
            isPure: false
        };
        let pivot = 0;
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j]) {
                result.isNull = false;
                if (pivot === 0) {
                    pivot = a[i][j];
                    if (pivot === 1) {
                        result.isReduced = true;
                        result.isPure = true;
                    } else {
                        result.isReduced = false;
                    }
                } else {
                    result.isPure = false;
                }
            }
        }
        return result;
    }

    static isEchelonForm(a) {
        let zeroTotal = -1;
        for (let i = 0; i < a.length; i++) {
            let {
                value,
                index
            } = Matrix.getPivot(a, i);
            if (value === undefined) {
                index = a[i].length;
            }
            if (index > zeroTotal || index === a[i].length) {
                zeroTotal = index;
            } else {
                return false;
            }
        }
        return true;
    }

    static getPivot(a, i) {
        let value;
        let index = -1;
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j]) {
                value = a[i][j];
                index = j;
                break;
            }
        }
        return {
            value,
            index
        };
    }

    static isReducedEchelonForm(a) {
        let zeroTotal = -1;
        let lastVerifiedCols = -1;
        for (let i = 0; i < a.length; i++) {
            let {
                value,
                index
            } = Matrix.getPivot(a, i);
            if (value === undefined) {
                index = a[i].length;
            }
            if (index > zeroTotal || index === a[i].length) {
                zeroTotal = index;
            } else {
                return false;
            }
            if (value !== undefined && value !== 1) {
                return false;
            }
            if (lastVerifiedCols < index + 1) {
                lastVerifiedCols = index + 1;
            }
            for (let j = lastVerifiedCols; j < a[i].length; j++) {
                if (a[i][j] !== 0) {
                    for (let k = i + 1; k < a.length; k++) {
                        const index = Matrix.getPivot(a, i).index;
                        if (index === j) {
                            return false;
                        }
                        if (index > j) {
                            break;
                        }
                    }
                    lastVerifiedCols = j;
                }
            }
        }
        return true;
    }

    static kernel(a) {
        const result = [];
        const n = a.length;
        const t = Matrix.gaussElimination(a);
        const zeroList = [];
        for (let i = 0; i < n; i++) {
            const {
                isReduced,
                isPure,
                isNull
            } = Matrix.getRowType(t, i);
            if (isNull) {
                continue;
            }
            if (isPure) {
                zeroList.push(diagIndex);
            }
            if (diagIndex !== -1) {
                zeroList.push(diagIndex);
            }

        }

        return result;
    }

}

require('./matrix/decomposition')(Matrix);

module.exports = {
    Matrix
};