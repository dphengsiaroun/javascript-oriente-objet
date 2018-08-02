export function makeGraph(element, xstart, xend, ystart, yend, incr) {
    const ns = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `${xstart} ${ystart} ${xend - xstart} ${yend - ystart}`);
    element.appendChild(svg);

    const wrapper = document.createElementNS(ns, 'g');
    wrapper.setAttribute('class', 'wrapper');
    wrapper.setAttribute('transform', 'scale(1, -1)');
    svg.appendChild(wrapper);

    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'graph');
    wrapper.appendChild(g);

    const xLine = document.createElementNS(ns, 'line');
    xLine.setAttribute('x1', xstart);
    xLine.setAttribute('y1', 0);
    xLine.setAttribute('x2', xend);
    xLine.setAttribute('y2', 0);
    xLine.setAttribute('stroke-width', '0.4%');
    g.appendChild(xLine);

    const yLine = document.createElementNS(ns, 'line');
    yLine.setAttribute('x1', 0);
    yLine.setAttribute('y1', ystart);
    yLine.setAttribute('x2', 0);
    yLine.setAttribute('y2', yend);
    yLine.setAttribute('stroke-width', '0.4%');
    g.appendChild(yLine);


    const width = (xstart - xend) / 100;
    for (let x = Math.ceil(xstart); x <= Math.floor(xend); x+=incr) {
        const mark = document.createElementNS(ns, 'line');
        mark.setAttribute('class', 'mark');
        mark.setAttribute('x1', x);
        mark.setAttribute('x2', x);
        mark.setAttribute('y1', -width);
        mark.setAttribute('y2', width);
        mark.setAttribute('stroke-width', '0.4%');
        g.appendChild(mark);
    }
    for (let y = Math.ceil(ystart); y <= Math.floor(yend); y+=incr) {
        const mark = document.createElementNS(ns, 'line');
        mark.setAttribute('class', 'mark');
        mark.setAttribute('x1', -width);
        mark.setAttribute('x2', width);
        mark.setAttribute('y1', y);
        mark.setAttribute('y2', y);
        mark.setAttribute('stroke-width', '0.4%');
        g.appendChild(mark);
    }
    return svg;
}

