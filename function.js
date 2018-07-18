const getSortedArray = require('./getSortedArray');

function getReversedSortedArray(array) {
    let sortedArray = getSortedArray(array);
    const result = [];
    for (let i = 0; i < sortedArray.length; i++) {
        result[i] = sortedArray[sortedArray.length - 1 - i];
    }

    return result;
}

function compare(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

module.exports = {
    getReversedSortedArray,
    compare
};