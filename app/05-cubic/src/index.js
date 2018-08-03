import {
    makeGraph
} from '../../lib/graph';
import {
    drawPath
} from '../../lib/draw';


const cubic = x => (0.2 * x**3) + (-0.02 * x**2)  + (-2 * x) + 2.5;

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;
const element = document.querySelector('.graph');

const graph = makeGraph(element, xstart, xend, ystart, yend, incr);

drawPath(graph, cubic, xstart + incr, xend - incr, step, 'green');