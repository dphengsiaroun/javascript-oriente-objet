class Complex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    multiply(c) {
        return new Complex(this.x * c.x - this.y * c.y, this.x * c.y + this.y * c.x);
    }


}

module.exports = { Complex };