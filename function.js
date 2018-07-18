const getSortedArray = require('./getSortedArray');

function getReversedSortedArray(array) {
    let sortedArray = getSortedArray(array);
    const result = [];
    for (let i = 0; i < sortedArray.length; i++) {
        result[i] = sortedArray[sortedArray.length - 1 - i];
    }

    return result;
}

function flat(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Array) {
            result = result.concat(flat(array[i]));
        } else {
            result.push(array[i]);
        }
    }

    return result;
}


module.exports = {
    getReversedSortedArray,
    flat
};