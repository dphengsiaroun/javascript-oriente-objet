const assert = require('assert');
const {
    Permutation
} = require('./permutation');

require('../array');


class Matrix {

    static plus(a, b) {
        const sizeA = Matrix.getSize(a);
        const sizeB = Matrix.getSize(b);

        assert.deepStrictEqual(sizeA, sizeB, 'Cannot add 2 matrix with different sizes.');

        const result = new Array(sizeA[0]).fill(0)
            .map((r, i) => new Array(sizeA[1]).fill(0).map((c, j) => a[i][j] + b[i][j]));

        return Matrix.beautiful(result);
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

    static product(a, b) {
        const sizeA = Matrix.getSize(a);
        const sizeB = Matrix.getSize(b);

        assert.deepStrictEqual(sizeA[1], sizeB[0], 'Cannot multiply 2 matrix: a.col != b.row.');


        const result = new Array(sizeA[0]).fill(0)
            .map((r, i) => new Array(sizeB[1]).fill(0)
                .map((c, j) => new Array(sizeA[1]).fill(1).map((n, k) => a[i][k] * b[k][j]).sum()));
        return Matrix.beautiful(result);
    }

    static getSize(arr) {
        Matrix.check(arr);
        // console.log('size', [arr.length, arr[0].length]);
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
        return new Array(n).fill(new Array(n).fill(0));
    }

    static diagonal(n) {
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
        return a.map(r => r.map(c => Object.is(c, -0) ? 0 : Math.abs(c) < 1e-10 ? 0 : c));
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
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[i].length; j++) {
                if (i !== j) {
                    if (a[i][j] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
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

    

}

require('./matrix/decomposition')(Matrix);

module.exports = {
    Matrix
};