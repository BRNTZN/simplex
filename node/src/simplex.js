module.exports = mainFunction;

var sourceLoader = require("./sourceLoader.js")

function mainFunction(fileName, log) {
  console.log("mainFunction");
  return sourceLoader.file(fileName).then(function(data) {
    var stream = dataStream(data);
    var variables = [];
    log(data.toString());
    while (stream.hasNext()) {
      console.log(stream.next())
      // if (stream.next() == '"') debugConsole.log('sqdf')
    }
  });
}

function dataStream(data) {
  var txt = data.toString();
  var i = 0;
  return {
    next: function() {
      return txt[i++];
    },
    hasNext: function() {
      return i < txt.length;
    }
  };
}
