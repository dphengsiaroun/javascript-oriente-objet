class Sequence {

    static serie(u, n) {
        let result = 0;
        for (let i = 0; i <= n; i++) {
            result += u(i);
        }
        return result;
    }
}

module.exports = {
    Sequence
};
