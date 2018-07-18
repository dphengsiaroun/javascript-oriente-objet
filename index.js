const getMinArray = require('./getMinArray');
const getSortedArray = require('./getSortedArray');
require('./array');

const array = [6, 3, 18, 10, 48, 2];

const minimum = getMinArray(array);
console.log('minimum', minimum);

const sortedArray = getSortedArray(array);
console.log('sortedArray', sortedArray);

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


function isEven(n) {
    return n % 2 === 0;
}

console.log('3 isEven', isEven(3));
console.log('4 isEven', isEven(4));