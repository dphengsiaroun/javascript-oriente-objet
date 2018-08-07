const assert = require('assert');
const {
    compare
} = require('../array');

describe('Sort should', () => {
    it('sort2', () => {
        const b = [12, 2, 8, 20, 7];
        assert.deepStrictEqual(b.sort2(), [2, 7, 8, 12, 20]);
    });

    it('sort2 on table', () => {
        const b = [
            [1, 'Dany', 12],
            [2, 'Nadia', 15],
            [3, 'Jean-Louis', 35],
            [4, 'Yannis', 25],
        ];
        assert.deepStrictEqual(b.sort2((a, b) => compare(a[1], b[1])), [
            [1, 'Dany', 12],
            [3, 'Jean-Louis', 35],
            [2, 'Nadia', 15],
            [4, 'Yannis', 25],
        ]);
    });

    it('sort3 on table', () => {
        const b = [
            [1, 'Dany', 12],
            [2, 'Nadia', 15],
            [3, 'Jean-Louis', 35],
            [4, 'Yannis', 25],
        ];
        assert.deepStrictEqual(b.sort3((a, b) => compare(a[1], b[1])), [
            [1, 'Dany', 12],
            [3, 'Jean-Louis', 35],
            [2, 'Nadia', 15],
            [4, 'Yannis', 25],
        ]);
    });

    it('sort4', () => {
        const b = [20, 9, 8, 5, 2];
        assert.deepStrictEqual(b.sort4(), [2, 5, 8, 9, 20]);
    });

    it('sort4 with cb', () => {
        const b = [
            [8, 5],
            [3, 4],
            [6, 2]
        ];
        const dist = p => (p[0] ** 2 + p[1] ** 2) ** 0.5;
        assert.deepStrictEqual(b.sort4((a, b) => compare(dist(a), dist(b))), [
            [3, 4],
            [6, 2],
            [8, 5]
        ]);
    });

    it('sort5', (done) => {
        const b = [20, 9, 8, 5, 2];
        b.sort5(200, (err, result) => {
            assert.deepStrictEqual(result, [2, 5, 8, 9, 20]);
            done();
        });
    });


});