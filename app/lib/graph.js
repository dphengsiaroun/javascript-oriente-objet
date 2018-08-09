const NS = 'http://www.w3.org/2000/svg';

export class Graph {
    constructor(element, options) {
        const opts = Object.assign({
            xstart: -2,
            xend: 5,
            ystart: -3,
            yend: 20,
            incr: 1,
            isInteractive: false,
        }, options);
        Object.assign(this, opts);
        this.opts = opts;

        this.svg = document.createElementNS(NS, 'svg');
        element.appendChild(this.svg);

        this.wrapper = document.createElementNS(NS, 'g');
        this.wrapper.setAttribute('class', 'wrapper');
        this.svg.appendChild(this.wrapper);


        const g = document.createElementNS(NS, 'g');
        g.setAttribute('class', 'graph');
        this.wrapper.appendChild(g);

        this.xLine = document.createElementNS(NS, 'line');
        g.appendChild(this.xLine);

        this.yLine = document.createElementNS(NS, 'line');
        g.appendChild(this.yLine);

        this.resize();
        this.render();
        if (this.isInteractive) {
            this.addTranslate();
            this.addZoom();
        }

    }

    addZoom() {
        this.svg.addEventListener('mousewheel', e => {
            event.preventDefault();
            const point = this.getCursorPoint(e);
            const zoomIn = e.deltaY > 0;
            if (zoomIn) {
                this.zoom(2, point);
            } else {
                this.zoom(0.5, point);
            }
            this.render();
        });
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

    getCursorPoint(evt) {
        const pt = this.svg.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        const result = pt.matrixTransform(this.svg.getScreenCTM().inverse());
        result.y = this.svgToGraph(result.y);
        return result;
    }

    addTranslate() {
        this.svg.addEventListener('mousedown', event => {
            event.preventDefault();

            const sp = this.getCursorPoint(event);
            const orig = {
                xstart: this.xstart,
                ystart: this.ystart,
                xend: this.xend,
                yend: this.yend,
            };

            let delta = {
                x: 0,
                y: 0
            };


            const mousemove = evt => {
                // Nothing to be done for the time being.
            }

            const mouseup = (evt) => {
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);
                const cp = this.getCursorPoint(evt);
                delta.x = (cp.x - sp.x);
                delta.y = (cp.y - sp.y);
                this.translate(orig, delta);
            }

            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);


        });
    }

    svgToGraph(y) {
        return -y + this.ystart + this.yend;
    }

    zoom(factor, c) {
        this.zoomLevel *= factor;
        this.xstart = c.x + factor * (this.xstart - c.x);
        this.ystart = c.y + factor * (this.ystart - c.y);
        this.xend = c.x + factor * (this.xend - c.x);
        this.yend = c.y + factor * (this.yend - c.y);
    }

    translate(orig, delta) {
        this.xstart = orig.xstart - delta.x;
        this.ystart = orig.ystart - delta.y;
        this.xend = orig.xend - delta.x;
        this.yend = orig.yend - delta.y;
        this.render();
    }

    render() {
        this.svg.setAttribute('viewBox', `${this.xstart} ${this.ystart} ${this.xend - this.xstart} ${this.yend - this.ystart}`);
        this.wrapper.setAttribute('transform', `translate(0, ${this.svgToGraph(0)}) scale(1, -1)`);

        const xLine = this.xLine;
        xLine.setAttribute('x1', this.xstart - 1000);
        xLine.setAttribute('y1', 0);
        xLine.setAttribute('x2', this.xend + 1000);
        xLine.setAttribute('y2', 0);
        xLine.setAttribute('stroke-width', '0.4%');
        xLine.setAttribute('stroke', 'black');

        const yLine = this.yLine;
        yLine.setAttribute('x1', 0);
        yLine.setAttribute('y1', this.ystart - 1000);
        yLine.setAttribute('x2', 0);
        yLine.setAttribute('y2', this.yend + 1000);
        yLine.setAttribute('stroke-width', '0.4%');
        yLine.setAttribute('stroke', 'black');

        if (this.marks) {
            this.marks.remove();
        }
        this.drawMarks();
        this.refreshNumbers();
        this.refreshGrid();
    }

    drawMarks() {
        this.marks = document.createElementNS(NS, 'g');
        this.marks.setAttribute('class', 'marks');
        this.wrapper.appendChild(this.marks);

        const width = (this.xstart - this.xend) / 100;
        for (let x = Math.ceil(this.xstart); x <= Math.floor(this.xend); x += this.incr) {
            const mark = document.createElementNS(NS, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', x);
            mark.setAttribute('x2', x);
            mark.setAttribute('y1', -width);
            mark.setAttribute('y2', width);
            mark.setAttribute('stroke-width', '0.15%');
            this.marks.appendChild(mark);
        }
        for (let y = Math.ceil(this.ystart); y <= Math.floor(this.yend); y += this.incr) {
            const mark = document.createElementNS(NS, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', -width);
            mark.setAttribute('x2', width);
            mark.setAttribute('y1', y);
            mark.setAttribute('y2', y);
            mark.setAttribute('stroke-width', '0.15%');
            this.marks.appendChild(mark);
        }
    }

    addGrid() {
        const {
            xstart,
            xend,
            ystart,
            yend,
            incr
        } = this;
        const wrapper = this.svg.querySelector('.wrapper');
        const grid = document.createElementNS(NS, 'g');
        grid.setAttribute('class', 'grid');
        wrapper.appendChild(grid);

        for (let y = Math.ceil(ystart); y <= Math.floor(yend); y += incr) {
            const hLine = document.createElementNS(NS, 'line');
            hLine.setAttribute('class', 'grid-line');
            hLine.setAttribute('x1', xstart);
            hLine.setAttribute('x2', xend);
            hLine.setAttribute('y1', y);
            hLine.setAttribute('y2', y);
            hLine.setAttribute('stroke-width', '0.1%');
            hLine.setAttribute('stroke-dasharray', '0.1');
            grid.appendChild(hLine);
        }
        for (let x = Math.ceil(xstart); x <= Math.floor(xend); x += incr) {
            const vLine = document.createElementNS(NS, 'line');
            vLine.setAttribute('class', 'grid-line');
            vLine.setAttribute('x1', x);
            vLine.setAttribute('x2', x);
            vLine.setAttribute('y1', ystart);
            vLine.setAttribute('y2', yend);
            vLine.setAttribute('stroke-width', '0.1%');
            vLine.setAttribute('stroke-dasharray', '0.1');
            grid.appendChild(vLine);
        }
        this.grid = grid;
    }

    removeGrid() {
        this.grid.remove();
        delete this.grid;
    }

    addNumber() {
        const {
            xstart,
            xend,
            ystart,
            yend,
            incr
        } = this;
        const wrapper = this.svg.querySelector('.wrapper');
        const numberAxis = document.createElementNS(NS, 'g');
        numberAxis.setAttribute('class', 'graph-number');
        numberAxis.setAttribute('transform', 'scale(1, -1)');
        wrapper.appendChild(numberAxis);

        for (let y = Math.ceil(-yend); y <= Math.floor(-ystart); y += incr) {
            if (y === 0) {
                continue;
            }
            const text = document.createElementNS(NS, 'text');
            text.setAttribute('class', 'graph-number-text');
            text.setAttribute('x', -0.4);
            text.setAttribute('y', y + 0.10);
            text.setAttribute('font-size', 0.35);
            text.setAttribute('text-anchor', 'end');
            text.innerHTML = -y;
            numberAxis.appendChild(text);
        }
        for (let x = Math.ceil(xstart); x <= Math.floor(xend); x += incr) {
            if (x === 0) {
                continue;
            }
            const text = document.createElementNS(NS, 'text');
            text.setAttribute('class', 'graph-number-text');
            text.setAttribute('x', x - 0.14);
            text.setAttribute('y', 0.8);
            text.setAttribute('font-size', 0.35);
            text.innerHTML = x;
            numberAxis.appendChild(text);
        }
        this.numberAxis = numberAxis;
    }

    removeNumber() {
        this.numberAxis.remove();
        delete this.numberAxis;
    }

    refreshNumbers() {
        if (this.numberAxis) {
            this.removeNumber();
            this.addNumber();
        }
    }

    refreshGrid() {
        if (this.grid) {
            this.removeGrid();
            this.addGrid();
        }
    }

}