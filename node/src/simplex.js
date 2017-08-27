module.exports = mainFunction;

var sourceLoader = require("./sourceLoader.js")

function mainFunction(fileName, console) {
  return sourceLoader.file(fileName).then(function(data) {
    console.log(data);
  });
}
