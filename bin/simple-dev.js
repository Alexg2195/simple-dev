#!/usr/bin/env node
'use strict';
var fs = require('fs');
var cli = require('cli');
// cli.parse({
//   build: [ 'b', 'Build Starter Files', 'boolean', false ]      // -b, Build Start files
// });
var options = cli.parse(process.argv);


if (options[2] == 'create') {
  var file_index = './index.js';
  var dir = [
    './config',
    './routes',
    './models'
  ];


  console.log(``);
  console.log(`----> Starting initial build <----`);
  console.log(``);


  // -----> Create index.js <----------
  if (!fs.existsSync(file_index)){
    fs.openSync(file_index, 'w');
    fs.writeFileSync(file_index, fs.readFileSync('./bin/snippets/file_index.txt'));
    console.log(`++ ${file_index} created!`);
    console.log(``);
  } else {
    console.log(`-> ${file_index} already created!`);
    console.log(``);
  }


  // -----> Create folders <-----------
  for (var i = 0; i < dir.length; i++) {
    if (!fs.existsSync(dir[i])){
      fs.mkdirSync(dir[i]);
      console.log(`++ ${dir[i]} created!`);
      console.log(``);
    } else {
      console.log(`-> ${dir[i]} already created!`);
      console.log(``);
    }
  }

}
