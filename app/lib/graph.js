export class Graph {
    constructor(element, xstart, xend, ystart, yend, incr) {
        const ns = 'http://www.w3.org/2000/svg';

        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', `${xstart} ${ystart} ${xend - xstart} ${yend - ystart}`);
        element.appendChild(svg);

        const wrapper = document.createElementNS(ns, 'g');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.setAttribute('transform', 'scale(1, -1)');
        svg.appendChild(wrapper);

        const g = document.createElementNS(ns, 'g');
        g.setAttribute('class', 'graph');
        wrapper.appendChild(g);

        const xLine = document.createElementNS(ns, 'line');
        xLine.setAttribute('x1', xstart);
        xLine.setAttribute('y1', 0);
        xLine.setAttribute('x2', xend);
        xLine.setAttribute('y2', 0);
        xLine.setAttribute('stroke-width', '0.4%');
        xLine.setAttribute('stroke', 'black');
        g.appendChild(xLine);

        const yLine = document.createElementNS(ns, 'line');
        yLine.setAttribute('x1', 0);
        yLine.setAttribute('y1', ystart);
        yLine.setAttribute('x2', 0);
        yLine.setAttribute('y2', yend);
        yLine.setAttribute('stroke-width', '0.4%');
        yLine.setAttribute('stroke', 'black');
        g.appendChild(yLine);


        const width = (xstart - xend) / 100;
        for (let x = Math.ceil(xstart); x <= Math.floor(xend); x += incr) {
            const mark = document.createElementNS(ns, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', x);
            mark.setAttribute('x2', x);
            mark.setAttribute('y1', -width);
            mark.setAttribute('y2', width);
            mark.setAttribute('stroke-width', '0.15%');
            g.appendChild(mark);
        }
        for (let y = Math.ceil(ystart); y <= Math.floor(yend); y += incr) {
            const mark = document.createElementNS(ns, 'line');
            mark.setAttribute('class', 'mark');
            mark.setAttribute('x1', -width);
            mark.setAttribute('x2', width);
            mark.setAttribute('y1', y);
            mark.setAttribute('y2', y);
            mark.setAttribute('stroke-width', '0.15%');
            g.appendChild(mark);
        }
        this.svg = svg;

        this.zoomLevel = 1;
        svg.addEventListener('mousewheel', e => {
            console.log('e', e.deltaY);
            const zoomIn = e.deltaY > 0;
            if (zoomIn) {
                this.zoomLevel *= 2;
            } else {
                this.zoomLevel /= 2;
            }
            wrapper.setAttribute('transform', `scale(${this.zoomLevel}, -${this.zoomLevel})`);
        });
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