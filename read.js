const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');
const iconvlite = require("iconv-lite");

const directoryPath = path.join(__dirname, '6587245783416832');

var walk = function readxx(dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
}

const list_path = walk(directoryPath);
console.log(list_path);

let rawdata = fs.readFileSync(list_path[0]);
let student = JSON.parse(rawdata);
console.log(student.length);

let data = fs.readFileSync(list_path[list_path.length - 1]);
const content = iconvlite.decode(data, "UTF-16");

xml2js.parseString(content, (err, result) => {
  if (err) {
    throw err;
  }
  console.log(result);
});
