const getMinArray = require('./getMinArray');
const getSortedArray = require('./getSortedArray');

function getReversedSortedArray(array) {
    let sortedArray = getSortedArray(array);
    const result = [];
    for (let i = 0; i < sortedArray.length; i++) {
        result[i] = sortedArray[sortedArray.length - 1 - i];
    }

    return result;
}

const array = [6, 3, 18, 10, 48, 2];

const minimum = getMinArray(array);
console.log('minimum', minimum);

const sortedArray = getSortedArray(array);
console.log('sortedArray', sortedArray);

const reversedSortedArray = getReversedSortedArray(array);
console.log('reversedSortedArray', reversedSortedArray);

function newArray(array, cb) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = cb(array[i]);
    }
    return result;
}

const array2 = newArray(array, n => n * 3);
console.log('array2', array2);

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

const array3 = [
    [
        [1], 2
    ],
    [1, 8], 3
];
const flatArray = flat(array3);
console.log('flatArray', flatArray);

function reverse(array) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = array[array.length - 1 - i];
    }

    return result;
}

const array4 = [12, 6, 36];
const reversedArray = reverse(array4);
console.log('reversedArray', reversedArray);

function sum(array) {
    let result = 0;

    for (let i = 0; i < array.length; i++) {
        result = array[i] + result;
    }

    return result;
}

function sumReduce(array) {
    return array.reduce((acc, n) => acc + n, 0);
}

const array5 = [3, 6, 10];
const total = sum(array5);
console.log('total', total);
const totalReducer = sumReduce(array5);
console.log('totalReducer', totalReducer);

const total2 = array5.reduce((acc, n) => acc + n, 0);
console.log('total2', total2);

const total3 = array5.reduce((acc, n) => acc * n, 1);
console.log('total3', total3);

Array.prototype.reduce2 = function (cb, initial) {
    let acc = initial;
    for (let i = 0; i < this.length; i++) {
        acc = cb(acc, this[i]);
    }
    return acc;
}

const a = [3, 8, 5];
console.log('a sum', a.reduce2((acc, n) => acc + n, 0));

function minReduce(array) {
    return array.reduce((acc, n) => acc === undefined ? n : acc > n ? n : acc, undefined);
}

const b = [4, 8, 3];
console.log('b min', minReduce(b));
console.log('b max', b.reduce((acc, n) => acc === undefined ? n : acc < n ? n : acc, undefined));

Array.prototype.mean = function () {
    return this.reduce((acc, n) => acc + n, 0) / this.length;
}

console.log('b mean', b.mean());
 