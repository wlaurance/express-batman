var joker = require(__dirname + '/../index');
var should = require('should');

describe('middleware', function() {

  it('should expose one function that returns a function', function() {
    joker.should.be.type('function');
    joker().should.be.type('function');
  });

});
