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

    static getSignature() {
        
    }


}

module.exports = {
    Permutation
};
