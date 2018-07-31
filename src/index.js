import * as rxjs from 'rxjs/bundles/rxjs.umd';

import {
    makeGraph
} from './graph';
import {
    draw,
    drawPath
} from './draw';

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
const fn = x => Math.sin(x);

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;

makeGraph(xstart, xend, ystart, yend, incr);

drawPath(fn, xstart + incr, xend - incr, step);