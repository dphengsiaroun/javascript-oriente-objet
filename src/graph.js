export function makeGraph(xstart, xend, ystart, yend, incr) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.querySelector('svg');
    const wrapper = svg.querySelector('g.wrapper');
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'graph');
    wrapper.appendChild(g);

    const xLine = document.createElementNS(ns, 'line');
    xLine.setAttribute('x1', xstart);
    xLine.setAttribute('y1', 0);
    xLine.setAttribute('x2', xend);
    xLine.setAttribute('y2', 0);
    g.appendChild(xLine);

    const yLine = document.createElementNS(ns, 'line');
    yLine.setAttribute('x1', 0);
    yLine.setAttribute('y1', ystart);
    yLine.setAttribute('x2', 0);
    yLine.setAttribute('y2', yend);
    g.appendChild(yLine);


    const width = 3;
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

