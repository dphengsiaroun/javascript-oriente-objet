const NS = 'http://www.w3.org/2000/svg';

export class Path {
    constructor(frame, options) {
        this.opts = options;
        this.frame = frame;
        if (this.opts.start === undefined) {
            this.auto = true;
        }
        this.render();
        this.frame.subscribers.push(this);
    }

    render() {
        console.log('path render');
        this.elt && this.elt.remove();
        let {fnx, fny, start, end, incr, color} = this.opts;
        if (this.auto) {
            const {topLeft, topRight} = this.frame.window;
            start = topLeft.x;
            end = topRight.x;
            incr = (end - start) / 100;
        }
        let d = `M${fnx(start)} ${fny(start)} `;
        for (let t = start; t <= end; t += incr) {
            d += bezierCurveXY(t, fnx, fny, incr);
        }
        this.elt = document.createElementNS(NS, 'path');
        this.elt.setAttribute('d', d);
        this.elt.setAttribute('stroke-width', '0.05%');
        this.elt.setAttribute('stroke', color);
        this.frame.wrapper.appendChild(this.elt);
    }

    onRender() {
        this.render();
    }
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