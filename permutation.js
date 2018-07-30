class Permutation {


    static getAll(set) {
        const result = set.reduce((acc, k) => {
            if (set.length === 1) {
                return [[k]];
            }
            const remainingArray = set.filter(l => l !== k);
            const array = Permutation.getAll(remainingArray).map(p => p.unshift(k) && p);
            acc = acc.concat(array);
            return acc;
        }, []);
        return result;
    }

    static getSignature(p) {
        return p.reduce((acc, n, i) => {
            p.slice(i + 1).forEach((m, j) => {
                acc = acc * Math.sign(m - n);
            });
            return acc;
        }, 1);
    }

}

module.exports = {
    Permutation
};
