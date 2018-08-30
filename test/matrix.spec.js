const assert = require('assert');
const {
    Matrix
} = require('../math/matrix');

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
        ];
        const c = [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        assert.deepStrictEqual(Matrix.plus(a, b, c), [
            [6, 11, 10, 9],
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
        const a = Matrix.identity(3);
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

    it('should solve the equation', () => {
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

    it('should be a Triangular matrix', () => {
        const a = [
            [1, 3, 5, 8],
            [0, 2, 3, 9],
            [0, 0, 3, 7],
            [0, 0, 0, 4]
        ];
        assert.equal(Matrix.isTriangular(a), true);
    });

    it('should not be a Triangular matrix', () => {
        const b = [
            [1, 6, 5, 8],
            [0, 2, 3, 9],
            [5, 1, 3, 7],
            [0, 3, 0, 4]
        ];
        assert.equal(Matrix.isTriangular(b), false);
    });

    it('should be a is Triangular Sup matrix', () => {
        const a = [
            [1, 3, 5, 8],
            [0, 2, 3, 9],
            [0, 0, 3, 7],
            [0, 0, 0, 4]
        ];
        assert.equal(Matrix.isTriangularSup(a), true);
    });

    it('should be a is Triangular Inf matrix', () => {
        const a = [
            [1, 0, 0, 0],
            [3, 2, 0, 0],
            [5, 3, 3, 0],
            [8, 9, 7, 4]
        ];
        assert.equal(Matrix.isTriangularInf(a), true);
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

    it('should be equals', () => {
        const a = [
            [1, 0, 2],
            [0, 1, 1],
            [0, 0, 0]
        ];
        assert.equal(Matrix.equals(a, a), true);
    });

    it('should not be equals', () => {
        const a = [
            [1, 0, 2],
            [0, 1, 1],
            [0, 0, 0]
        ];
        const b = [
            [1, 0, 2],
            [0, 1, 1],
            [2, 0, 0]
        ];
        assert.equal(Matrix.equals(a, b), false);
    });

    it('should not be symetric', () => {
        const a = [
            [1, 0, 2],
            [0, 1, 1],
            [0, 0, 0]
        ];
        assert.equal(Matrix.isSymetric(a), false);
    });

    it('should be symetric', () => {
        const a = [
            [0, 2, 4],
            [2, 1, 1],
            [4, 1, 0]
        ];
        assert.equal(Matrix.isSymetric(a), true);
    });

    it('should LU decompose', () => {
        const a = [
            [4, 3, 2, 1],
            [6, 3, 1, 2],
            [1, 3, 1, 3],
            [1, 5, 1, 3],
        ];

        const {
            l,
            u
        } = Matrix.performLUDecomposition(a);
        assert.equal(Matrix.isUniTriangularInf(l), true);
        assert.equal(Matrix.isTriangularSup(u), true);
        assert.deepStrictEqual(Matrix.product(l, u), a);
    });

    it('should LDU decompose', () => {
        const a = [
            [4, 3, 2, 1],
            [6, 3, 1, 2],
            [1, 3, 1, 3],
            [1, 5, 1, 3],
        ];

        const {
            l,
            d,
            u
        } = Matrix.performLDUDecomposition(a);
        assert.equal(Matrix.isUniTriangularInf(l), true);
        assert.equal(Matrix.isDiagonal(d), true);
        assert.equal(Matrix.isUniTriangularSup(u), true);
        assert.deepStrictEqual(Matrix.product(l, d, u), a);
    });

    it('should be orthogonal', () => {
        const a = [
            [Math.cos(1), -Math.sin(1)],
            [Math.sin(1), Math.cos(1)]
        ];
        assert.equal(Matrix.isOrthogonal(a), true);
    });

    it('should QR decompose with Gram-Schmidt method', () => {
        // const a = [
        //     [12, -51, 4],
        //     [6, 167, -68],
        //     [-4, 24, -41]
        // ];

        const a = [
            [4, 3, 2, 1],
            [6, 3, 1, 2],
            [1, 3, 1, 3],
            [1, 5, 1, 3],
        ];
        // const a = [
        //     [Math.random(), Math.random()],
        //     [Math.random(), Math.random()],
        // ];

        const {
            q,
            r,
        } = Matrix.performQRGramSchmidtDecomposition(a);
        assert.equal(Matrix.isOrthogonal(q), true);
        assert.equal(Matrix.isTriangularSup(r), true);
        assert.deepStrictEqual(Matrix.product(q, r), a);
    });

    it('should perform a DU decomposition from a triangular matrix', () => {
        const a = [
            [4, 3, 2, 1],
            [0, 3, 1, 2],
            [0, 0, 1, 3],
            [0, 0, 0, 3],
        ];
        const {
            d,
            u,
        } = Matrix.performDUDecomposition(a);
        assert.equal(Matrix.isDiagonal(d), true);
        assert.equal(Matrix.isUniTriangularSup(u), true);
        assert.deepStrictEqual(Matrix.product(d, u), a);
    });

    it('should QDR decompose with Gram-Schmidt method', () => {
        // const a = [
        //     [12, -51, 4],
        //     [6, 167, -68],
        //     [-4, 24, -41]
        // ];

        // const a = [
        //     [4, 3, 2, 1],
        //     [6, 3, 1, 2],
        //     [1, 3, 1, 3],
        //     [1, 5, 1, 3],
        // ];
        // const a = [
        //     [Math.random(), Math.random()],
        //     [Math.random(), Math.random()],
        // ];
        const a = [
            [1, 2],
            [3, 4],
        ];

        const {
            q,
            d,
            r,
        } = Matrix.performQDRGramSchmidtDecomposition(a);
        assert.equal(Matrix.isOrthogonal(q), true);
        assert.equal(Matrix.isDiagonal(d), true);
        assert.equal(Matrix.isUniTriangularSup(r), true);
        assert.deepStrictEqual(Matrix.product(q, d, r), a);
    });

    it('should compute the characteristic polynomial', () => {
        const a = [
            [1, 2, 0],
            [0, 3, 0],
            [2, -4, 2],
        ];
        const p = Matrix.getCharacteristicPolynomial(a);
        assert.deepStrictEqual(p, [6, -11, 6, -1]);
    });

    it('should compute the eigenvalues', () => {
        const a = [
            [1, 2, 0],
            [0, 1, 0],
            [2, -4, 2],
        ];

        const lambdas = Matrix.getEigenvalues(a);
        assert.deepStrictEqual(lambdas, [{
                ev: 1,
                order: 2
            },
            {
                ev: 2,
                order: 1
            }
        ]);
    });

    it('should compute the trace', () => {
        const a = [
            [1, 2, 0],
            [0, 1, 0],
            [2, -4, 2],
        ];

        const trace = Matrix.trace(a);
        assert.equal(trace, 4);
    });

    it('should check if isZeroRow', () => {
        const a = [
            [0, 2, 0],
            [0, 0, 0],
            [0, -4, 1],
        ];
        assert.equal(Matrix.getRowType(a, 0).isNull, false);
        assert.equal(Matrix.getRowType(a, 1).isNull, true);
        assert.equal(Matrix.getRowType(a, 2).isNull, false);
    });

    it('should check echelon form', () => {
        const a = [
            [-8, 0, 0],
            [2, 3, 4],
            [0, 0, 5],
        ];
        const b = [
            [1, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        assert.equal(Matrix.isEchelonForm(a), false);
        assert.equal(Matrix.isEchelonForm(b), true);
    });

    it('should get pivot', () => {
        const a = [
            [-8, 0, 0],
            [0, 3, 4],
            [0, 0, 5],
        ];
        assert.deepStrictEqual(Matrix.getPivot(a, 0), {
            value: -8,
            index: 0
        });
        assert.deepStrictEqual(Matrix.getPivot(a, 1), {
            value: 3,
            index: 1
        });
    });

    it('should check reduced echelon form', () => {
        const a = [
            [3, 0, 0],
            [0, 4, 5],
            [0, 0, 6],
        ];
        const b = [
            [1, 0, 0, 0],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        assert.equal(Matrix.isReducedEchelonForm(a), false);
        assert.equal(Matrix.isReducedEchelonForm(b), true);
    });

    it('should do a gaussian elimination', () => {
        const a = [
            [2, 2, 0, 0],
            [0, 0, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 3, 0],
        ];

        const b = Matrix.gaussElimination(a);
        assert.deepStrictEqual(b, [
            [1, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]);
    });

    it('should check the type of row', () => {
        const a = [
            [2, 3, 2, -1],
            [0, 1, 1, 1],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ];

        assert.deepStrictEqual(Matrix.getRowType(a, 0), {
            isReduced: false,
            isPure: false,
            isNull: false
        });
        assert.deepStrictEqual(Matrix.getRowType(a, 1), {
            isReduced: true,
            isPure: false,
            isNull: false
        });
        assert.deepStrictEqual(Matrix.getRowType(a, 2), {
            isReduced: true,
            isPure: true,
            isNull: false
        });
        assert.deepStrictEqual(Matrix.getRowType(a, 3), {
            isReduced: true,
            isPure: false,
            isNull: true
        });
    });

    it('should compute the kernel of a matrix', () => {
        const a = [
            [2, 2, 2, 2],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        const b = Matrix.kernel(a);
        assert.deepStrictEqual(b, [
            [0, -1, 1, 0],
            [0, -1, 0, 1],
        ]);
    });

    it('should compute the kernel of a matrix', () => {
        const a = [
            [2, 2, 2, 2],
            [0, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        const b = Matrix.kernel(a);
        assert.deepStrictEqual(b, [
            [0, -1, 1, 0],
            [0, -1, 0, 1],
        ]);
    });

    it('should compute the rank of a matrix', () => {
        const a = [
            [1, 0, 2, 3],
            [2, 0, 4, 6],
            [0, 2, 2, 0],
            [1, 2, 4, 3],
        ];

        const b = Matrix.rank(a);
        assert.equal(b, 2);
    });

    it('should compute the eigenvectors', () => {
        const a = [
            [1, 2, 0],
            [0, 1, 0],
            [2, -4, 2],
        ];

        const eigenvectors = Matrix.getEigenvectors(a);
        assert.deepStrictEqual(eigenvectors, [
            [-0.5, 0, 1],
            [0, 0, 1]
        ]);
    });

});