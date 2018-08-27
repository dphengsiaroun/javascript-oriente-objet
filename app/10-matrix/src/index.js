import {
    Graph
} from '../../lib/Graph';
import {
    Path
} from '../../lib/Path';

import {
    Matrix
} from '../../../math/matrix';

const NS = 'http://www.w3.org/2000/svg';

const xstart = -10;
const xend = 10;
const ystart = -10;
const yend = 10;
const incr = 1;
const step = 0.1;
const element = document.querySelector('.graph');

const graph = new Graph(element, {
    xstart,
    xend,
    ystart,
    yend,
    isInteractive: true
});

document.querySelector('#grid').checked = graph.showGrid;
document.querySelector('#grid').addEventListener('click', () => {
    graph.showGrid = document.querySelector('#grid').checked;
    graph.render();
});

document.querySelector('#number').checked = graph.showNumbers;
document.querySelector('#number').addEventListener('click', () => {
    graph.showNumbers = document.querySelector('#number').checked;
    graph.render();
});

document.querySelector('#marks').checked = graph.showMarks;
document.querySelector('#marks').addEventListener('click', () => {
    graph.showMarks = document.querySelector('#marks').checked;
    graph.render();
});

const angle = 30 * Math.PI / 180;

const rotate = [
    [Math.cos(angle), -Math.sin(angle)],
    [Math.sin(angle), Math.cos(angle)]
];

const scale = [
    [2, 0],
    [0, 2]
];

const symetric = [
    [0, -1],
    [-1, 0]
];

const squew30 = [
    [1, Math.tan(30 * Math.PI / 180)],
    [Math.tan(30 * Math.PI / 180), 1]
];

// const matrix = Matrix.product(symetric, Matrix.product(rotate, scale));
const matrix = squew30;
console.log('matrix', matrix);

const cloud = [
    [-1, 1],
    [3, 1],
    [4, 2],
    [-1, 2]
];

const cloud2 = cloud.map(p => {
    const m = Matrix.transpose([p]);
    const prod = Matrix.product(matrix, m);
    const [result] = Matrix.transpose(prod);
    return result;
});

function drawPoint(graph, p, color) {
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', p[0]);
    circle.setAttribute('cy', p[1]);
    circle.setAttribute('r', 0.1);
    circle.setAttribute('fill', color);

    graph.wrapper.appendChild(circle);
}

function drawShape(graph, cloud, color) {

    const path = document.createElementNS(NS, 'path');
    const d = `M ${cloud.map(p => `${p[0]} ${p[1]}`).join(' L ')} Z`;
    console.log('d', d);
    path.setAttribute('d', d);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', graph.strokeWidth);

    graph.wrapper.appendChild(path);
}

drawShape(graph, cloud, 'blue');
drawShape(graph, cloud2, 'green');