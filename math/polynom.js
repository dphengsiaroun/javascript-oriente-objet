class Polynom {

    static canonize(a) {
        const deg = Polynom.degreeOf(a);
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
        return Polynom.canonize(new Array(Math.max(Polynom.degreeOf(a), Polynom.degreeOf(b)) + 1)
            .fill(0).map((n, i) => (a[i] ? a[i] : 0) + (b[i] ? b[i] : 0)));
    }

    static minus(a, b) {
        return Polynom.canonize(new Array(Math.max(Polynom.degreeOf(a), Polynom.degreeOf(b)) + 1)
            .fill(0).map((n, i) => (a[i] ? a[i] : 0) - (b[i] ? b[i] : 0)));
    }

    static term(coef, degree) {
        const result = new Array(degree + 1).fill(0);
        result[degree] = coef;
        return result;
    }

    static divide(a, b) {
        const dega = Polynom.degreeOf(a);
        const degb = Polynom.degreeOf(b);
        const degq = dega - degb;

        if (degq < 0) {
            return {
                quotient: [],
                remainder: Polynom.canonize(a)
            };
        }
        const ca = Polynom.dominantCoef(a);
        const cb = Polynom.dominantCoef(b);
        const cq = ca / cb;
        const q = Polynom.term(cq, degq);

        const p = Polynom.product(q, b);
        const remainder = Polynom.minus(a, p);

        if (degq === 0) {
            return {
                quotient: [cq],
                remainder
            };
        }
        const division = Polynom.divide(remainder, b);
        return {
            quotient: Polynom.plus(q, division.quotient),
            remainder: division.remainder
        };
    }

    static normalize(a) {
        return Polynom.multiply(1 / Polynom.dominantCoef(a), a);
    }

    static isZero(a) {
        return Polynom.degreeOf(a) === -Infinity;
    }

    static pgcd(a, b) {
        let d = Polynom.divide(a, b);
        let result = b;
        while (!Polynom.isZero(d.remainder)) {
            result = d.remainder;
            d = Polynom.divide(b, result);
        }
        return Polynom.normalize(result);
    }

    static isIrreductible(a, field = 'real') {
        const d = Polynom.degreeOf(a);
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




}

module.exports = {
    Polynom
};