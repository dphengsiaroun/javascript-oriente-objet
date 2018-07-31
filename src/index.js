import * as rxjs from 'rxjs/bundles/rxjs.umd';

import { makeGraph } from './graph';

const { take, map } = rxjs.operators;



const g = document.querySelector('g');
const transform = g.getAttribute('transform');
console.log('transform', transform);

// rxjs.interval(20).pipe(
//     take(1000),
// ).subscribe(n => {
//     console.log(n);
//     g.setAttribute('transform', `scale(1, ${-1 + n / 100})`)
// });

makeGraph();