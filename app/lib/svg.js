export function printMouseCoord(svg) {
    console.log('printMouseCoord', svg);
    const pt = svg.createSVGPoint();

    function cursorPoint(evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        const result = pt.matrixTransform(svg.getScreenCTM().inverse());
        result.y = -result.y;
        return result;
    }

    svg.addEventListener('click', (evt) => {
        // Get point in global SVG space
        const loc = cursorPoint(evt);
        console.log('loc', loc);
    })
}