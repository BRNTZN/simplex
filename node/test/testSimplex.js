var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var simplex = require("../src/simplex.js");
var writeFile = require("../test/helpers/writeFile.js");
it('simplex defined', function(){
  expect(simplex).not.to.be.undefined;
});

test('"blabla" -> Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("blabla");
});

test('"blabla" Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("blabla");
});

test('"blabla"; Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0]).to.be.undefined;
});

test('"hellothere" => a -> Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hellothere");
});

test( '"hello" => a \n' +
      '"whosethere" => b -> Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("whosethere");
});

test( '"hello" => a \n' +
      '"whosethere" => b Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("whosethere");
});

test( '"hello" => a \n' +
      '"whosethere" => b \n' +
      'a -> Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hello");
});

test( '"hello" => a \n' +
      '"whosethere" => b \n' +
      'a Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hello");
});

test( '4 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("4");
});

test( '4 + 8 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("12");
});

function test(src, fn) {
  it(src, function(){
    var log = sinon.spy();
    return writeFile("test/resources/main.spx", src).then(function() {
      return simplex("test/resources/main.spx", log);
    }).then(function() {
      fn(log);
    });
  });
}
