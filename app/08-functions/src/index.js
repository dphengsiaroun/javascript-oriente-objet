import {
    Graph
} from '../../lib/Graph';
import {
    Path
} from '../../lib/Path';
import {
    Tangent
} from '../../lib/Tangent';
import {
    Polynomial
} from '../../../math/Polynomial';

const xstart = -10;
const xend = 10;

const ystart = -5;
const yend = 5;
const incr = 0.1;
const element = document.querySelector('.graph');

const graph = new Graph(element, {
    xstart,
    xend,
    ystart,
    yend,
    incr,
    showGrid: true
});

const p1 = new Path(graph, {
    fny: Polynomial.toFunction([-1, 0, 0, 0, 0, 1]),
    color: 'blue'
});
new Tangent(graph, {
    fny: p1.opts.fny,
    color: 'red'
});

const h = 1e-13;
const derivative = f => x => (f(x + h) - f(x)) / h;

const p2 = new Path(graph, {
    fny: derivative(p1.opts.fny),
    color: 'green'
});
