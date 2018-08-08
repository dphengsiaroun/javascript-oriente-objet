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

// const fn = x => (1 / 100) * x**2;
const sin = x => Math.sin(x);
const cos = x => Math.cos(x);

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;
const element = document.querySelector('.graph');

const graph = new Graph(element, xstart, xend, ystart, yend, incr);

drawPath(graph.svg, sin, xstart + incr, xend - incr, step, 'blue');
drawPath(graph.svg, cos, xstart + incr, xend - incr, step, 'red');