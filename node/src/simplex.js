module.exports = mainFunction;

var sourceLoader = require("./sourceLoader.js")

function mainFunction(fileName, log, errorLog) {
  var variables = {};

  return sourceLoader.file(fileName).then(function(data) {
    return Promise.resolve(read(data.toString()));
  });

  function read(data, lastValue) {
    // console.log("READ: '" + data + "'");
    data = data.trim();
    if (data.startsWith('"')) return readString(data);
    if (data.startsWith("->")) return passOn(data, lastValue);
    if (data.startsWith("=>")) return assign(data, lastValue);
    if (data.startsWith(";")) return read(data.slice(1));
    if (data.startsWith("Console.log!")) return log(lastValue);
    if (isNumber(data[0])) return readNumber(data);
    if (data.startsWith("+")) return add(data, lastValue);
    var variable = variableNameAtStart(data);
    if (variable) return read(data.slice(variable.length), variables[variable]);
    console.error("Unexpected expression: '" + data + "'");
    errorLog("Unexpected expression: '" + data + "'");
  }

  function readString(data) {
    var dataNstring = nextString(data);
    return read(dataNstring[0], dataNstring[1]);
  }

  // returns an array with string at start of input at index 0 and rest of the data at index 1
  function nextString(data) {
    var end = endingDoubleQuote(data);
    var string = data.slice(1, end);
    return [data.slice(end + 1), string]
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

  function readNumber(data) {
    var numberNrest = nextNumber(data);
    return read(numberNrest[0], numberNrest[1]);
  }

  // returns an array with number at start of input at index 0 and rest of the data at index 1
  function nextNumber(data) {
    var end = endOfNumber(data);
    var number = +data.slice(0, end);
    return [data.slice(end), number];
  }

  function isNumber(n) {
  	return !isNaN(parseFloat(n)) && isFinite(n);
	}

  function endOfNumber(data) {
		for (var i = 0; i < data.length; i++) {
      if (data[i] != ".")
			if (!isNumber(data[i])) return i;
		}
		return i;
	}

  function add(data, lastValue) {
    data = data.slice(1).trim();
    if (data.startsWith('"')) return addToString(data, lastValue);
    if (isNumber(data[0])) return addToNumber(data, lastValue);
    var variable = variableNameAtStart(data);
    if (variable) return read(data.slice(variable.length), lastValue + variables[variable]);
    console.error("Nothing to add: '" + data + "'");
  }

  function addToString(data, lastValue) {
    var dataNstring = nextString(data);
    return read(dataNstring[0], lastValue + dataNstring[1]);
  }

  function addToNumber(data, lastValue) {
    var dataNnumber = nextNumber(data);
    return read(dataNnumber[0], lastValue + dataNnumber[1]);
  }

  function variableNameAtStart(data) {
    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        if (data.startsWith(variable)) return variable;
      }
    }
  }
}
