function beautiful(n) {
    return n < 1e-15 ? 0 : n;
}

class Vector {
    
    static euclideanNorm(a) {
        return a.reduce((acc, n) => acc + n**2, 0)**0.5;
    }

    static plus(a, b) {
        return a.map((c, i) => a[i] + b[i]);
    }

    static multiply(n, a) {
        return a.map(r => r * n);
    }

    static manhattanNorm(a) {
        return a.reduce((acc, n) => acc + Math.abs(n), 0);
    }

    static dotProduct(u, v) {
        return beautiful(u.reduce((acc, n, i) => acc + n * v[i], 0));
    }

    static crossProduct(u, v) {
        if (u.length !== 3 || v.length !== 3) {
            throw new Error('Vector must have 3 dimensions');
        }
        return [
            (u[1] * v[2]) - (u[2] * v[1]),
            (u[2] * v[0]) - (u[0] * v[2]),
            (u[0] * v[1]) - (u[1] * v[0]),
        ];
    }

}

module.exports = {
    Vector
};