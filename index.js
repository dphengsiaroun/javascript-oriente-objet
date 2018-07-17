const getMinArray = require('./getMinArray');
const getSortedArray = require('./getSortedArray');

const array = [6, 3, 18, 10, 48, 2];

const minimum = getMinArray(array);
console.log('minimum', minimum);

const sortedArray = getSortedArray(array);
console.log('sortedArray', sortedArray);