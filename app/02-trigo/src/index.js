import {
    Graph
} from '../../lib/Graph';
import {
    draw,
    drawPath,
    drawPathXY,
} from '../../lib/draw';
import {
    printMouseCoord
} from '../../lib/svg';
import {
    initCircle
} from './ex2';


const leftElt = document.querySelector('.circle');
console.log('leftElt', leftElt);
const graph1 = new Graph(leftElt, -1.2, 1.2, -1.2, 1.2, 1);

printMouseCoord(graph1.svg);

drawPathXY(graph1.svg, Math.cos, Math.sin, 0, 2 * Math.PI, 1e-2, 'black');

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
const graph2 = new Graph(rightElt, xstart, xend, ystart, yend, incr);

drawPath(graph2.svg, sin, xstart + incr, xend - incr, step, 'blue');
drawPath(graph2.svg, cos, xstart + incr, xend - incr, step, 'red');

initCircle(graph1.svg, graph2.svg);