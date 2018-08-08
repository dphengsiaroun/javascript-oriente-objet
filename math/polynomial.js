const {
	polynomialFormat
} = require('./polynomial/format');



const round = (x, n = 16) => {
	if (Math.abs(x) < 1e-11) {
		return 0;
	}
	if (x.toString().match(/\..*000000000/)) {
		const result = +(x.toString().replace(/^(.*\..*)000000000.*$/, '$1'));
		return result;
	}
	if (x.toString().match(/\..*999999999/)) {
		const result = +Number.parseFloat(x).toPrecision(12);
		return result;
	}
	return x;
};

class Polynomial {

	static round(a, n = 15) {
		return a.map(c => round(c, n));
	}

	static canonize(a) {
		a = Polynomial.round(a);
		const deg = Polynomial.degreeOf(a);
		return a.slice(0, deg + 1);
	}

	static degreeOf(a) {
		return a.reduce((acc, n, i) => n ? i : acc, -1);
	}

	static leadingCoef(a) {
		return a.reduce((acc, n, i) => n ? n : acc, 0);
	}

	static multiply(n, a) {
		return a.map(c => round(n * c));
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
	}

	static normalize(a) {
		const result = Polynomial.multiply(1 / Polynomial.leadingCoef(a), a);
		return result;
	}

	static isZero(a) {
		return Polynomial.degreeOf(a) === -1;
	}

	static isOne(a) {
		return Polynomial.degreeOf(a) === 0 && Polynomial.leadingCoef(a) === 1;
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

	static toString(a, format = 'tex') {
		return polynomialFormat(a, format);
	}

	static toFunction(a) {
		return x => a.reduce((acc, n, i) => acc + n * x ** i, 0);
	}

	static divideByIPO(a, b, k) {
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

}

require('./polynomial/binaryOps')(Polynomial);

module.exports = {
	Polynomial
};