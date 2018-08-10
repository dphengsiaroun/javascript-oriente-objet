const NS = 'http://www.w3.org/2000/svg';

export class Frame {
    constructor(element, options) {
        this.element = element;
        const opts = Object.assign({
            xstart: 0,
            xend: 600,
            ystart: 0,
            yend: 600,
            incr: 1,
            isInteractive: true,
        }, options);
        Object.assign(this, opts);
        this.opts = opts;

        this.svg = document.createElementNS(NS, 'svg');
        this.svg.style.cursor = 'pointer';
        element.appendChild(this.svg);

        this.wrapper = document.createElementNS(NS, 'g');
        this.wrapper.setAttribute('class', 'wrapper');
        this.svg.appendChild(this.wrapper);

        this.drawArea();
        
        this.resize();
        this.render();
    }

    resize() {
        const svgWidth = this.svg.clientWidth;
        const svgHeight = this.svg.clientHeight;
        const svgRatioYX = svgHeight / svgWidth;

        const graphWidth = this.xend - this.xstart;
        const graphHeight = this.yend - this.ystart;
        const graphRatioYX = graphHeight / graphWidth;

        if (svgRatioYX < graphRatioYX) {
            const delta = ((graphHeight / svgRatioYX) - graphWidth) / 2;
            this.xstart -= delta;
            this.xend += delta;
        } else {
            const delta = ((graphWidth * svgRatioYX) - graphHeight) / 2;
            this.ystart -= delta;
            this.yend += delta;
        }
    }

    render() {
        console.log('this.svg %O', this.svg);
        const pw = this.svg.clientWidth;
        const ph = this.svg.clientHeight;

        const xs = this.xstart;
        const ys = this.ystart;
        const xe = this.xend;
        const ye = this.yend;


        const a = pw / (xe - xs);
        const b = 0;
        const c = 0;
        const d = ph / (ys - ye);
        const e = -(a * xs + c * ye);
        const f = -(b * xs + d * ye);
        // this.wrapper.setAttribute('transform', `matrix(${(this.xend - this.xstart) / pw}, 0, 0, ${(this.ystart - this.yend) / ph}, ${this.xstart}, ${this.yend})`);
        this.wrapper.setAttribute('transform', `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`);
    }

    drawArea() {
        this.area = document.createElementNS(NS, 'rect');
        this.area.setAttribute('x', this.xstart);
        this.area.setAttribute('y', this.ystart);
        this.area.setAttribute('width', this.xend - this.xstart);
        this.area.setAttribute('height', this.yend - this.ystart);
        this.area.setAttribute('fill', 'hsla(240, 100%, 50%, 0.5)');
        this.wrapper.appendChild(this.area);
    }
}