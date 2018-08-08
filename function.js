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


module.exports = {
    getReversedSortedArray,
    isEven,
    round
};
