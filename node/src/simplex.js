module.exports = mainFunction;

var sourceLoader = require("./sourceLoader.js")

function mainFunction(fileName, log, errorLog) {
  var types = {
    "String": {
      name: "String"
    },
    "Number": {

    }
  }
  var variables = {
    "Console.log": {
      isFunction: true,
      code: "Console.log!"
    }
  };

  return sourceLoader.file(fileName).then(function(data) {
    return Promise.resolve(read(data.toString()));
  });

  function read(data, lastValue) {
    console.log("READ: '" + data + "'");
    data = data.trim();
    if (data.length < 1) return lastValue;
    if (data.startsWith('"')) return readString(data);
    if (data.startsWith("->")) return passOn(data, lastValue);
    if (data.startsWith("=>")) return assign(data, lastValue);
    if (data.startsWith(";")) return read(data.slice(1));
    if (data.startsWith("{")) return readFunction(data, lastValue);
    if (data.startsWith("!")) return exec(data, lastValue);
    if (isNumber(data[0])) return readNumber(data);
    if (data.startsWith("+")) return concatOrAddition(data, lastValue);
    if (data.startsWith("-")) return operate(data, lastValue, subtract);
    if (data.startsWith("*")) return operate(data, lastValue, multiply);
    if (data.startsWith("/")) return operate(data, lastValue, divide);
    if (data.startsWith("Console.log!")) return log(lastValue);
    if (data.startsWith("(")) return readSubResult(data, lastValue);
    var variable = variableNameAtStart(data);
    if (variable) {
      var value = variables[variable];
      if (value.isFunction) {
        if (lastValue && !value.args) value.args = lastValue;
      }
      return read(data.slice(variable.length), value);
    }
    var type = typeNameAtStart(data);
    if (type) return readDefinition(data, type, lastValue);
    console.error("Unexpected expression: '" + data + "'");
    errorLog("Unexpected expression: '" + data + "'");
  }

  function readString(data) {
    var dataNstring = nextString(data);
    if (dataNstring) return read(dataNstring[0], dataNstring[1]);
  }

  // returns an array with string at start of input at index 0 and rest of the data at index 1
  function nextString(data) {
    var end = endingDoubleQuote(data);
    if (end < 0) return errorLog("End of string not found: '" + data + "'");
    var string = data.slice(1, end);
    return [data.slice(end + 1), string]
  }

  function endingDoubleQuote(data, start) {
    var start = start || 0;
    for (var i = start+1; i < data.length; i++) {
      if(data[i] == "\\") i += 2;
      if(data[i] == '"') return i;
    }
    return -1;
  }

  function passOn(data, lastValue) {
    return read(data.slice(2), lastValue);
  }

  function assign(data, lastValue) {
    data = data.slice(2).trim();
    var end = endingIdentifier(data);
    var identifier = data.slice(0, end);
    if (types[identifier]) return readDefinition(data, identifier, lastValue);
    variables[identifier] = lastValue;
    return read(data.slice(end), lastValue);
  }

  // returns first occurence of (space/semicolon) or -1 if none found
  function endingIdentifier(data) {
    var firstSpace = data.indexOf(" ");
    var firstSemiColon = data.indexOf(";");
    if (firstSpace < 0) return firstSemiColon;
    if (firstSemiColon < 0) return firstSpace;
    return firstSpace < firstSemiColon ? firstSpace : firstSemiColon;
  }

  function readFunction(data, lastValue) {
    var end = endOfFunction(data);
    var simplexFunc = {
      isFunction: true,
      args: lastValue,
      code: data.slice(1, end - 1)
    }
    return read(data.slice(end), simplexFunc);
  }

  function endOfFunction(data) {
    var depth = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i] == '"') {
        var end = endingDoubleQuote(data.slice(i));
        if (end < 0) return errorLog("End of string not found: '" + data + "'");
        i += end + 1;
      }
      if (data[i] == "{") depth++;
      if (data[i] == "}") depth--;
      if (depth == 0) return i+1;
    }
    return -1;
  }

  function exec(data, lastValue) {
    var result = read(lastValue.code, lastValue.args);
    return read(data.slice(1), result);
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

  function concatOrAddition(data, lastValue) {
    data = data.trim();
    if (data.slice(1).trim().startsWith('"')) return addToString(data.slice(1).trim(), lastValue);
    return operate(data, lastValue, add);
  }

  function add(x, y) {
    return x + y;
  }

  function addToString(data, lastValue) {
    var dataNstring = nextString(data);
    return read(dataNstring[0], lastValue + dataNstring[1]);
  }

  function operate(data, lastValue, operation) {
    data = data.slice(1).trim();
    if (isNumber(data[0])) {
      var dataNnumber = nextNumber(data);
      return read(dataNnumber[0], operation(lastValue, dataNnumber[1]));
    }
    if (data[0] == "(") {
      var dataNsubResult = nextSubResult(data);
      return read(dataNsubResult[0], operation(lastValue, dataNsubResult[1]))
    }
    var variable = variableNameAtStart(data);
    if (variable) return read(data.slice(variable.length), operation(lastValue, variables[variable]));
    console.error("Nothing to " + operation.name + ": '" + data + "'");
  }

  function subtract(x, y) {
    return x - y;
  }

  function multiply(x, y) {
    return x*y;
  }

  function divide(x, y) {
    return x/y;
  }

  function readSubResult(data) {
    var dataNsubResult = nextSubResult(data);
    return read(dataNsubResult[0], dataNsubResult[1])
  }

  function nextSubResult(data) {
    var end = closingParentheses(data);
    return [data.slice(end+1), read(data.slice(1, end))];
  }

  function parenthesized(data, lastValue) {
    var end = closingParentheses(data);

  }

  function closingParentheses(data) {
    var depth = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i] == '"') {
        var end = endingDoubleQuote(data.slice(i));
        if (end < 0) return errorLog("End of string not found: '" + data + "'");
        i += end + 1;
      }
      if (data[i] == "(") depth++;
      if (data[i] == ")") depth--;
      if (depth == 0) return i;
    }
    return -1;
  }

  function variableNameAtStart(data) {
    var foundVariable;
    forEachVariable(function(variable) {
      if (data.startsWith(variable)) {
        if (!foundVariable) foundVariable = variable;
        if (foundVariable.length < variable.length) foundVariable = variable;
      }
    });
    return foundVariable;
  }

  function forEachVariable(fn) {
    for (var variable in variables) {
      if (variables.hasOwnProperty(variable)) {
        fn(variable);
      }
    }
  }

  function typeNameAtStart(data) {
    var foundType;
    forEachType(function(type) {
      if (data.startsWith(type)) {
        if (!foundType) foundType = type;
        if (foundType.length < type.length) foundType = type;
      }
    });
    return foundType;
  }

  function forEachType(fn) {
    for (var type in types) {
      if (types.hasOwnProperty(type)) {
        fn(type);
      }
    }
  }

  function readDefinition(data, type, lastValue) {
    var typeObject = types[type];
    data = data.slice(type.length).trim();
    var end = endingIdentifier(data);
    var variableName = data.slice(0, end);
    if (!variables[variableName]) {
      variables[variableName] = {
        type: typeObject
      }
    } else {
      if (variables[variableName].type) return errorLog(variableName + " is already defined as " + typeObject.name + ", cannot define again: " + data);
      variables[variableName].type = typeObject;
    }
    if (lastValue) variables[variableName] = lastValue;
    data = data.slice(variableName.length - 1).trim();
    return read(data, variables[variableName])
  }
}
