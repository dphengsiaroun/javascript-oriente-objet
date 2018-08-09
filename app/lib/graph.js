export class Graph {
    constructor(element, options) {
        const opts = Object.assign({
            xstart: -10,
            xend: 10,
            ystart: -10,
            yend: 10,
            incr: 1
        }, options);
        Object.assign(this, opts);
        this.opts = opts;
        this.center = {
            x: (this.xstart + this.xend) / 2,
            y: (this.ystart + this.yend) / 2,
        };
        this.zoomLevel = this.xend - this.xstart;
        this.ratioYX = (this.yend - this.ystart) / (this.xend - this.xstart);
        const ns = 'http://www.w3.org/2000/svg';

        const svg = document.createElementNS(ns, 'svg');
        this.svg = svg;

        element.appendChild(svg);

        this.wrapper = document.createElementNS(ns, 'g');
        this.wrapper.setAttribute('class', 'wrapper');
        this.wrapper.setAttribute('transform', `scale(1, -1)`);
        svg.appendChild(this.wrapper);


        const g = document.createElementNS(ns, 'g');
        g.setAttribute('class', 'graph');
        this.wrapper.appendChild(g);

        this.xLine = document.createElementNS(ns, 'line');
        g.appendChild(this.xLine);

        this.yLine = document.createElementNS(ns, 'line');
        g.appendChild(this.yLine);

        this.render();


        const width = (this.xstart - this.xend) / 100;
        for (let x = Math.ceil(this.xstart); x <= Math.floor(this.xend); x += this.incr) {
            const mark = document.createElementNS(ns, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', x);
            mark.setAttribute('x2', x);
            mark.setAttribute('y1', -width);
            mark.setAttribute('y2', width);
            mark.setAttribute('stroke-width', '0.15%');
            g.appendChild(mark);
        }
        for (let y = Math.ceil(this.ystart); y <= Math.floor(this.yend); y += this.incr) {
            const mark = document.createElementNS(ns, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', -width);
            mark.setAttribute('x2', width);
            mark.setAttribute('y1', y);
            mark.setAttribute('y2', y);
            mark.setAttribute('stroke-width', '0.15%');
            g.appendChild(mark);
        }


        svg.addEventListener('mousewheel', e => {
            console.log('e', e.deltaY);

            const pt = this.svg.createSVGPoint();
            const cursorPoint = evt => {
                pt.x = evt.clientX;
                pt.y = evt.clientY;
                const result = pt.matrixTransform(this.svg.getScreenCTM().inverse());
                return result;
            };
            const point = cursorPoint(e);
            console.log('point', point);

            const zoomIn = e.deltaY > 0;
            if (zoomIn) {
                this.zoom(2, point);
            } else {
                this.zoom(0.5, point);
            }
            this.render();

        });
    }

    zoom(factor, c) {
        console.log('factor', factor, 'c', c);
        this.zoomLevel *= factor;
        this.xstart = c.x + factor * (this.xstart - c.x);
        this.ystart = c.y + factor * (this.ystart - c.y);
        this.xend = c.x + factor * (this.xend - c.x);
        this.yend = c.y + factor * (this.yend - c.y);
    }

    render() {
        this.svg.setAttribute('viewBox', `${this.xstart} ${this.ystart} ${this.xend - this.xstart} ${this.yend - this.ystart}`);

        const xLine = this.xLine;
        xLine.setAttribute('x1', this.xstart);
        xLine.setAttribute('y1', 0);
        xLine.setAttribute('x2', this.xend);
        xLine.setAttribute('y2', 0);
        xLine.setAttribute('stroke-width', '0.4%');
        xLine.setAttribute('stroke', 'black');

        const yLine = this.yLine;
        yLine.setAttribute('x1', 0);
        yLine.setAttribute('y1', this.ystart);
        yLine.setAttribute('x2', 0);
        yLine.setAttribute('y2', this.yend);
        yLine.setAttribute('stroke-width', '0.4%');
        yLine.setAttribute('stroke', 'black');
    }

    addGrid(xstart, xend, ystart, yend, incr) {
        const ns = 'http://www.w3.org/2000/svg';

        const wrapper = this.svg.querySelector('.wrapper');
        const grid = document.createElementNS(ns, 'g');
        grid.setAttribute('class', 'grid');
        wrapper.appendChild(grid);

        for (let y = Math.ceil(ystart); y <= Math.floor(yend); y += incr) {
            const hLine = document.createElementNS(ns, 'line');
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
            const vLine = document.createElementNS(ns, 'line');
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
    }

    addNumber(xstart, xend, ystart, yend, incr) {
        const ns = 'http://www.w3.org/2000/svg';

        const wrapper = this.svg.querySelector('.wrapper');
        const numberAxis = document.createElementNS(ns, 'g');
        numberAxis.setAttribute('class', 'graph-number');
        numberAxis.setAttribute('transform', 'scale(1, -1)');
        wrapper.appendChild(numberAxis);

        for (let y = Math.ceil(ystart); y <= Math.floor(yend); y += incr) {
            if (y === 0) {
                continue;
            }
            const text = document.createElementNS(ns, 'text');
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
            const text = document.createElementNS(ns, 'text');
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
    }

}