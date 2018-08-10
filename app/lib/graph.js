import {
    Frame
} from './Frame';

const NS = 'http://www.w3.org/2000/svg';

export class Graph extends Frame {
    constructor(element, options) {
        super(element, options);
        Object.assign(this.opts, {
            incr: 1
        });

        const graph = document.createElementNS(NS, 'g');
        graph.setAttribute('class', 'graph');
        this.wrapper.appendChild(graph);

        this.xLine = document.createElementNS(NS, 'line');
        graph.appendChild(this.xLine);

        this.yLine = document.createElementNS(NS, 'line');
        graph.appendChild(this.yLine);
    }

    onUpdateMatrix() {
        this.xLine.setAttribute('x1', this.xstart);
        this.xLine.setAttribute('x2', this.xend);
        this.xLine.setAttribute('y1', 0);
        this.xLine.setAttribute('y2', 0);
        this.xLine.setAttribute('stroke-width', '0.15%');
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