class Polynom {
    static product(a, b) {
        return new Array(a.length + b.length - 1).fill(0).map((n, i) =>
            new Array(i + 1).fill(0).reduce((acc, n, j) =>
                acc + (a[j] ? a[j] : 0) * (b[i - j] ? b[i - j] : 0), 0))
    }

    static degreeOf(a) {
        return a.reduce((acc, n, i) => n > 0 ? i : acc, -Infinity);
    }

    static dominantCoef(a) {
        return a.reduce((acc, n, i) => n > 0 ? n : acc, 0);
    }
}

module.exports = {
    Polynom
};