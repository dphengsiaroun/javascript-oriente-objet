class Vector {

    static euclideanNorm(a) {
        return a.reduce((acc, n) => acc + n**2, 0)**0.5;
    }

    static plus(a, b) {
        return a.map((c, i) => a[i] + b[i]);
    }

    static scalarProduct(n, a) {
        return a.map(r => r * n);
    }

    static manhattanNorm(a) {
        return a.reduce((acc, n) => acc + Math.abs(n), 0);
    }

    static dotProduct(u, v) {
        return u.reduce((acc, n, i) => acc + n * v[i], 0);
    }

}

module.exports = {
    Vector
};