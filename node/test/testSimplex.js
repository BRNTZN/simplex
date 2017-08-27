var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var simplex = require("../src/simplex.js");
var writeFile = require("../test/helpers/writeFile.js");
it('simplex defined', function(){
  expect(simplex).not.to.be.undefined;
});
it('console called', function(){
  var log = sinon.spy();
  return simplex("test/resources/file.txt", log).then(function() {
    expect(log.called).to.be.true;
    expect(log.getCall(0).args[0].toString()).to.equal("this is a file");
  });
});
it('console called 2', function(){
  var log = sinon.spy();
  return writeFile("test/resources/file2.txt", '"blabla" -> console.log').then(function() {
    return simplex("test/resources/file2.txt", log)
  }).then(function() {
    expect(log.called).to.be.true;
    expect(log.getCall(0).args[0].toString()).to.equal("blabla");
  });
});
