import * as rxjs from 'rxjs/bundles/rxjs.umd';

import {
    Graph
} from '../../lib/Graph';
import {
    draw,
    drawPath
} from '../../lib/draw';

const {
    take,
    map
} = rxjs.operators;

// rxjs.interval(20).pipe(
//     take(1000),
// ).subscribe(n => {
//     console.log(n);
//     g.setAttribute('transform', `scale(1, ${-1 + n / 100})`)
// });

const constant = x => 1;
const droite = x => (1 * x) - 1;
const parabol = x => (x**2) + (2 * x) - 3;
const cubic = x => (0.2 * x**3) + (-0.02 * x**2)  + (-2 * x) + 2.5;

const xstart = -10;
const xend = 10;

const ystart = -5;
const yend = 5;
const incr = 1;
const step = 0.3;
const element = document.querySelector('.graph');

const graph = new Graph(element, {xstart, xend, ystart, yend, incr});

drawPath(graph.svg, constant, xstart + incr, xend - incr, step, 'blue');
drawPath(graph.svg, droite, xstart + incr, xend - incr, step, 'orange');
drawPath(graph.svg, parabol, xstart + incr, xend - incr, step, 'red');
drawPath(graph.svg, cubic, xstart + incr, xend - incr, step, 'green');