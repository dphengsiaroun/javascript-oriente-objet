const NS = 'http://www.w3.org/2000/svg';

import {
    Path
} from './Path';

export class Tangent {
    constructor(graph, options) {
        this.circle = undefined;
        graph.svg.addEventListener('mousemove', e => {
            console.log('e', e);
            const pt = graph.transform(graph.getCursorPoint(e));
            console.log('pt', pt);
            this.circle && this.circle.remove();
            this.circle = document.createElementNS(NS, 'circle');
            graph.wrapper.appendChild(this.circle);
            this.circle.setAttribute('cx', pt.x);
            this.circle.setAttribute('cy', options.fny(pt.x));
            this.circle.setAttribute('r', graph.strokeWidth * 20);
            this.circle.setAttribute('fill', options.color);

            const h = 1e-10;
            this.derivative = f => x => (f(x + h) - f(x)) / h;
            this.slope = this.derivative(options.fny)(pt.x);
            console.log('this.slope', this.slope);
            this.offset = options.fny(pt.x) - this.slope * pt.x;

            this.tangentFn = x => this.offset + this.slope * x;
            if (!this.tangent) {
                this.tangent = new Path(graph, {
                    fny: this.tangentFn,
                    color: 'red'
                });
            } else {
                this.tangent.opts.fny = this.tangentFn;
                this.tangent.onRender();
            }

        });
    }
}