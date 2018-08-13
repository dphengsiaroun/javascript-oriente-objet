export const round125 = x => {
    const z = 10 ** Math.floor(Math.log10(x));
    const a = x / z;
    const b = [1, 2, 5, 10].reduce((acc, n) => {
        if (Math.abs(a - n) < acc.min) {
            acc.result = n;
            acc.min = Math.abs(a - n);
        }
        return acc;
    }, {
        min: 10,
        result: 0
    }).result * z;
    return b;
};

export const range = (s, e, incr) => {
    const start = Math.ceil(s / incr) * incr;
    return new Array(Math.floor((e - start) / incr) + 1).fill(0).map((n, i) => start + incr * i);
}