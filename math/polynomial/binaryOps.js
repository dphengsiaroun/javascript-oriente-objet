const {
	round
} = require('../decimal');

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

    Polynomial.divideByIPO = (a, b, k) => {
        let r = a;
        const quotient = [];
        for (let i = 0; i <= k; i++) {
            const q = r[i] / b[0];
            quotient.push(q);
            r = Polynomial.minus(r, Polynomial.product(Polynomial.term(q, i), b));
        }
        const remainder = r.slice(k + 1);
        return {
            quotient,
            remainder
        };
    }

    Polynomial.divide = (a, b) => {
        const dega = Polynomial.degreeOf(a);
        const degb = Polynomial.degreeOf(b);
        const degq = dega - degb;

        if (degq < 0) {
            return {
                quotient: [],
                remainder: Polynomial.canonize(a)
            };
        }
        const ca = Polynomial.leadingCoef(a);
        if (Math.abs(ca) < 1e-10) {
            throw new Error('Leading coef very small');
        }
        const cb = Polynomial.leadingCoef(b);
        const cq = round(ca / cb);

        const q = Polynomial.term(cq, degq);

        const p = Polynomial.product(q, b);
        const remainder = Polynomial.minus(a, p);

        if (degq === 0) {
            const result = {
                quotient: [cq],
                remainder
            };
            return result;
        }
        const division = Polynomial.divide(remainder, b);
        const result = {
            quotient: Polynomial.plus(q, division.quotient),
            remainder: division.remainder
        };
        return result;
    };

    Polynomial.pow = (p, n) => {
        let result = [1];
        for (let i = 0; i < n; i++) {
            result = Polynomial.product(p, result);
        }
        return result;
    }

    Polynomial.compose = (p, q) => {
        return p.reduce((acc, n, i) => {
            return Polynomial.plus(acc, Polynomial.multiply(n, Polynomial.pow(q, i)));
        }, []);
    };

};