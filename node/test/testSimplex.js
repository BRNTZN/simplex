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

test( '0 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("0");
});

test( '12540 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("12540");
});

test( '5.3 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("5.3");
});

test( '5. Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("5");
});

test( '4 + 8 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("12");
});

test( '4 + 2.6 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("6.6");
});

test( '4 + "hehe" Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("4hehe");
});

test( '"hehe" + 6 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hehe6");
});

test( '"hehe" + "whaddup" Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hehewhaddup");
});

test( '"hello" => a \n' +
      '"whosethere" => b \n' +
      'a + b Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hellowhosethere");
});

test( '2 => a \n' +
      '9 => b \n' +
      'a + b Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("11");
});

test( '4 => a \n' +
      'a + 6 Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("10");
});

test( '32 => a \n' +
      '5 + a Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("37");
});

test( '22 => a \n' +
      '"catch" + a Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("catch22");
});

test( '9 => a \n' +
      'a + " years" Console.log!', function(log) {
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("9 years");
});

var count = 0;
function test(src, fn) {
  it(src, function(){
    count+=1;
    var localCount = count;
    var log = sinon.spy();
    return writeFile("test/resources/main" + localCount + ".spx", src).then(function() {
      return simplex("test/resources/main" + localCount + ".spx", log);
    }).then(function() {
      fn(log);
    });
  });
}
