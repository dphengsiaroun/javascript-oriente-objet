const NS = 'http://www.w3.org/2000/svg';

export class Path {
    constructor(frame, options) {
        this.opts = options;
        this.frame = frame;
        if (this.opts.start === undefined) {
            this.auto = true;
        }
        this.opts.fnx = this.opts.fnx || (t => t);
        this.opts.strokeWidth = frame.strokeWidth;
        this.onRender();
        this.frame.subscribers.push(this);
    }

    onRender() {
        this.elt && this.elt.remove();
        this.strokeWidth = this.opts.strokeWidth * this.frame.zoomLevel;
        let {fnx, fny, start, end, incr, color} = this.opts;
        if (this.auto) {
            const {topLeft, topRight} = this.frame.window;
            start = topLeft.x;
            end = topRight.x;
            incr = (end - start) / 100;
        }
        let d = `M${fnx(start)} ${fny(start)} `;
        for (let t = start + 2 * incr; t < end; t += incr) {
            d += bezierCurveXY(t, fnx, fny, incr);
        }
        this.elt = document.createElementNS(NS, 'path');
        this.elt.setAttribute('d', d);
        this.elt.setAttribute('stroke-width', `${this.strokeWidth}%`);
        this.elt.setAttribute('stroke', color);
        this.frame.wrapper.appendChild(this.elt);
    }
}

function throwIfNaN(x, label) {
    if (isNaN(x)) {
        throw new Error(`${label} is NaN`);
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
    throwIfNaN(cx1, 'cx1');
    throwIfNaN(cy1, 'cy1');
    throwIfNaN(cx2, 'cx2');
    throwIfNaN(cy2, 'cy2');

    return `C${r(cx1)},${r(cy1)} ${r(cx2)},${r(cy2)} ${r(fnx(t))},${r(fny(t))} `;
}

function r(x) {
    return Math.abs(x) < 1e-10 ? 0 : x;
}