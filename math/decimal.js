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

module.exports = {
    round
}
