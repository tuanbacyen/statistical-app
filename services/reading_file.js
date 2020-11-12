const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');
const iconvlite = require("iconv-lite");
const excelToJson = require('convert-excel-to-json');
const { log } = require('console');


const json_file = () => {
  const directoryPath = path.join("D:\\statistical-app", '6587245783416832');
  const list_path = walk(directoryPath);

  let content = fs.readFileSync(list_path[0]);
  let data = JSON.parse(content);
  return data;
}

const xml_file = (directory) => {
  const directoryPath = path.join(directory, "");
  const list_path = walk(directoryPath);
  const list_file_xml = list_path.filter((x) => { return x.includes(".xml") });

  var re = [];
  list_file_xml.forEach((file_path) => {
    const content = iconvlite.decode(fs.readFileSync(file_path), "UTF-8");
    xml2js.parseString(content, (err, result) => {
      if (err) {
        throw err;
      }
      if (result != null) {
        re.push({
          data: result,
          file_name: path.parse(file_path).name
        })
      }
    });
  });
  return re;
}

const csv_file = (path, sheet, columnToKey) => {
  const excelData = excelToJson({
    sourceFile: path,
    sheets: [{
      name: sheet,
      header: {
        rows: 1
      },
      columnToKey: columnToKey
    }]
  });
  return excelData[sheet];
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
  xml_file,
  csv_file,
};
