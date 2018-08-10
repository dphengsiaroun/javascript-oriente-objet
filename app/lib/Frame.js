const NS = 'http://www.w3.org/2000/svg';

export class Frame {
    constructor(element, options) {
        this.element = element;
        const opts = Object.assign({
            xstart: 0,
            xend: 600,
            ystart: 0,
            yend: 600,
            isInteractive: true,
        }, options);
        Object.assign(this, opts);
        this.opts = opts;
        this.window = {};
        this.subscribers = [];

        this.translateCurrent = {
            x: 0,
            y: 0
        };
        this.zoomLevel = 1;

        this.svg = document.createElementNS(NS, 'svg');
        this.svg.style.cursor = 'pointer';
        element.appendChild(this.svg);

        this.translateGrp = document.createElementNS(NS, 'g');
        this.translateGrp.setAttribute('class', 'translate');
        this.translateGrp.setAttribute('transform', `translate(${this.translateCurrent.x}, ${this.translateCurrent.y})`);
        this.svg.appendChild(this.translateGrp);


        this.wrapper = document.createElementNS(NS, 'g');
        this.wrapper.setAttribute('class', 'wrapper');
        this.translateGrp.appendChild(this.wrapper);

        this.drawArea();

        this.resize();



        this.computeMatrix();
        this.updateWindow();

        if (this.isInteractive) {
            this.addTranslate();
            this.addZoom();
        }

        window.addEventListener('resize', () => {
            console.log('onresize');
            this.resize();
            this.render();
        });
    }

    render() {
        this.computeMatrix();
        this.updateWindow();
        this.onRender();
        this.subscribers.forEach(s => s.onRender());
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

    computeMatrix() {
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
        this.wrapper.setAttribute('transform', `matrix(${a}, ${b}, ${c}, ${d}, ${e}, ${f})`);
    }

    updateWindow() {
        this.window.topLeft = this.transform({
            x: 0,
            y: 0
        });
        this.window.bottomLeft = this.transform({
            x: 0,
            y: this.svg.clientHeight
        });
        this.window.topRight = this.transform({
            x: this.svg.clientWidth,
            y: 0
        });
        this.window.bottomRight = this.transform({
            x: this.svg.clientWidth,
            y: this.svg.clientHeight
        });
    }

    onRender() {}

    drawArea() {
        this.area = document.createElementNS(NS, 'rect');
        this.area.setAttribute('x', this.xstart);
        this.area.setAttribute('y', this.ystart);
        this.area.setAttribute('width', this.xend - this.xstart);
        this.area.setAttribute('height', this.yend - this.ystart);
        this.area.setAttribute('fill', 'hsla(240, 100%, 50%, 0.1)');
        this.wrapper.appendChild(this.area);
    }

    transform(p) {
        const pw = this.svg.clientWidth;
        const ph = this.svg.clientHeight;

        const xs = this.xstart;
        const ys = this.ystart;
        const xe = this.xend;
        const ye = this.yend;

        const xt = this.translateCurrent.x;
        const yt = this.translateCurrent.y;

        const a = (xe - xs) / pw;
        const b = 0;
        const c = 0;
        const d = (ys - ye) / ph;
        const e = xs;
        const f = ye;

        // Translate
        const q = {
            x: p.x - xt,
            y: p.y - yt
        }

        return {
            x: (a * q.x + c * q.y) + e,
            y: (b * q.x + d * q.y) + f,
        };
    }

    getCursorPoint(evt) {
        const pt = this.svg.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        return pt.matrixTransform(this.svg.getScreenCTM().inverse());
    }

    addTranslate() {
        this.svg.addEventListener('mousedown', event => {
            event.preventDefault();

            const sp = this.getCursorPoint(event);
            this.translateOrig = Object.assign({}, this.translateCurrent);

            let delta = {
                x: 0,
                y: 0
            };


            const mousemove = evt => {
                const cp = this.getCursorPoint(evt);
                delta.x = (cp.x - sp.x);
                delta.y = (cp.y - sp.y);
                this.translateCurrent = {
                    x: this.translateOrig.x + delta.x,
                    y: this.translateOrig.y + delta.y
                };
                this.translateGrp.setAttribute('transform', `translate(${this.translateCurrent.x}, ${this.translateCurrent.y})`);
                this.render();
            }

            const mouseup = (evt) => {
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);

            }
            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);
        });
    }

    addZoom() {
        this.svg.addEventListener('mousewheel', e => {
            event.preventDefault();
            const c = this.transform(this.getCursorPoint(e));
            let factor = 0.5;
            if (e.deltaY > 0) {
                factor = 2;
            }
            this.zoomLevel *= factor;
            this.xstart = c.x + factor * (this.xstart - c.x);
            this.ystart = c.y + factor * (this.ystart - c.y);
            this.xend = c.x + factor * (this.xend - c.x);
            this.yend = c.y + factor * (this.yend - c.y);
            this.render();
        });
    }
}