const assert = require('assert');
const {
    Matrix
} = require('../matrix');

describe.only('Matrix', () => {
    it('should plus', () => {
        const a = [
            [2, 3, 5, 8],
            [2, 8, 6, 7],
            [1, 3, 9, 6],
        ];
        const b = [
            [3, 8, 5, 1],
            [2, 0, 1, 0],
            [0, 0, 8, 1],
        ]
        assert.deepStrictEqual(Matrix.plus(a, b), [
            [5, 11, 10, 9],
            [4, 8, 7, 7],
            [1, 3, 17, 7],
        ]);
    });

    it('should plus2', () => {
        const a = [
            [2, 3, 5, 8],
            [2, 8, 6, 7],
            [1, 3, 9, 6],
        ];
        const b = [
            [3, 8, 5, 1],
            [2, 0, 1, 0],
            [0, 0, 8, 1],
        ]
        assert.deepStrictEqual(Matrix.plus2(a, b), [
            [5, 11, 10, 9],
            [4, 8, 7, 7],
            [1, 3, 17, 7],
        ]);
    });

    it('should multiply', () => {
        const a = [
            [2, 3],
            [5, 1],
            [6, 7],
        ];
        const b = [
            [1, 5, 8, 0],
            [3, 2, 7, 1],
        ]
        assert.deepStrictEqual(Matrix.multiply(a, b), [
            [11, 16, 37, 3],
            [8, 27, 47, 1],
            [27, 44, 97, 7],
        ]);
    });

    it('should generate diagonal', () => {
        const a = Matrix.diagonal(3);
        // console.log(a);
        assert.deepStrictEqual(a, [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]);
    });

    it('should generate opposite', () => {
        const a = [
            [2, 3, 5, 8],
            [2, 8, 6, 7],
            [1, 3, 9, 6],
        ];
        assert.deepStrictEqual(Matrix.opposite(a), [
            [-2, -3, -5, -8],
            [-2, -8, -6, -7],
            [-1, -3, -9, -6],
        ]);
    });

    it('should minus', () => {
        const a = [
            [2, 3, 5, 8],
            [2, 8, 6, 7],
            [1, 3, 9, 6],
        ];
        const b = [
            [3, 8, 5, 1],
            [2, 0, 1, 0],
            [0, 0, 8, 1],
        ]
        assert.deepStrictEqual(Matrix.minus(a, b), [
            [-1, -5, 0, 7],
            [0, 8, 5, 7],
            [1, 3, 1, 5],
        ]);
    });

    it('should transpose', () => {
        const a = [
            [2, 3, 5, 8],
            [2, 8, 6, 7],
            [1, 3, 9, 6],
        ];
        assert.deepStrictEqual(Matrix.transpose(a), [
            [2, 2, 1],
            [3, 8, 3],
            [5, 6, 9],
            [8, 7, 6],
        ]);
    });

    it('transpose of transpose', () => {
        const a = [
            [2, 3, 5, 8],
            [2, 8, 6, 7],
            [1, 3, 9, 6],
        ];
        assert.deepStrictEqual(Matrix.transpose(Matrix.transpose(a)), a);
    });

    it('should compute the matrix determinant', () => {
        const a = [
            [0, 3, 5],
            [-1, 1, 4],
            [0, 0, 2],
        ];
        assert.deepStrictEqual(Matrix.det(a), 6);
    });

    it('should compute the sub-matrix', () => {
        const a = [
            [0, 3, 5],
            [-1, 1, 4],
            [0, 0, 2],
        ];
        assert.deepStrictEqual(Matrix.submatrix(a, 1, 2), [
            [0, 3],
            [0, 0]
        ]);
    });

    it('should compute the cofactor', () => {
        const a = [
            [0, 3, 5],
            [-1, 1, 4],
            [0, 0, 2],
        ];
        assert.equal(Matrix.cofactor(a, 1, 2), 0);
    });

    it('should compute the scalarProduct', () => {
        const a = [
            [1, 2],
            [3, 4]
        ];
        assert.deepStrictEqual(Matrix.scalarProduct(3, a), [
            [3, 6],
            [9, 12]
        ]);
    });

    // it('should inverse the matrix', () => {
    //     const a = [
    //         [0, 1],
    //         [1, 0],
    //     ];
    //     assert.equal(Matrix.inverse(a), a);
    // });
});
