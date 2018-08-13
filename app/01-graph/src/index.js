import * as rxjs from 'rxjs/bundles/rxjs.umd';

import {
    Graph
} from '../../lib/Graph';
import {
    Path
} from '../../lib/Path';

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

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;
const element = document.querySelector('div.graph');

const graph = new Graph(element, {xstart, ystart, xend, yend, incr});

new Path(graph, {fny: Math.sin, color: 'blue'});
new Path(graph, {fny: Math.cos, color: 'red'});