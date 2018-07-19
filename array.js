function compare(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

module.exports = {
    compare,
};

Array.prototype.reduce2 = function (cb, initial) {
    if (arguments.length === 1 && this.length === 0) {
        throw new Error('Reduce2 needs initial value on empty array');
    }
    let start = 0;
    let acc = initial;
    if (arguments.length === 1) {
        start = 1;
        acc = this[0];
    }
    for (let i = start; i < this.length; i++) {
        acc = cb(acc, this[i]);
    }
    return acc;
}

Array.prototype.map2 = function (cb) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(cb(this[i]));
    }
    return result;
}

Array.prototype.map3 = function (cb) {
    return this.reduce((acc, n) => acc.push(cb(n)) && acc, []);
}

Array.prototype.reverse2 = function () {
    return this.reduce((acc, n) => acc.unshift(n) && acc, []);
}

Array.prototype.filter2 = function (cb) {
    return this.reduce((acc, n) => cb(n) ? acc.push(n) && acc : acc, []);
}

Array.prototype.sum = function() {
    return this.reduce((acc, n) => acc + n, 0);
}

Array.prototype.mean = function () {
    return this.reduce((acc, n) => acc + n, 0) / this.length;
}

Array.prototype.min = function (cb = compare) {
    return this.reduce((acc, n) => {
        if (acc === undefined) {
            return this[0];
        }
        if (cb(acc, n) === 1) {
            return n;
        }
        return acc;
    }, undefined);
}

Array.prototype.min2 = function (cb = n => n) {
    return this[this.map(cb).reduce((acc, n, i) => 
        acc.min === undefined || acc.min > n ? {min: n, index: i} : acc, { min: undefined, index: -1}).index];
}


Array.prototype.max = function (cb = n => n) {
    return this[this.map(cb).reduce((acc, n, i) => 
        acc.min === undefined || acc.min < n ? {min: n, index: i} : acc, { min: undefined, index: -1}).index];
}

Array.prototype.weightedArithmeticMean = function () {
    return this.map(n => n[0] * n[1]).sum() / this.map(n => n[0]).sum();
}

Array.prototype.geometricMean = function () {
    return Math.pow(this.reduce((acc, n) => acc * n , 1), 1 / this.length) ;
}

Array.prototype.flat = function () {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i] instanceof Array) {
            result = result.concat(this[i].flat());
        } else {
            result.push(this[i]);
        }
    }
    return result;
}

Array.prototype.sort2 = function (cb) {
    let result = [];
    let a = this;

    while (a.length > 0) {
        const min = a.min(cb);
        result.push(min);
        a = a.filter(n => n !== min);
    }
    
    return result;
}

Array.prototype.sort3 = function (cb) {
    if (this.length === 0) {
        return this;
    }
    const min = this.min(cb);
    const remaining = this.filter(n => n !== min).sort3(cb);
    remaining.unshift(min);
    return remaining;
}
