const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');
const iconvlite = require("iconv-lite");


const json_file = () => {
  const directoryPath = path.join("D:\\statistical-app", '6587245783416832');
  const list_path = walk(directoryPath);

  let content = fs.readFileSync(list_path[0]);
  let data = JSON.parse(content);
  return data;
}

const xml_file = () => {
  const directoryPath = path.join("D:\\statistical-app", '6587245783416832');
  const list_path = walk(directoryPath);
  const list_file_xml = list_path.filter((x) => { return x.includes(".xml") });

  var xx = [];
  list_file_xml.forEach((file) => {
    const content = iconvlite.decode(fs.readFileSync(file), "UTF-16");
    xml2js.parseString(content, (err, result) => {
      if (err) {
        throw err;
      }
      if (result != null) {
        xx.push(result);
      }
    });
  });
  return xx;
}

var walk = function (dir) {
  var results = [];
  var list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + '/' + file;
    var stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

module.exports = {
  json_file,
  xml_file
};
