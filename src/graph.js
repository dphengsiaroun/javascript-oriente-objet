export function makeGraph(xstart, xend, ystart, yend, incr) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.querySelector('svg');
    const wrapper = svg.querySelector('g.wrapper');
    const g = document.createElementNS(ns, 'g');
    const width = 3;
    wrapper.appendChild(g);
    for (let x = xstart + incr; x < xend; x+=incr) {
        const mark = document.createElementNS(ns, 'line');
        mark.setAttribute('class', 'mark');
        mark.setAttribute('x1', x);
        mark.setAttribute('x2', x);
        mark.setAttribute('y1', -width);
        mark.setAttribute('y2', width);
        g.appendChild(mark);
    }
    for (let y = ystart + incr; y < yend; y+=incr) {
        const mark = document.createElementNS(ns, 'line');
        mark.setAttribute('class', 'mark');
        mark.setAttribute('x1', -width);
        mark.setAttribute('x2', width);
        mark.setAttribute('y1', y);
        mark.setAttribute('y2', y);
        g.appendChild(mark);
    }
}

