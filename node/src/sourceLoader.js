module.exports = {
  file: file
};

var fs = require("fs");

function file(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(err, data){
      if (err) reject(err);
      else resolve(data);
    });
  });
}
