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

const g = document.querySelector('g');
const transform = g.getAttribute('transform');
console.log('transform', transform);

// rxjs.interval(20).pipe(
//     take(1000),
// ).subscribe(n => {
//     console.log(n);
//     g.setAttribute('transform', `scale(1, ${-1 + n / 100})`)
// });

// const fn = x => (1 / 100) * x**2;
const fn = x => 50 * Math.sin(x / 20);

const xstart = -100;
const xend = 200;

const ystart = -100;
const yend = 100;
const incr = 10;
const step = 10;

makeGraph(xstart, xend, ystart, yend, incr);

drawPath(fn, xstart + incr, xend - incr, step);