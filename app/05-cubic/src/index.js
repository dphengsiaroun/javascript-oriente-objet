import {
    makeGraph, addGrid
} from '../../lib/graph';
import {
    drawPath
} from '../../lib/draw';

const xstart = -10;
const xend = 10;

const ystart = -10;
const yend = 10;
const incr = 1;
const step = 0.3;
const element = document.querySelector('.graph');



const graph = makeGraph(element, xstart, xend, ystart, yend, incr);
addGrid(graph, xstart, xend, ystart, yend, incr);

const format = (a, n, array) => {
    const maxDegree = array.reduce((acc, n, i) => n !== 0 ? i : acc, 0);
    if (a === 0) {
        if (maxDegree === 0 && n === 0) {
            return '0';
        }
        return '';
    }
    let result = '';
    if (a >= 0 && n !== maxDegree) {
        result += '+ ';
    }
    if (a < 0) {
        result += '-';
        if (n !== maxDegree) {
            result += ' ';
        }
    }
    
    if (!(Math.abs(a) === 1 && n > 0)) {
        result += `${Math.abs(a)}`;
    }
    if (n > 0) {
        result += `x`;
    }
    if (n > 1) {
        result += `<sup>${n}</sup>`;
    }
    return result;
};
const formatEquation = array => array.map((a, i, array) => format(a, i, array)).reverse().join(' ').trim();

const a = [0, -5, 0, 0.5];
const cubic = x => (a[3] * x ** 3) + (a[2] * x ** 2) + (a[1] * x) + a[0];
let g = drawPath(graph, cubic, xstart, xend, step, 'green');
const equationElt = document.querySelector('.equation');
equationElt.innerHTML = formatEquation(a);

for (let i = 0; i < 4; i++) {
    const elt = document.querySelector(`#a${i}`);
    elt.value = a[i];
    elt.addEventListener('input', (e) => {
        a[i] = +e.target.value;
        equationElt.innerHTML = formatEquation(a);
        const cubic = x => (a[3] * x ** 3) + (a[2] * x ** 2) + (a[1] * x) + a[0];
        g.remove();
        g = drawPath(graph, cubic, xstart, xend + incr, step, 'green');
    });
}