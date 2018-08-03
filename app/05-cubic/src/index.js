import {
    makeGraph
} from '../../lib/graph';
import {
    drawPath
} from '../../lib/draw';


const cubic = x => (0.2 * x ** 3) + (-0.02 * x ** 2) + (-2 * x) + 2.5;

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;
const element = document.querySelector('.graph');

const graph = makeGraph(element, xstart, xend, ystart, yend, incr);

drawPath(graph, cubic, xstart + incr, xend - incr, step, 'green');


const format = (a, n) => {
    let result = '';
    a = +a;
    if (a === 0) {
        return result;
    }
    if (a >= 0 && n !== 3) {
        result += '+ ';
    }
    if (a < 0) {
        result += '- ';
    }
    result += `${Math.abs(a)}`;
    if (n > 0) {
        result += `x`;
    }
    if (n > 1) {
        result += `<sup>${n}</sup>`;
    }
    return result;
};
const formatEquation = array => array.map((a, i) => format(a, i)).reverse().join(' ');

const array = [1, 2, 3, 4];
const equationElt = document.querySelector('.equation');
equationElt.innerHTML = formatEquation(array);

for (let i = 0; i < 4; i++) {
    const elt = document.querySelector(`#a${i}`);
    elt.value = array[i];
    elt.addEventListener('input', (e) => {
        console.log('e', e.target.value);
        array[i] = e.target.value;
        equationElt.innerHTML = formatEquation(array);
    });
}

