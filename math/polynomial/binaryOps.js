module.exports = function (Polynomial) {

    function pgcd(a, b) {
        let d = Polynomial.divide(a, b);
        let result = b;
        while (!Polynomial.isZero(d.remainder)) {
            result = d.remainder;
            d = Polynomial.divide(b, result);
        }
        return Polynomial.normalize(result);
    }

    function ppcm(a, b) {
        const pgcd = Polynomial.pgcd(a, b);
        const bp = Polynomial.divide(b, pgcd).quotient;
        return Polynomial.product(a, bp);
    }

    return {
        pgcd,
        ppcm
    };

};