import * as rxjs from 'rxjs/bundles/rxjs.umd';

import {
    makeGraph
} from '../../lib/graph';
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

const fn = x => 2.5 + (-2 * x) + (-0.02 * x**2) + (0.2 * x**3);

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;
const element = document.querySelector('.graph');

const graph = makeGraph(element, xstart, xend, ystart, yend, incr);

drawPath(graph, fn, xstart + incr, xend - incr, step, 'blue');
// drawPath(graph, cos, xstart + incr, xend - incr, step, 'red');