/**
 * Created by jarvis on 2017. 5. 15..
 */

var fibonacci = require('../js/fibonacci.js')
var chai = require('chai');

var should = chai.should();


describe('fibonacci test', () => {
    it('수열의 첫 번째 값은 0이어야 한다.', () => {
        // given
        // when
        const actual = fibonacci(0);

        // then
        actual.should.be.eql(0);
    });

    it('수열의 두 번째 값은 1이어야 한다.', () => {
        // given
        // when
        const actual = fibonacci(1);

        // then
        actual.should.be.eql(1);
    });

    it('수열의 n 번째 값은 n-2번째와 n-1번째 값의 합이어야 한다.', () => {
        fibonacci(3).should.be.eql(fibonacci(1) + fibonacci(2));
        fibonacci(100000).should.be.eql(fibonacci(99998) + fibonacci(99999));
    });
});

describe('fibonacci test2', () => {
    it('should render', function () {
        var a = 1;
        a.should.be.eql(1);
    });
});

