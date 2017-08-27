module.exports = write;

var fs = require("fs");

function write(fileName, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(fileName, data, function(err){
      if (err) reject(err);
      else resolve();
    });
  });
}
