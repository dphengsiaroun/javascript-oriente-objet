import {
    Polynomial
} from '../../../math/polynomial';

const p1 = document.querySelector('#p1');
p1.innerHTML = '$p_{1}(x) = x^2 + x + 1$';
const p2 = document.querySelector('#p2');
p2.innerHTML = '$p_{2}(x) = 3x^2 + 1$';
const p3 = document.querySelector('#p3');
p3.innerHTML = `$p_3(x) = ${Polynomial.toString([1, 0, 1, 0, 5])}$`;

