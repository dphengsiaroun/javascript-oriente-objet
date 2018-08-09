const NS = 'http://www.w3.org/2000/svg';


export function goodTranslate(element) {

    const xstart = 0;
    const xend = 300;
    const ystart = 0;
    const yend = 400;

    let tx = 0;
    let ty = 0;

    const svg = document.createElementNS(NS, 'svg');
    element.appendChild(svg);

    svg.setAttribute('viewBox', `${xstart} ${ystart} ${xend - xstart} ${yend - ystart}`);

    const wrapper = document.createElementNS(NS, 'g');

    function render() {
        wrapper.setAttribute('transform', `translate(${tx}, ${ty})`);
    }
    render();

    svg.appendChild(wrapper);


    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', 50);
    circle.setAttribute('cy', 50);
    circle.setAttribute('r', 20);
    wrapper.appendChild(circle);

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
            tx, ty
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
        tx = orig.tx + delta.x;
        ty = orig.ty + delta.y;
        render();
    }
}