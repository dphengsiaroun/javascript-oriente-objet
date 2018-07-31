const assert = require('assert');
const {
    Matrix
} = require('../matrix');

describe('Matrix', () => {
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

    it('should do the product of two matrixes', () => {
        const a = [
            [2, 3],
            [5, 1],
            [6, 7],
        ];
        const b = [
            [1, 5, 8, 0],
            [3, 2, 7, 1],
        ]
        assert.deepStrictEqual(Matrix.product(a, b), [
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
            [1, 1],
            [0, 1],
        ];
        assert.deepStrictEqual(Matrix.det(a), 1);
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

    it('should compute the multiply', () => {
        const a = [
            [1, 2],
            [3, 4]
        ];
        assert.deepStrictEqual(Matrix.multiply(3, a), [
            [3, 6],
            [9, 12]
        ]);
    });

    it('should compute the comatrix', () => {
        const a = [
            [1, 1],
            [0, 1],
        ];
        assert.deepStrictEqual(Matrix.comatrix(a), [
            [1, 0],
            [-1, 1],
        ]);
    });

    it('should inverse the matrix', () => {
        const a = [
            [1, 1],
            [0, 1],
        ];
        assert.deepStrictEqual(Matrix.inverse(a), [
            [1, -1],
            [0, 1],
        ]);
    });

    it('should convert the negative zero', () => {
        const a = [
            [-0, 1],
            [-5.551115123125783e-17, -0]
        ];
        assert.deepStrictEqual(Matrix.beautiful(a), [
            [0, 1],
            [0, 0]
        ]);
    });

    it('should retrieve identity', () => {
        const a = Matrix.random(4);
        assert.deepStrictEqual(Matrix.minus(Matrix.product(a, Matrix.inverse(a)), Matrix.identity(a.length)), Matrix.zero(a.length));
    }).timeout(1000000);

    it('should solved the equation', () => {
        const a = [
            [200, 1],
            [-180, 1]
        ];

        const b = [400, -180 * 0.25];

        assert.deepStrictEqual(Matrix.solve(a, b), [1.1710526315789473, 165.78947368421052]);
    });

    it('should be a diagonal matrix', () => {
        const a = [
            [1, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 3, 0],
            [0, 0, 0, 4]
        ];
        assert.ok(Matrix.isDiagonal(a), true);
        const b = [
            [1, 0, 0, 0],
            [0, 2, 0, 0],
            [2, 0, 3, 0],
            [0, 0, 0, 4]
        ];
        assert.ok(Matrix.isDiagonal(a), false);
    });

    it('should be a is Triangular matrix', () => {
        const a = [
            [1, 3, 5, 8],
            [0, 2, 3, 9],
            [0, 0, 3, 7],
            [0, 0, 0, 4]
        ];
        assert.ok(Matrix.isTriangular(a), true);
        const b = [
            [1, 6, 5, 8],
            [0, 2, 3, 9],
            [5, 0, 3, 7],
            [0, 3, 0, 4]
        ];
        assert.ok(Matrix.isTriangular(a), false);
    });

    it('should not be inversible', () => {
        const a = [
            [1, 0, 2],
            [0, 1, 1],
            [0, 0, 0]
        ];
        assert.throws(() => {
            Matrix.inverse(a);
        }, 'Matrix not inversible');
    });
    

});