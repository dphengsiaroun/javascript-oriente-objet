class Complex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.syncFromXY();
    };

    syncFromXY() {
        this.r = (this.x**2 + this.y**2)**0.5;
        this.a = (this.x !== 0) ? Math.atan(this.y / this.x) : Math.sign(this.y) * Math.PI / 2;
    }

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
        this.syncFromXY();
        return this.r;
    }

    minus(c) {
        return new Complex(this.x - c.x, this.y - c.y);
    }

    plus(c) {
        return new Complex(this.x + c.x, this.y + c.y);
    }

    pow(p) {
        this.syncFromXY();
        return Complex.newFromPolar(this.r**p, this.a * p);
    }

}

function deg2Rad(d) {
    return d * Math.PI / 180;
}

module.exports = { Complex, deg2Rad };