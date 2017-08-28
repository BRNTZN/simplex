var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
var sinon = require('sinon');
var sourceLoader = require("../src/sourceLoader.js");
chai.use(chaiAsPromised);

it('sourceLoader.file', function(){
  expect(sourceLoader).not.to.be.undefined;
  expect(sourceLoader.file).not.to.be.undefined;
  var data = sourceLoader.file("test/resources/file.txt")
  return expect(data.then(function(data) {
    return Promise.resolve(data.toString());
  })).to.eventually.equal('"this is a file" -> Console.log!\r\n');
});
