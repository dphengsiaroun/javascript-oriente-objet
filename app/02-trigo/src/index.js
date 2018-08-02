import {
    makeGraph
} from '../../lib/graph';
import {
    draw,
    drawPath,
    drawPathXY,
} from '../../lib/draw';


const leftElt = document.querySelector('.circle');
console.log('leftElt', leftElt);
const graph1 = makeGraph(leftElt, -2, 2, -2, 2, 1);

// const circleHigh = x => (1 - x**2)**0.5;
// const circleLow = x => -((1 - x**2)**0.5);

// console.log('circleHigh', circleHigh(1));

// const cs = 1e-4;

// drawPath(graph1, circleHigh, -1 + cs, 1 - cs, cs, 'black');
// drawPath(graph1, circleLow, -1 + cs, 1 - cs, cs, 'black');

drawPathXY(graph1, Math.cos, Math.sin, 0, 2 * Math.PI, 1e-2, 'black');

//////////////////////

const sin = x => Math.sin(x);
const cos = x => Math.cos(x);

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;


const rightElt = document.querySelector('div.graph');
const graph2 = makeGraph(rightElt, xstart, xend, ystart, yend, incr);

drawPath(graph2, sin, xstart + incr, xend - incr, step, 'blue');
drawPath(graph2, cos, xstart + incr, xend - incr, step, 'red');