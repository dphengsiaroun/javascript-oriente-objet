import {
    badTranslate
} from './bad-translate';
import {
    Frame
} from '../../lib/Frame';

const NS = 'http://www.w3.org/2000/svg';

badTranslate(document.querySelector('div.graph'));

// import { goodTranslate } from './good-translate';

// goodTranslate(document.querySelector('div.graph2'));

const frame = new Frame(document.querySelector('div.graph2'));
const circle = document.createElementNS(NS, 'circle');
circle.setAttribute('cx', 0);
circle.setAttribute('cy', 0);
circle.setAttribute('r', 100);
frame.wrapper.appendChild(circle);