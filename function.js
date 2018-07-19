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


module.exports = {
    getReversedSortedArray,
    isEven
};