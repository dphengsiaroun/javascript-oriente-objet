function init() {
    const root = document.querySelector('div.graph');
    root.innerHTML = `
<div class="c-carre">c²</div>
<div class="a-carre">a²</div>
<div class="b-carre">b²</div>
`;

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 100 100`);
    root.appendChild(svg);


    for (let i = 0; i < 4; i++) {
        const g = document.createElementNS(ns, 'g');
        g.setAttribute('transform', `rotate(${90 * i}, 50, 50)`);
        g.setAttribute('class', `t${i}`);
        svg.appendChild(g);


        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', `M 0 0 L 80 0 L 0 20 Z`);
        path.setAttribute('fill', `black`);
        g.appendChild(path);
    }

    const line = document.createElementNS(ns, 'line');
    line.setAttribute('class', 'separator');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', 80);
    line.setAttribute('x2', 20);
    line.setAttribute('y2', 80);
    line.setAttribute('stroke', `black`);
    line.setAttribute('stroke-width', `0.3px`);
    svg.appendChild(line);




}

init();