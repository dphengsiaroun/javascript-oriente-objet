const {
    round
} = require('../decimal');

const {
    Complex
} = require('../complex');

module.exports = function (Polynomial) {

    Polynomial.getRoots = (p) => {
        p = Polynomial.normalize(p);
        const result = [];
        if (Polynomial.degreeOf(p) === 0) {
            // No roots.
        } else if (Polynomial.degreeOf(p) === 1) {
            const [b, a] = Polynomial.canonize(p);
            result.push(-b / a);
        } else if (Polynomial.degreeOf(p) === 2) {
            const [c, b, a] = Polynomial.canonize(p);
            const delta = (b ** 2) - 4 * a * c;
            if (delta > 0) {
                result.push((-b - delta ** 0.5) / (2 * a));
                result.push((-b + delta ** 0.5) / (2 * a));
            } else if (delta === 0) {
                result.push(-b / (2 * a));
            }
        } else if (Polynomial.degreeOf(p) === 3) {
            const [d, c, b, a] = p;
            if (a === 1 && b === 0) {
                const r1 = getCardanRoot(p);
                result.push(r1);
                const p2 = Polynomial.divide(p, [-r1, 1]).quotient;
                const roots = Polynomial.getRoots(p2);
                roots.forEach(r => result.push(r));
            } else {
                // Tschirnhaus method
                const roots = getTschirnhausRoot(p);
                roots.forEach(r => result.push(r));
            }
        } else if (Polynomial.degreeOf(p) === 4) {
            const [e, d, c, b, a] = p;
            if (a === 1 && b === 0) {
                // TODO
                const roots = getFerrariRoots(p);
                roots.forEach(r => result.push(r));
            } else {
                // Tschirnhaus method
                const roots = getTschirnhausRoot(p);
                roots.forEach(r => result.push(r));
            }
        } else {
            throw new Error('Not implemented');
        }
        result.sort((a, b) => Math.sign(a - b));
        return Polynomial.round(result);
    }

    function getTschirnhausRoot(pol) {
        pol = Polynomial.normalize(pol);
        const n = Polynomial.degreeOf(pol);
        const a = pol[n];
        const b = pol[n - 1];

        const offset = b / (n * a);
        const q = [-offset, 1];
        const tschirnhaus = Polynomial.compose(pol, q);
        console.log('tschirnhaus', tschirnhaus);
        return Polynomial.getRoots(tschirnhaus).map(r => r - offset);
    }

    function getCardanRoot(p) {
        const [d, c, b, a] = Polynomial.canonize(p);
        const delta = (d ** 2) + (4 * (c ** 3)) / 27;
        if (delta >= 0) {
            const U = (-d - delta ** 0.5) / 2;
            const V = (-d + delta ** 0.5) / 2;
            return round(Math.sign(U) * Math.abs(U) ** (1 / 3) + Math.sign(V) * Math.abs(V) ** (1 / 3));
        }
        const U = new Complex(-d / 2, -((-delta) ** 0.5) / 2);
        const V = new Complex(-d / 2, +((-delta) ** 0.5) / 2);
        const u = U.pow(1 / 3);
        const v = V.pow(1 / 3);
        const x = u.plus(v);
        return round(x.x);
    }

    function getFerrariRoots(p) {
        console.log('p', p);
        const [c, b, a] = p;
        console.log('a b c', a, b, c);
        if (b === 0) {
            // bicarre
            const root = Polynomial.getRoots([c, a, 1]);
            const result = root.reduce((acc, n) => {
                acc.includes(n) || acc.push(n);
                acc.includes(-n) || acc.push(-n);
                return acc;
            }, []);
            result.sort();
            return result;
        }
        const pol3 = [4 * a * c - (b ** 2), -4 * c, -a, 1];
        console.log('pol3', pol3);
        const root3 = Polynomial.getRoots(pol3);
        console.log('root3', root3);
        const phi0 = root3[0];
        console.log('phi0', phi0);
        const u = a - 2 * phi0;
        console.log('u', u);
        if (u > 0) {
            const z = u ** 0.5;
            const g = b / (2 * u);
            const p1 = [new Complex(phi0, z * g), new Complex(0, z), new Complex(1, 0)];
            const p2 = [new Complex(phi0, -z * g), new Complex(0, -z), new Complex(1, 0)];
            throw new Error('To be implemented');
        }
        if (u < 0) {
            const z = (-u) ** 0.5;
            console.log('z', z);
            const g = b / (2 * u);
            const p1 = [phi0 + z * g, z, 1];
            const p1Root = Polynomial.getRoots(p1);
            console.log('p1Root', p1Root);
            const p2 = [phi0 - z * g, -z, 1];
            const p2Root = Polynomial.getRoots(p2);
            console.log('p2Root', p2Root);
            const result = p1Root.concat(p2Root);
            result.sort();
            return result;
        }
    }
};