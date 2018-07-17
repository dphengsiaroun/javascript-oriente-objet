const getMinArray = require('./getMinArray');

function getSortedArray(array) {
    let result = [];
    let a = array;

    while (a.length > 0) {
        const min = getMinArray(a);
        result.push(min);

        a = removeElement(a, min);
    }
    
    return result;
}

function removeElement(array, element) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (element !== array[i]) {
            result.push(array[i]);
        }
    }
    return result;
}

module.exports = getSortedArray;