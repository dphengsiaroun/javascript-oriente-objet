const FORMAT_JS = 'js';
const FORMAT_TEXT = 'text';
const FORMAT_HTML = 'html';

const formatMonomial = format => (a, n, array) => {
    const maxDegree = array.reduce((acc, n, i) => n !== 0 ? i : acc, 0);
    if (a === 0) {
        if (maxDegree === 0 && n === 0) {
            return '0';
        }
        return '';
    }
    let result = '';
    if (a >= 0 && n !== maxDegree) {
        result += '+ ';
    }
    if (a < 0) {
        result += '-';
        if (n !== maxDegree) {
            result += ' ';
        }
    }
    
    if (!(Math.abs(a) === 1 && n > 0)) {
        result += `${Math.abs(a)}`;
        if (n > 0) {
            if (format === FORMAT_JS) {
                result += '*';
            }
        }
    }
    if (n > 0) {
        result += `x`;
    }
    if (n > 1) {
        if (format === FORMAT_JS) {
            result += `**${n}`;
        }
        if (format === FORMAT_TEXT) {
            result += `^${n}`;
        }
        if (format === FORMAT_HTML) {
            result += `<sup>${n}</sup>`;
        }
        
    }
    return result;
};

const polynomialFormat = (array, format) => array.map(formatMonomial(format)).reverse().join(' ').trim();

module.exports = {
    polynomialFormat
};