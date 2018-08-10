import {
    Frame
} from './Frame';

const NS = 'http://www.w3.org/2000/svg';

export class Graph extends Frame {
    constructor(element, options) {
        super(element, options);
        this.incr = this.incr || 1;
        this.showMarks = this.showMarks || true;
        this.strokeWidth = '0.02%';

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
        console.log('onRender');
        const {topLeft, topRight, bottomLeft} = this.window;

        this.xLine.setAttribute('x1', topLeft.x);
        this.xLine.setAttribute('x2', topRight.x);
        this.xLine.setAttribute('y1', 0);
        this.xLine.setAttribute('y2', 0);
        this.xLine.setAttribute('stroke-width', this.strokeWidth);

        this.yLine.setAttribute('x1', 0);
        this.yLine.setAttribute('x2', 0);
        this.yLine.setAttribute('y1', topLeft.y);
        this.yLine.setAttribute('y2', bottomLeft.y);
        this.yLine.setAttribute('stroke-width', this.strokeWidth);

        
        this.drawMarks();
    }

    removeMarks() {
        if (this.marks) {
            this.marks.remove();
            delete this.marks;
        }
    }

    drawMarks() {
        this.removeMarks();
        this.marks = document.createElementNS(NS, 'g');
        this.marks.setAttribute('class', 'marks');
        this.graph.appendChild(this.marks);

        const {topLeft, topRight, bottomLeft} = this.window;

        const width = this.incr * 0.2;
        for (let x = Math.ceil(topLeft.x); x <= Math.floor(topRight.x); x += this.incr) {
            const mark = document.createElementNS(NS, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', x);
            mark.setAttribute('x2', x);
            mark.setAttribute('y1', -width);
            mark.setAttribute('y2', width);
            mark.setAttribute('stroke-width', this.strokeWidth);
            this.marks.appendChild(mark);
        }
        for (let y = Math.ceil(bottomLeft.y); y <= Math.floor(topLeft.y); y += this.incr) {
            const mark = document.createElementNS(NS, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', -width);
            mark.setAttribute('x2', width);
            mark.setAttribute('y1', y);
            mark.setAttribute('y2', y);
            mark.setAttribute('stroke-width', this.strokeWidth);
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