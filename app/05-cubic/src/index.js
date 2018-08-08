import {
    makeGraph, addGrid, removeGrid
} from '../../lib/graph';
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

const graph = makeGraph(element, xstart, xend, ystart, yend, incr);

let grid;

document.querySelector('#grid').addEventListener('click', () => {
    const checkValue = document.getElementById('grid').checked;
    if (checkValue) {
        grid = addGrid(graph, xstart, xend, ystart, yend, incr);
    } else {
        removeGrid(grid);
    } 
});

const a = [0, -5, 0, 0.5];
const cubic = Polynomial.toFunction(a);
let g = drawPath(graph, cubic, xstart, xend, step, 'green');
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
        g = drawPath(graph, cubic, xstart, xend + incr, step, 'green');
    });
}

