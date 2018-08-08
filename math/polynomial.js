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

	static product(a, b) {
		const result = new Array(a.length + b.length - 1).fill(0).map((n, i) =>
			new Array(i + 1).fill(0).reduce((acc, n, j) =>
				acc + (a[j] ? a[j] : 0) * (b[i - j] ? b[i - j] : 0), 0));
		return Polynomial.canonize(result);
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

	static toString(a, format = 'tex') {
		return polynomialFormat(a, format);
	}

	static toFunction(a) {
		return x => a.reduce((acc, n, i) => acc + n * x ** i, 0);
	}

	static divideByIPO(a, b, k) {
		const q = a[0] / b[0];
		const quotient = [q];
		const remainder = Polynomial.minus(a, Polynomial.product(quotient, b)).slice(1);
		return {
			quotient,
			remainder
		};
	}

}

module.exports = {
	Polynomial
};