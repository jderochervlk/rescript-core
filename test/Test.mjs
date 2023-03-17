// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Fs from "fs";
import * as Path from "path";
import * as Util from "util";
import * as Curry from "rescript/lib/es6/curry.js";
import * as Core__Option from "../src/Core__Option.mjs";
import * as CodeFrame from "@babel/code-frame";

var dirname = (new URL('.', import.meta.url).pathname);

function cleanUpStackTrace(stack) {
  var removeInternalLines = function (lines, _i) {
    while(true) {
      var i = _i;
      if (i >= lines.length) {
        return lines;
      }
      if (lines[i].indexOf(" (internal/") >= 0) {
        return lines.slice(0, i);
      }
      _i = i + 1 | 0;
      continue ;
    };
  };
  return removeInternalLines(stack.split("\n").slice(2), 0).map(function (line) {
                return line.slice(2);
              }).join("\n");
}

function print(value) {
  var match = typeof value;
  if (match === "object" || match === "bigint") {
    return Util.inspect(value);
  } else if (match === "string") {
    return Core__Option.getExn(JSON.stringify(value));
  } else {
    return String(value);
  }
}

function run(loc, left, comparator, right) {
  if (Curry._2(comparator, left, right)) {
    return ;
  }
  var match = loc[0];
  var line = match[1];
  var file = match[0];
  var fileContent = Fs.readFileSync(Path.join(dirname, file), {
        encoding: "utf-8"
      });
  var left$1 = print(left);
  var right$1 = print(right);
  var codeFrame = CodeFrame.codeFrameColumns(fileContent, {
        start: {
          line: line
        }
      }, {
        highlightCode: true
      });
  var errorMessage = "\n  \u001b[31mTest Failure!\n  \u001b[36m" + file + "\u001b[0m:\u001b[2m" + String(line) + "\n" + codeFrame + "\n  \u001b[39mLeft: \u001b[31m" + left$1 + "\n  \u001b[39mRight: \u001b[31m" + right$1 + "\u001b[0m\n";
  console.log(errorMessage);
  var obj = {};
  Error.captureStackTrace(obj);
  console.log(cleanUpStackTrace(obj.stack));
}

export {
  dirname ,
  cleanUpStackTrace ,
  print ,
  run ,
}
/* dirname Not a pure module */
