function styledConsoleLog() {
  var argArray = [];

  if (arguments.length) {
    var startTagRe = /<span\s+style=(['"])([^'"]*)\1\s*>/gi;
    var endTagRe = /<\/span>/gi;

    var reResultArray;
    argArray.push(
      arguments[0].replace(startTagRe, "%c").replace(endTagRe, "%c")
    );
    while ((reResultArray = startTagRe.exec(arguments[0]))) {
      argArray.push(reResultArray[2]);
      argArray.push("");
    }
    for (var j = 1; j < arguments.length; j++) {
      argArray.push(arguments[j]);
    }
  }

  console.log.apply(console, argArray);
}
