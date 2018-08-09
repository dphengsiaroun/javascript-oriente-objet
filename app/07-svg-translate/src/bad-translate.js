const NS = 'http://www.w3.org/2000/svg';


export function badTranslate(element) {

    let xstart = 0;
    let xend = 300;
    let ystart = 0;
    let yend = 400;

    const svg = document.createElementNS(NS, 'svg');
    element.appendChild(svg);

    function render() {
        svg.setAttribute('viewBox', `${xstart} ${ystart} ${xend - xstart} ${yend - ystart}`);
    }

    render();

    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', 50);
    circle.setAttribute('cy', 50);
    circle.setAttribute('r', 20);
    svg.appendChild(circle);

    function getCursorPoint(evt) {
        const pt = svg.createSVGPoint();
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        const result = pt.matrixTransform(svg.getScreenCTM().inverse());
        return result;
    }


    svg.addEventListener('mousedown', event => {
        event.preventDefault();

        const sp = getCursorPoint(event);
        const orig = {
            xstart: xstart,
            ystart: ystart,
            xend: xend,
            yend: yend,
        };

        let delta = {
            x: 0,
            y: 0
        };


        const mousemove = evt => {
            const cp = getCursorPoint(evt);
            delta.x = (cp.x - sp.x);
            delta.y = (cp.y - sp.y);
            translate(orig, delta);
        }

        const mouseup = (evt) => {
            document.removeEventListener('mousemove', mousemove);
            document.removeEventListener('mouseup', mouseup);
        }

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);


    });

    function translate(orig, delta) {
        xstart = orig.xstart - delta.x;
        ystart = orig.ystart - delta.y;
        xend = orig.xend - delta.x;
        yend = orig.yend - delta.y;
        render();
    }
}

