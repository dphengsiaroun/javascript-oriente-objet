const getSortedArray = require('./getSortedArray');

function getReversedSortedArray(array) {
    let sortedArray = getSortedArray(array);
    const result = [];
    for (let i = 0; i < sortedArray.length; i++) {
        result[i] = sortedArray[sortedArray.length - 1 - i];
    }

    return result;
}

function isEven(n) {
    return n % 2 === 0;
}

const round = (x, n = 16) => {
    return +Number.parseFloat(x).toPrecision(n);
};

const round125 = (x) => {
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


module.exports = {
    getReversedSortedArray,
    isEven,
    round,
    round125
};