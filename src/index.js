import * as rxjs from 'rxjs/bundles/rxjs.umd';

const { take, map } = rxjs.operators;

const g = document.querySelector('g');
const transform = g.getAttribute('transform');
console.log('transform', transform);
const ns = 'http://www.w3.org/2000/svg';

rxjs.interval(20).pipe(
    take(100),
).subscribe(n => {
    console.log(n);
    g.setAttribute('transform', `scale(1, ${-1 + n / 100})`)
});