function getMinArray(array) {

    if (!(array instanceof Array)) {
        throw new Error('array is not an Array');
    }

    if (array.length === 0) {
        return 0;
    }

    if (array.length === 1) {
        return array[0];
    }
    let acc = array[0];
    for (let i = 1; i < array.length; i++) {
        if (acc > array[i]) {
            acc = array[i];
        }
    }
    return acc;
}

module.exports = getMinArray;