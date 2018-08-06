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

function normalize(x) {
    if (Math.abs(x) < 1e-15) {
        x = 0;
    }
    return x;
}

function bezierCurve(x, fn, incr) {
    const coef = 1 / 3;
    const dx = 2 * incr;

    const dy1 = fn(x) - fn(x - 2 * incr);
    const dy2 = fn(x + incr) - fn(x - incr);

    const cx1 = normalize(x - incr + coef * incr);
    const cy1 = normalize(fn(x - incr) + (dy1 / dx) * coef * incr);
    const cx2 = normalize(x - coef * incr);
    const cy2 = normalize(fn(x) - (dy2 / dx) * coef * incr);

    x = normalize(x - coef * incr);
    const y = normalize(fn(x));


    return `C${cx1},${cy1} ${cx2},${cy2} ${x},${y} `;
}



export function drawPath(svg, fn, start, end, incr, color) {
    const ns = 'http://www.w3.org/2000/svg';
    const wrapper = svg.querySelector('g.wrapper');
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'draw');
    wrapper.appendChild(g);
    let d = `M${start} ${fn(start)} `;
    for (let x = start + incr; x <= end; x += incr) {
        d += bezierCurve(x, fn, incr);
    }
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke-width', '0.4%');
    path.setAttribute('stroke', color);
    g.appendChild(path);
    return g;
}

function bezierCurveXY(t, fnx, fny, incr) {
    const coef = 1 / 3;
    const dt = 2 * incr;

    const dx1 = fnx(t) - fnx(t - 2 * incr);
    const dx2 = fnx(t + incr) - fnx(t - incr);

    const dy1 = fny(t) - fny(t - 2 * incr);
    const dy2 = fny(t + incr) - fny(t - incr);

    const cx1 = fnx(t - incr) + (dx1 / dt) * coef * incr;
    const cy1 = fny(t - incr) + (dy1 / dt) * coef * incr;
    const cx2 = fnx(t) - (dx2 / dt) * coef * incr;
    const cy2 = fny(t) - (dy2 / dt) * coef * incr;

    return `C${cx1},${cy1} ${cx2},${cy2} ${fnx(t)},${fny(t)} `;
}

export function drawPathXY(svg, fnx, fny, start, end, incr, color) {
    const ns = 'http://www.w3.org/2000/svg';
    const wrapper = svg.querySelector('g.wrapper');
    console.log('wrapper', wrapper);
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'draw');
    wrapper.appendChild(g);
    let d = `M${fnx(start)} ${fny(start)} `;
    for (let t = start + incr; t <= end; t += incr) {
        d += bezierCurveXY(t, fnx, fny, incr);
    }
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', d);
    path.setAttribute('stroke-width', '0.4%');
    path.setAttribute('stroke', color);
    g.appendChild(path);
    return g;
}