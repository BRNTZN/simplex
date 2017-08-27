module.exports = {
  file: file
};

var fs = require("fs");
// var Promise = require("Promise");

function file(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(err, data){
      if (err) reject(err);
      resolve(data);
    });
  });
}
