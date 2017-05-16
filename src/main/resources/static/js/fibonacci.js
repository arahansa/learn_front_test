

function fibonacci(n) {
    if (n < 2) {
        return n;
    }

    var fibA = 0;
    var fibB = 1;
    var result = 0;

    for(var i = 2; i <= n; i++) {
        result = fibA + fibB;
        fibA = fibB;
        fibB = result;
    }

    return result;
}

if (typeof module !== 'undefined' && module.exports != null) { module.exports = fibonacci }