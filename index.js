const array = [6, 3, 18, 10, 48, 2];

const minimum = getMinArray(array);
console.log('minimum', minimum);


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
    console.log('toto');
    let acc = array[0];
    for (let i = 1; i < array.length; i++) {
        console.log('i', i);
        if (acc > array[i]) {
            acc = array[i];
        }
    }
    return acc;
}