const getMinArray = require('./getMinArray');
const getSortedArray = require('./getSortedArray');

const { compare } = require('./array');

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

const table = [
    [1, 'Dany', 12],
    [2, 'Nadia', 15],
    [3, 'Jean-Louis', 35],
    [4, 'Yannis', 25],
];

// get the sum of point for point > 20
const result = table.map(r => r[2]).filter(p => p > 20).sum();
console.log('result', result);

// get all the name with more 5 characters
const result2 = table.map(r => r[1]).filter(n => n.length > 5);
console.log('result2', result2);

const result3 = table.map(r => r[1]).filter(n => n.length < 5);
console.log('result3', result3);

// get the sum of point of people with D in there firstname
const result4 = table.filter(r => r[1].match(/d/i)).map(r => r[2]).sum();
console.log('result4', result4);

const result5 = table.filter(r => r[1].match(/s/i)).map(r => r[2]).max();
console.log('result5', result5);

const result6 = table.map(r => r[1]).sort();
console.log('result6', result6);

const result7 = table.sort3((a, b) => compare(a[1], b[1]));
console.log('result7', result7.map(r => r[1]));



