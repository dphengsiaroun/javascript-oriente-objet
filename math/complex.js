class Complex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    multiply(c) {
        return new Complex(this.x * c.x - this.y * c.y, this.x * c.y + this.y * c.x);
    }

    static newFromPolar(r, a) {
        return new Complex(r * Math.cos(a), r * Math.sin(a));
    }

    equals(c) {
        return this.minus(c).radius() < 1e-14;
    }

    radius() {
        return (this.x**2 + this.y**2)**0.5;
    }

    minus(c) {
        return new Complex(this.x - c.x, this.y - c.y);
    }

}

function deg2Rad(d) {
    return d * Math.PI / 180;
}

module.exports = { Complex, deg2Rad };