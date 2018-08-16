const {
	polynomialFormat
} = require('./polynomial/format');

const {
	round
} = require('./decimal');

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

	static fromRoots(...roots) {
		return roots.reduce((acc, n) => Polynomial.product(acc, [-n, 1]), [1]);
	}

	static differentiate(a) {
		return a.map((c, i) => c * i).slice(1);
	}

	static integrate(a) {
		const result = a.map((c, i) => c / (i + 1));
		result.unshift(0);
		return result;
	}

}

require('./polynomial/binaryOps')(Polynomial);
require('./polynomial/roots')(Polynomial);

module.exports = {
	Polynomial
};