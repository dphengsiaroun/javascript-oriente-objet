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