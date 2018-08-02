import {
    makeGraph
} from '../../lib/graph';
import {
    draw,
    drawPath,
    drawPathXY,
} from '../../lib/draw';
import {
    printMouseCoord
} from '../../lib/svg';


const leftElt = document.querySelector('.circle');
console.log('leftElt', leftElt);
const graph1 = makeGraph(leftElt, -2, 2, -2, 2, 1);

printMouseCoord(graph1);

// const circleHigh = x => (1 - x**2)**0.5;
// const circleLow = x => -((1 - x**2)**0.5);

// console.log('circleHigh', circleHigh(1));

// const cs = 1e-4;

// drawPath(graph1, circleHigh, -1 + cs, 1 - cs, cs, 'black');
// drawPath(graph1, circleLow, -1 + cs, 1 - cs, cs, 'black');

drawPathXY(graph1, Math.cos, Math.sin, 0, 2 * Math.PI, 1e-2, 'black');

initCircle(graph1);

function initCircle(svg) {
    const ns = 'http://www.w3.org/2000/svg';
    const wrapper = svg.querySelector('g.wrapper');
    console.log('wrapper', wrapper);
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'button');
    wrapper.appendChild(g);
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', '1');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '0.15');
    g.appendChild(circle);
    const radius = document.createElementNS(ns, 'line');
    radius.setAttribute('x1', '0');
    radius.setAttribute('y1', '0');
    radius.setAttribute('x2', '1');
    radius.setAttribute('y2', '0');
    radius.setAttribute('stroke-width', '0.8%');
    g.appendChild(radius);

    circle.addEventListener('mousedown', function (event) {
        let startX = 0, startY = 0, x = 0, y = 0;
        let cx = +circle.getAttribute('cx');
        let cy = +circle.getAttribute('cy');
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);

        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;
            circle.setAttribute('cx', cx + x);
            circle.setAttribute('cy', cy + y);
        }

        function mouseup() {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        }
    });



}





//////////////////////

const sin = x => Math.sin(x);
const cos = x => Math.cos(x);

const xstart = -10;
const xend = 10;

const ystart = -3;
const yend = 3;
const incr = 1;
const step = 0.3;


const rightElt = document.querySelector('div.graph');
const graph2 = makeGraph(rightElt, xstart, xend, ystart, yend, incr);

drawPath(graph2, sin, xstart + incr, xend - incr, step, 'blue');
drawPath(graph2, cos, xstart + incr, xend - incr, step, 'red');