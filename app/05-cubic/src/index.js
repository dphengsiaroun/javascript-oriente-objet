import {
    Graph
} from '../../lib/Graph';
import {
    drawPath
} from '../../lib/draw';

import {
    Polynomial
} from '../../../math/polynomial';

const xstart = -10;
const xend = 10;

const ystart = -10;
const yend = 10;
const incr = 1;
const step = 0.1;
const element = document.querySelector('.graph');

const graph = new Graph(element, {
    isInteractive: true
});

document.querySelector('#grid').addEventListener('click', () => {
    const checkValue = document.querySelector('#grid').checked;
    if (checkValue) {
        graph.addGrid(xstart, xend, ystart, yend, incr);
    } else {
        graph.removeGrid();
    }
});

document.querySelector('#number').addEventListener('click', () => {
    const checkValue = document.querySelector('#number').checked;
    if (checkValue) {
        graph.addNumber(xstart, xend, ystart, yend, incr);
    } else {
        graph.removeNumber();
    }
});

const a = [0, -5, 0, 0.5];
const cubic = Polynomial.toFunction(a);
let g = drawPath(graph.svg, cubic, xstart, xend, step, 'green');
const equationElt = document.querySelector('.equation');
equationElt.innerHTML = Polynomial.toString(a, 'html');

for (let i = 0; i < 4; i++) {
    const elt = document.querySelector(`#a${i}`);
    elt.value = a[i];
    elt.addEventListener('input', (e) => {
        a[i] = +e.target.value;
        equationElt.innerHTML = Polynomial.toString(a, 'html');
        const cubic = Polynomial.toFunction(a);
        g.remove();
        g = drawPath(graph.svg, cubic, xstart, xend + incr, step, 'green');
    });
}