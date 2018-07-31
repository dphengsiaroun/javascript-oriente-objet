export function draw(fn) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.querySelector('svg');
    const wrapper = svg.querySelector('g.wrapper');
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'draw');
    wrapper.appendChild(g);
    for (let x = -190; x < 200; x += 1) {
        const point = document.createElementNS(ns, 'circle');
        point.setAttribute('class', 'point');
        point.setAttribute('cx', x);
        point.setAttribute('cy', fn(x));
        point.setAttribute('r', 1);
        g.appendChild(point);
    }

}

function bezierCurve(x, fn, incr) {
    const coef = 1 / 3;
    const dx = 2 * incr;

    const dy1 = fn(x) - fn(x - 2 * incr);
    const dy2 = fn(x + incr) - fn(x - incr);

    const cx1 = x - incr + coef * incr;
    const cy1 = fn(x - incr) + (dy1 / dx) * coef * incr;
    const cx2 = x - coef * incr;
    const cy2 = fn(x) - (dy2 / dx) * coef * incr;

    return `C${cx1},${cy1} ${cx2},${cy2} ${x},${fn(x)} `;
}

export function drawPath(fn) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.querySelector('svg');
    const wrapper = svg.querySelector('g.wrapper');
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'draw');
    wrapper.appendChild(g);
    const start = -190;
    const end = 190;
    const incr = 10;
    let d = `M${start} ${fn(start)} `;
    for (let x = start + incr; x <= end; x += incr) {
        d += bezierCurve(x, fn, incr);
    }
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    g.appendChild(path);

}