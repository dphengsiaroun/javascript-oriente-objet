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

Array.prototype.sum = function() {
    return this.reduce((acc, n) => acc + n, 0);
}

Array.prototype.mean = function () {
    return this.reduce((acc, n) => acc + n, 0) / this.length;
}

Array.prototype.min = function () {
    return this.reduce((acc, n) => acc === undefined ? n : acc > n ? n : acc, undefined);
}

Array.prototype.max = function () {
    return this.reduce((acc, n) => acc === undefined ? n : acc < n ? n : acc, undefined);
}

Array.prototype.weightedArithmeticMean = function () {
    return this.map(n => n[0] * n[1]).sum() / this.map(n => n[0]).sum();
}
