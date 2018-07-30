const assert = require('assert');
const {
    Permutation
} = require('../permutation');

describe.only('Permutation', () => {

    it('should give all the permutations', () => {
        const a = Permutation.getAll([1, 2, 3, 4]);
        console.log('a', a);
        assert.deepStrictEqual(a, [
            [ 1, 2, 3, 4 ],
            [ 1, 2, 4, 3 ],
            [ 1, 3, 2, 4 ],
            [ 1, 3, 4, 2 ],
            [ 1, 4, 2, 3 ],
            [ 1, 4, 3, 2 ],
            [ 2, 1, 3, 4 ],
            [ 2, 1, 4, 3 ],
            [ 2, 3, 1, 4 ],
            [ 2, 3, 4, 1 ],
            [ 2, 4, 1, 3 ],
            [ 2, 4, 3, 1 ],
            [ 3, 1, 2, 4 ],
            [ 3, 1, 4, 2 ],
            [ 3, 2, 1, 4 ],
            [ 3, 2, 4, 1 ],
            [ 3, 4, 1, 2 ],
            [ 3, 4, 2, 1 ],
            [ 4, 1, 2, 3 ],
            [ 4, 1, 3, 2 ],
            [ 4, 2, 1, 3 ],
            [ 4, 2, 3, 1 ],
            [ 4, 3, 1, 2 ],
            [ 4, 3, 2, 1 ] 
        ]);
    });

    it('should compute the signature of a given permutation', () => {
        const a = ['a', 'c', 'e'];
        assert.deepStrictEqual(Permutation.getSignature(a, ['c', 'e', 'a']), 1);
    });
});
