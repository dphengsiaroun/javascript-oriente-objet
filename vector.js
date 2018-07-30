class Vector {

    static euclideanNorm(a) {
        return a.reduce((acc, n) => acc + n**2, 0)**0.5;
    }

}

module.exports = {
    Vector
};