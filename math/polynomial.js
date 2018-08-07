const round = (x, n) => {
    if (Math.abs(x) < 1e-10) {
        return 0;
    }
    const result = +Number.parseFloat(x).toPrecision(n);
    return result;
};

class Polynomial {

    static round(a, n = 15) {
        return a.map(c => round(c, n));
    }

    static canonize(a) {
        const result = Polynomial.round(a);
        const deg = Polynomial.degreeOf(result);
        result.length = deg + 1;
        return result;
    }

    static product(a, b) {
        const result = new Array(a.length + b.length - 1).fill(0).map((n, i) =>
            new Array(i + 1).fill(0).reduce((acc, n, j) =>
                acc + (a[j] ? a[j] : 0) * (b[i - j] ? b[i - j] : 0), 0));
        return Polynomial.canonize(result);
    }

    static degreeOf(a) {
        return Polynomial.round(a).reduce((acc, n, i) => n ? i : acc, -1);
    }

    static dominantCoef(a) {
        return Polynomial.round(a).reduce((acc, n, i) => n ? n : acc, 0);
    }

    static multiply(n, a) {
        return Polynomial.canonize(a.map(c => n * c));
    }

    static plus(a, b) {
        return Polynomial.canonize(new Array(Math.max(Polynomial.degreeOf(a), Polynomial.degreeOf(b)) + 1)
            .fill(0).map((n, i) => (a[i] ? a[i] : 0) + (b[i] ? b[i] : 0)));
    }

    static minus(a, b) {
        return Polynomial.plus(a, Polynomial.multiply(-1, b));
    }

    static term(coef, degree) {
        const result = new Array(degree + 1).fill(0);
        result[degree] = coef;
        return result;
    }

    static divide(a, b) {
        Polynomial.round(a);
        Polynomial.round(b);
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
        console.log('a', a);
        console.log('ca', ca);
        console.log('cb', cb);
        // const cq = round(ca / cb, 12);
        const cq = ca / cb;
        console.log('cq', cq);

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
        return Polynomial.degreeOf(a) === -1;
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


    /**
     * See algorithm at https://www-fourier.ujf-grenoble.fr/~parisse/mat249/mat249/node21.html
     *
     * @static
     * @param {*} a
     * @param {*} b
     * @memberof Polynomial
     */
    static bezout(a, b) {
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

}

module.exports = {
    Polynomial
};