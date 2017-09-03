var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var simplex = require("../src/simplex.js");
var writeFile = require("../test/helpers/writeFile.js");
it('simplex defined', function(){
  expect(simplex).not.to.be.undefined;
});

test('"blabla" -> Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("blabla");
});

test('xylqdfj', function(log, errorLog) {
  expect(log.called).to.be.false;
  expect(errorLog.called).to.be.true;
  expect(errorLog.getCall(0).args[0].toString()).to.equal("Unexpected expression: 'xylqdfj'");
});

test('"blabla" Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("blabla");
});

test('"blabla Console.log!', function(log, errorLog) {
  expect(log.called).to.be.false;
  expect(errorLog.called).to.be.true;
  expect(errorLog.getCall(0).args[0].toString()).to.equal("End of string not found: '\"blabla Console.log!'");
});

test('"blabla"; Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0]).to.be.undefined;
});

test('"hellothere" => a -> Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hellothere");
});

test( '"hello" => a \n' +
      '"whosethere" => b -> Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("whosethere");
});

test( '"hello" => a \n' +
      '"whosethere" => b Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("whosethere");
});

test( '"hello" => a \n' +
      '"whosethere" => b \n' +
      'a -> Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("hello");
});

test( '"hello" => a \n' +
      '"whosethere" => b \n' +
      'a Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("hello");
});

test( '4 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("4");
});

test( '0 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("0");
});

test( '12540 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("12540");
});

test( '5.3 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("5.3");
});

test( '5. Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("5");
});

test( '4 + 8 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("12");
});

test( '4 + 2.6 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("6.6");
});

test( '4 + "hehe" Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("4hehe");
});

test( '"hehe" + 6 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hehe6");
});

test( '"hehe" + "whaddup" Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hehewhaddup");
});

test( '"hello" => a \n' +
      '"whosethere" => b \n' +
      'a + b Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("hellowhosethere");
});

test( '2 => a \n' +
      '9 => b \n' +
      'a + b Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("11");
});

test( '4 => a \n' +
      'a + 6 Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("10");
});

test( '32 => a \n' +
      '5 + a Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("37");
});

test( '22 => a \n' +
      '"catch" + a Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("catch22");
});

test( '9 => a \n' +
      'a + " years" Console.log!', function(log, errorLog) {
        expect(errorLog.called).to.be.false;
        expect(log.called).to.be.true;
        expect(log.getCall(0).args[0].toString()).to.equal("9 years");
});

test('{"fnc" Console.log!}!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("fnc");
});

test('{"called" Console.log!}! "twice" Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("called");
  expect(log.getCall(1).args[0].toString()).to.equal("twice");
});

test('{8 + 1}! Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("9");
});

test('{4 + 3 Console.log}!!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("7");
});

test('4 + 1 Console.log => print5 !', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("5");
});

test('30 {Console.log!}!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("30");
});

test('19 {Console.log}!!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("19");
});

test('"abc" {Console.log}!!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("abc");
});

test('"wrd" => word {Console.log}!!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("wrd");
});

test('"bing" => bing; "bang" Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("bang");
});

test('"xjk" => xjk; xjk Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("xjk");
});

test('"bim" => bim; "bimbo" => bimbo; bim Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("bim");
});

test('"bim" => bim; "bimbo" => bimbo; bimbo Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("bimbo");
});

test('"something" Console.log!;', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("something");
});

test('"def" {Console.log!}!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("def");
});

test('"waw" {Console.log!} => printwaw; printwaw!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("waw");
});

test('"omg" {Console.log!} => printomg; "other" => other printomg!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("omg");
});

test('{"}" Console.log!} => printclosingbracket; printclosingbracket!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("}");
});

test('10 - 8 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("2");
});

test('12 => nmbr; nmbr - 8 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("4");
});

test('10 * 8 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("80");
});

test('12 => nmbr; nmbr * 3 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("36");
});

test('40 / 5 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("8");
});

test('12 => nmbr; nmbr / 3 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("4");
});

test('{4+6}! Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("10");
});

test('{4+6;}! Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0]).to.be.undefined;
});

test('{4+6}!; Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0]).to.be.undefined;
});

// !!!!!!!!!!!!!!
test('4 + 8 * 2 Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("24");
});

test('4 + (8 * 2) Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("20");
});

test('4 + ((4+4) * 2) Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("20");
});

test('(2*8) + ((2) * 2) Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("20");
});

test('"hello" => myvar; "goodbye" => myvar; myvar Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("goodbye");
});

test('String: a; "hey" => a; a Console.log!', function(log, errorLog) {
  expect(errorLog.called).to.be.false;
  expect(log.called).to.be.true;
  expect(log.getCall(0).args[0].toString()).to.equal("hey");
});

// test('"how" => String: a; a Console.log!', function(log, errorLog) {
//   expect(errorLog.called).to.be.false;
//   expect(log.called).to.be.true;
//   expect(log.getCall(0).args[0].toString()).to.equal("how");
// });
//
// test('String: a; 12 => a; a Console.log!', function(log, errorLog) {
//   expect(errorLog.called).to.be.true;
//   expect(log.called).to.be.false;
//   expect(errorLog.getCall(0).args[0].toString()).to.equal("Type error");
// });
//
// test('8 => String: a; a Console.log!', function(log, errorLog) {
//   expect(errorLog.called).to.be.true;
//   expect(log.called).to.be.false;
//   expect(errorLog.getCall(0).args[0].toString()).to.equal("Type error");
// });

// test('{4 + 8;}! => a; a Console.log!', function(log, errorLog) {
//   expect(errorLog.called).to.be.false;
//   expect(log.called).to.be.true;
//   expect(log.getCall(0).args[0].toString()).to.equal("how");
// });

// test('"param" (String a){a Console.log!}!', function(log, errorLog) {
//   expect(errorLog.called).to.be.false;
//   expect(log.called).to.be.true;
//   expect(log.getCall(0).args[0].toString()).to.equal("param");
// });


var count = 0;
function test(src, fn) {
  it(src, function(){
    count+=1;
    var localCount = count;
    var log = sinon.spy();
    var errorLog = sinon.spy();
    return writeFile("test/resources/main" + localCount + ".spx", src).then(function() {
      return simplex("test/resources/main" + localCount + ".spx", log, errorLog);
    }).then(function() {
      fn(log, errorLog);
    });
  });
}
