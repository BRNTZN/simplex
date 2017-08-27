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
  return simplex("test/resources/file.txt", console).then(function() {
    expect(console.log.called).to.be.true;
    expect(console.log.getCall(0).args[0].toString()).to.equal("this is a file\r\n");
  });
});
