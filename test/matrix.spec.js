const assert = require('assert');
const {
    Matrix
} = require('../matrix');

describe.only('Matrix', () => {
    it('should add', () => {
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

    it('should add', () => {
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

    it('should add', () => {
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
});
