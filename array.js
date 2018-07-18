Array.prototype.sum = function() {
    return this.reduce((acc, n) => acc + n, 0);
}

Array.prototype.mean = function () {
    return this.reduce((acc, n) => acc + n, 0) / this.length;
}

Array.prototype.min = function () {
    return this.reduce((acc, n) => acc === undefined ? n : acc > n ? n : acc, undefined);
}