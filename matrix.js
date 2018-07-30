const assert = require('assert');
const {
    Permutation
} = require('./permutation');


class Matrix {

    static plus(a, b) {
        const sizeA = Matrix.getSize(a);
        const sizeB = Matrix.getSize(b);

        assert.deepStrictEqual(sizeA, sizeB, 'Cannot add 2 matrix with different sizes.');

        const result = new Array(sizeA[0]).fill(0)
            .map((r, i) => new Array(sizeA[1]).fill(0).map((c, j) => a[i][j] + b[i][j]));

        return result;
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

    static multiply(a, b) {
        const sizeA = Matrix.getSize(a);
        const sizeB = Matrix.getSize(b);

        assert.deepStrictEqual(sizeA[1], sizeB[0], 'Cannot multiply 2 matrix: a.col != b.row.');


        const result = new Array(sizeA[0]).fill(0)
            .map((r, i) => new Array(sizeB[1]).fill(0)
                .map((c, j) => new Array(sizeA[1]).fill(1).map((n, k) => a[i][k] * b[k][j]).sum()));
        return result;
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
        return Matrix.zero(n).map((r, i) => r.map((c,j) => i === j ? 1 : 0));
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
        return a.filter((r, index) => i !== index).map(r => r.filter((c, index) => j !== index));
    }

    static cofactor(a, i, j) {
        return ((-1)**(i + j)) * Matrix.det(Matrix.submatrix(a, i, j));
    }

    static scalarProduct(n, a) {
        return a.map(r => r.map(c => c * n));
    }

    static inverse(a) {
        return Matrix.scalarProduct(1 / Matrix.det(a), Matrix.transpose(Matrix.comatrix(a)));
    }
}

module.exports = {
    Matrix
};