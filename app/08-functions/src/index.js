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

const xstart = -10;
const xend = 10;

const ystart = -5;
const yend = 5;
const incr = 0.1;
const element = document.querySelector('.graph');

const graph = new Graph(element, {xstart, xend, ystart, yend, incr, showGrid: true});

new Path(graph, {fny: x => 1 / x, color: 'blue'});
new Path(graph, {fny: x => 10 / x, color: 'purple'});
// new Path(graph, {fny: x => x, color: 'green'});
new Path(graph, {fnx: t => 2 * Math.cos(t), fny: t => 2 * Math.sin(t), start: 0, end: 2 * Math.PI, incr: 0.1, color: 'red'});
