import {
    Frame
} from './Frame';

import {
    round125,
    range
} from './util';

const NS = 'http://www.w3.org/2000/svg';

export class Graph extends Frame {
    constructor(element, options) {
        super(element, options);
        this.incr = this.incr || 1;
        this.showMarks = this.showMarks || true;
        this.showGrid = this.showGrid || false;
        this.showNumbers = this.showNumbers || true;
        this.opts.strokeWidth = this.opts.strokeWidth || 0.02;

        this.graph = document.createElementNS(NS, 'g');
        this.graph.setAttribute('class', 'graph');
        this.wrapper.appendChild(this.graph);

        this.xLine = document.createElementNS(NS, 'line');
        this.graph.appendChild(this.xLine);

        this.yLine = document.createElementNS(NS, 'line');
        this.graph.appendChild(this.yLine);
        this.onRender();
    }

    onRender() {
        this.computeProps();

        this.drawAxis();
        this.drawMarks();
        this.drawGrid();
        this.drawNumber();
    }

    computeProps() {
        const {
            topLeft,
            topRight,
            bottomLeft
        } = this.window;
        this.strokeWidth = this.opts.strokeWidth * this.zoomLevel;
        const x1 = this.transform({x: 0, y: 0}).x;
        const x2 = this.transform({x: 50, y: 0}).x;
        this.incr = round125(x2 - x1);
    }

    drawAxis() {
        const {
            topLeft,
            topRight,
            bottomLeft
        } = this.window;

        this.xLine.setAttribute('x1', topLeft.x);
        this.xLine.setAttribute('x2', topRight.x);
        this.xLine.setAttribute('y1', 0);
        this.xLine.setAttribute('y2', 0);
        this.xLine.setAttribute('stroke-width', `${this.strokeWidth}%`);

        this.yLine.setAttribute('x1', 0);
        this.yLine.setAttribute('x2', 0);
        this.yLine.setAttribute('y1', topLeft.y);
        this.yLine.setAttribute('y2', bottomLeft.y);
        this.yLine.setAttribute('stroke-width', `${this.strokeWidth}%`);
    }

    removeMarks() {
        this.showMarks = false;
        if (this.marks) {
            this.marks.remove();
            delete this.marks;
        }
    }

    drawMarks() {
        this.marks && this.marks.remove();
        if (!this.showMarks) {
            return;
        }
        this.marks = document.createElementNS(NS, 'g');
        this.marks.setAttribute('class', 'marks');
        this.graph.appendChild(this.marks);

        const {
            topLeft,
            topRight,
            bottomLeft
        } = this.window;

        const width = this.incr * 0.15;
        const xPositiveRange = range(this.incr, topRight.x, this.incr);
        const xNegativeRange = range(-this.incr, topLeft.x, -this.incr);
        xNegativeRange.concat(xPositiveRange).forEach(x => {
            const mark = document.createElementNS(NS, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', x);
            mark.setAttribute('x2', x);
            mark.setAttribute('y1', -width);
            mark.setAttribute('y2', width);
            mark.setAttribute('stroke-width', `${this.strokeWidth * 0.5}%`);
            this.marks.appendChild(mark);
        });
        const yPositiveRange = range(this.incr, topRight.y, this.incr);
        const yNegativeRange = range(-this.incr, bottomLeft.y, -this.incr);
        yNegativeRange.concat(yPositiveRange).forEach(y => {
            const mark = document.createElementNS(NS, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', -width);
            mark.setAttribute('x2', width);
            mark.setAttribute('y1', y);
            mark.setAttribute('y2', y);
            mark.setAttribute('stroke-width', `${this.strokeWidth * 0.5}%`);
            this.marks.appendChild(mark);
        });
    }

    drawGrid() {
        this.grid && this.grid.remove();
        if (!this.showGrid) {
            return;
        }
        const {
            topLeft,
            topRight,
            bottomLeft
        } = this.window;
        const grid = document.createElementNS(NS, 'g');
        grid.setAttribute('class', 'grid');
        this.graph.appendChild(grid);

        const xPositiveRange = range(this.incr, topRight.x, this.incr);
        const xNegativeRange = range(-this.incr, topLeft.x, -this.incr);
        xNegativeRange.concat(xPositiveRange).forEach(x => {
            const vLine = document.createElementNS(NS, 'line');
            vLine.setAttribute('class', 'grid-line');
            vLine.setAttribute('x1', x);
            vLine.setAttribute('x2', x);
            vLine.setAttribute('y1', bottomLeft.y);
            vLine.setAttribute('y2', topLeft.y);
            vLine.setAttribute('stroke-width', `${this.strokeWidth * 0.25}%`);
            vLine.setAttribute('stroke-dasharray', '0.2');
            grid.appendChild(vLine);
        });

        const yPositiveRange = range(this.incr, topRight.y, this.incr);
        const yNegativeRange = range(-this.incr, bottomLeft.y, -this.incr);
        yNegativeRange.concat(yPositiveRange).forEach(y => {
            const hLine = document.createElementNS(NS, 'line');
            hLine.setAttribute('class', 'grid-line');
            hLine.setAttribute('x1', topLeft.x);
            hLine.setAttribute('x2', topRight.x);
            hLine.setAttribute('y1', y);
            hLine.setAttribute('y2', y);
            hLine.setAttribute('stroke-width', `${this.strokeWidth * 0.25}%`);
            hLine.setAttribute('stroke-dasharray', '0.2');
            grid.appendChild(hLine);
        });
        this.grid = grid;
    }

    removeGrid() {
        this.showGrid = false;
        if (this.grid) {
            this.grid.remove();
            delete this.grid;
        }
    }

    drawNumber() {
        this.numberAxis && this.numberAxis.remove();
        if (!this.showNumbers) {
            return;
        }
        if (!this.showMarks) {
            return;
        }
        const {
            topLeft,
            topRight,
            bottomLeft
        } = this.window;
        const numberAxis = document.createElementNS(NS, 'g');
        numberAxis.setAttribute('class', 'graph-number');
        numberAxis.setAttribute('transform', 'scale(1, -1)');
        this.graph.appendChild(numberAxis);

        const fontSize = 0.5 * this.zoomLevel;

        const xPositiveRange = range(this.incr, topRight.x, this.incr);
        const xNegativeRange = range(-this.incr, topLeft.x, -this.incr);
        xNegativeRange.concat(xPositiveRange).forEach(x => {
            const text = document.createElementNS(NS, 'text');
            text.setAttribute('class', 'graph-number-text');
            text.setAttribute('x', x - 0.14);
            text.setAttribute('y', 0.8);
            text.setAttribute('font-size', fontSize);
            text.innerHTML = x;
            numberAxis.appendChild(text);
        });

        const yPositiveRange = range(this.incr, topRight.y, this.incr);
        const yNegativeRange = range(-this.incr, bottomLeft.y, -this.incr);
        yNegativeRange.concat(yPositiveRange).forEach(y => {
            const text = document.createElementNS(NS, 'text');
            text.setAttribute('class', 'graph-number-text');
            text.setAttribute('x', -0.4);
            text.setAttribute('y', y + 0.10);
            text.setAttribute('font-size', fontSize);
            text.setAttribute('text-anchor', 'end');
            text.innerHTML = -y;
            numberAxis.appendChild(text);
        });

        
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