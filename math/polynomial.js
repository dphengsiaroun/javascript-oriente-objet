class Polynomial {

    static canonize(a) {
        const deg = Polynomial.degreeOf(a);
        a.length = (deg === -Infinity ? -1 : deg) + 1;
        return a;
    }

    static product(a, b) {
        return new Array(a.length + b.length - 1).fill(0).map((n, i) =>
            new Array(i + 1).fill(0).reduce((acc, n, j) =>
                acc + (a[j] ? a[j] : 0) * (b[i - j] ? b[i - j] : 0), 0))
    }

    static degreeOf(a) {
        return a.reduce((acc, n, i) => n ? i : acc, -Infinity);
    }

    static dominantCoef(a) {
        return a.reduce((acc, n, i) => n ? n : acc, 0);
    }

    static multiply(n, a) {
        return a.map(c => n * c);
    }

    static plus(a, b) {
        return Polynomial.canonize(new Array(Math.max(Polynomial.degreeOf(a), Polynomial.degreeOf(b)) + 1)
            .fill(0).map((n, i) => (a[i] ? a[i] : 0) + (b[i] ? b[i] : 0)));
    }

    static minus(a, b) {
        return Polynomial.canonize(new Array(Math.max(Polynomial.degreeOf(a), Polynomial.degreeOf(b)) + 1)
            .fill(0).map((n, i) => (a[i] ? a[i] : 0) - (b[i] ? b[i] : 0)));
    }

    static term(coef, degree) {
        const result = new Array(degree + 1).fill(0);
        result[degree] = coef;
        return result;
    }

    static divide(a, b) {
        const dega = Polynomial.degreeOf(a);
        const degb = Polynomial.degreeOf(b);
        const degq = dega - degb;

        if (degq < 0) {
            return {
                quotient: [],
                remainder: Polynomial.canonize(a)
            };
        }
        const ca = Polynomial.dominantCoef(a);
        const cb = Polynomial.dominantCoef(b);
        const cq = ca / cb;
        const q = Polynomial.term(cq, degq);

        const p = Polynomial.product(q, b);
        const remainder = Polynomial.minus(a, p);

        if (degq === 0) {
            return {
                quotient: [cq],
                remainder
            };
        }
        const division = Polynomial.divide(remainder, b);
        return {
            quotient: Polynomial.plus(q, division.quotient),
            remainder: division.remainder
        };
    }

    static normalize(a) {
        return Polynomial.multiply(1 / Polynomial.dominantCoef(a), a);
    }

    static isZero(a) {
        return Polynomial.degreeOf(a) === -Infinity;
    }

    static isOne(a) {
        return Polynomial.degreeOf(a) === 0 && Polynomial.dominantCoef(a) === 1;
    }

    static pgcd(a, b) {
        let d = Polynomial.divide(a, b);
        let result = b;
        while (!Polynomial.isZero(d.remainder)) {
            result = d.remainder;
            d = Polynomial.divide(b, result);
        }
        return Polynomial.normalize(result);
    }

    static isIrreducible(a, field = 'real') {
        const d = Polynomial.degreeOf(a);
        if (d >= 3) {
            return false;
        }
        if (d === 1) {
            return true;
        }
        if (d === 2) {
            if (field === 'complex') {
                return false;
            }
            if (field === 'real') {
                const delta = a[1] ** 2 - 4 * a[2] * a[0];
                if (delta < 0) {
                    return true;
                }
                return false;
            }
            throw new Error('Field not recognized');
        }
    }

    static arePrime(a, b) {
        return Polynomial.isOne(Polynomial.pgcd(a, b));
    }
}

module.exports = {
    Polynomial
};