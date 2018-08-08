module.exports = function (Polynomial) {

    Polynomial.plus = (a, b) => {
        return Polynomial.canonize(new Array(Math.max(Polynomial.degreeOf(a), Polynomial.degreeOf(b)) + 1)
            .fill(0).map((n, i) => (a[i] ? a[i] : 0) + (b[i] ? b[i] : 0)));
    };

    Polynomial.minus = (a, b) => {
        return Polynomial.plus(a, Polynomial.multiply(-1, b));
    };

    Polynomial.product = (a, b) => {
        const result = new Array(a.length + b.length - 1).fill(0).map((n, i) =>
            new Array(i + 1).fill(0).reduce((acc, n, j) =>
                acc + (a[j] ? a[j] : 0) * (b[i - j] ? b[i - j] : 0), 0));
        return Polynomial.canonize(result);
    };

    Polynomial.pgcd = (a, b) => {
        let d = Polynomial.divide(a, b);
        let result = b;
        while (!Polynomial.isZero(d.remainder)) {
            result = d.remainder;
            d = Polynomial.divide(b, result);
        }
        return Polynomial.normalize(result);
    };

    Polynomial.ppcm = (a, b) => {
        const pgcd = Polynomial.pgcd(a, b);
        const bp = Polynomial.divide(b, pgcd).quotient;
        return Polynomial.product(a, bp);
    }

    Polynomial.bezout = (a, b) => {
        const u = [];
        const v = [];
        const r = [];

        u[0] = [1];
        v[0] = [];
        r[0] = a;

        u[1] = [];
        v[1] = [1];
        r[1] = b;

        let n = -1;
        do {
            n++;
            const division = Polynomial.divide(r[n], r[n + 1]);
            r[n + 2] = division.remainder;
            u[n + 2] = Polynomial.minus(u[n], Polynomial.product(division.quotient, u[n + 1]));
            v[n + 2] = Polynomial.minus(v[n], Polynomial.product(division.quotient, v[n + 1]));
        } while (!Polynomial.isZero(r[n + 2]));
        return {
            u: u[n + 1],
            v: v[n + 1]
        };
    }

};