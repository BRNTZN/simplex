module.exports = mainFunction;

var sourceLoader = require("./sourceLoader.js")

function mainFunction(fileName, log) {
  var variables = {};

  return sourceLoader.file(fileName).then(function(data) {
    return Promise.resolve(read(data.toString()));
  });

  function read(data, lastValue) {
    console.log("READ: '" + data + "'");
    data = data.trim();
    if (data.startsWith('"')) return readString(data);
    if (data.startsWith("->")) return passOn(data, lastValue);
    if (data.startsWith("=>")) return assign(data, lastValue);
    if (data.startsWith("Console.log!")) return log(lastValue);
    var variable = variableNameAtStart(data);
    if (variable) return read(data.slice(variable.length), variables[variable]);
  }

  function readString(data) {
    var end = endingDoubleQuote(data);
    var string = data.slice(1, end);
    return read(data.slice(end + 1), string);
  }

  function endingDoubleQuote(data, start) {
    var start = start || 0;
    for (var i = start+1; i < data.length; i++) {
      if(data[i] == "\\") i += 2;
      if(data[i] == '"') return i;
    }
  }

  function passOn(data, lastValue) {
    return read(data.slice(2), lastValue);
  }

  function assign(data, lastValue) {
    data = data.slice(2).trim();
    var end = endingIdentifier(data);
    var variableName = data.slice(0, end);
    variables[variableName] = lastValue;
    return read(data.slice(end), lastValue);
  }

  function endingIdentifier(data) {
    return data.indexOf(" ");
  }

  function variableNameAtStart(data) {
    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        if (data.startsWith(variable)) return variable;
      }
    }
  }
}
