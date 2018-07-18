const getMinArray = require('./getMinArray');
const getSortedArray = require('./getSortedArray');
require('./array');

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

const a = [3, 8, 5];
console.log('a sum', a.reduce2((acc, n) => acc + n, 0));

try {
    [].reduce2((acc, n) => acc + n);
} catch (e) {
    console.log('test ok');
} 

const b = [3, 5];
console.log('b min', b.min());
console.log('b max', b.max());
console.log('b mean', b.mean());
console.log('b geometric mean', b.geometricMean());

console.log([[1, 11], [1, 8], [2, 13]].min((n) => (n[0]**2 + n[1]**2)**0.5));

const c = [[1, 11], [1, 8], [2, 13]];
console.log('c weighted arithmetic mean', c.weightedArithmeticMean());

function isEven(n) {
    return n % 2 === 0;
}

console.log('3 isEven', isEven(3));
console.log('4 isEven', isEven(4));

