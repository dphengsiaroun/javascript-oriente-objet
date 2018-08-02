export

function initCircle(svg1, svg2) {
    const ns = 'http://www.w3.org/2000/svg';
    const wrapper = svg1.querySelector('g.wrapper');
    console.log('wrapper', wrapper);
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'button');
    wrapper.appendChild(g);
    const circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', '1');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '0.15');
    g.appendChild(circle);
    const radius = document.createElementNS(ns, 'line');
    radius.setAttribute('x1', '0');
    radius.setAttribute('y1', '0');
    radius.setAttribute('x2', '1');
    radius.setAttribute('y2', '0');
    radius.setAttribute('stroke-width', '0.8%');
    g.appendChild(radius);

    const sinusLine = document.createElementNS(ns, 'line');
    sinusLine.setAttribute('x1', '0');
    sinusLine.setAttribute('y1', '0');
    sinusLine.setAttribute('x2', '1');
    sinusLine.setAttribute('y2', '0');
    sinusLine.setAttribute('stroke-width', '0.4%');
    sinusLine.setAttribute('stroke-dasharray', '0.01,0.01');
    g.appendChild(sinusLine);

    const cosinusLine = document.createElementNS(ns, 'line');
    cosinusLine.setAttribute('x1', '0');
    cosinusLine.setAttribute('y1', '0');
    cosinusLine.setAttribute('x2', '1');
    cosinusLine.setAttribute('y2', '0');
    cosinusLine.setAttribute('stroke-width', '0.4%');
    cosinusLine.setAttribute('stroke-dasharray', '0.01,0.01');
    g.appendChild(cosinusLine);



    circle.addEventListener('mousedown', function (event) {
        const pt = svg1.createSVGPoint();

        function cursorPoint(evt) {
            pt.x = evt.clientX;
            pt.y = evt.clientY;
            const result = pt.matrixTransform(svg1.getScreenCTM().inverse());
            result.y = -result.y;
            return result;
        }
        // Prevent default dragging of selected content
        event.preventDefault();
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);

        function mousemove(evt) {
            const loc = cursorPoint(evt);
            const dist = (loc.x**2 + loc.y**2)**0.5
            const pt = {
                x: loc.x / dist, 
                y: loc.y / dist, 
            }
            circle.setAttribute('cx', pt.x);
            circle.setAttribute('cy', pt.y);

            radius.setAttribute('x2', pt.x);
            radius.setAttribute('y2', pt.y);

            sinusLine.setAttribute('x1', pt.x);
            sinusLine.setAttribute('x2', pt.x);
            sinusLine.setAttribute('y2', pt.y);

            cosinusLine.setAttribute('y1', pt.y);
            cosinusLine.setAttribute('x2', pt.x);
            cosinusLine.setAttribute('y2', pt.y);
        }

        function mouseup() {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        }
    });



}