var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var simplex = require("../src/simplex.js");
function newConsole() {
  return {
    log: sinon.spy()
  };
}
it('console called', function(){
  expect(simplex).not.to.be.undefined;
  var console = newConsole();
  simplex("Brent", console);
  expect(console.log.called).to.be.true;
});
