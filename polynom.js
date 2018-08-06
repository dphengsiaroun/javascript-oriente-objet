class Polynom {
    static product(a, b) {
        return new Array(a.length + b.length - 1).fill(0).map((n, i) => {
            return new Array(i + 1).fill(0).reduce((acc, n, j) => {
                const aj = a[j] ? a[j] : 0;
                const bk = b[i - j] ? b[i - j] : 0;
                console.log('i', i, 'j', j);
                console.log(`${acc} + ${aj} * ${bk}`);
                return acc + aj * bk;
            }, 0);
        })
    }
}

module.exports = {
    Polynom
};