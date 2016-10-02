#!/usr/bin/env node
'use strict';
var fs = require('fs');
var cli = require('cli');
// cli.parse({
//   build: [ 'b', 'Build Starter Files', 'boolean', false ]      // -b, Build Start files
// });
var options = cli.parse(process.argv);


if (options[2] == 'create' && options[3] == 'app') {
  var dir = ['./config', './routes', './models'];
  var file = ['./index.js', './config/connection.js'];
  var snippet = ['./bin/snippets/file_index.txt', './bin/snippets/file_connection.txt'];


  console.log(``);
  console.log(`----> Starting initial build <----`);
  console.log(``);


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


  // -----> Create files <-------------
  for (var i = 0; i < file.length; i++) {
    if (!fs.existsSync(file[i])){
      fs.openSync(file[i], 'w');
      fs.writeFileSync(file[i], fs.readFileSync(snippet[i]));
      console.log(`++ ${file[i]} created!`);
      console.log(``);
    } else {
      console.log(`-> ${file[i]} already created!`);
      console.log(``);
    }
  }
}






// -------------------------> FOR DEVELOPMENT ONLY <-----------------------------

if (options[2] == 'delete') {
  var dir = ['./config', './routes', './models'];
  var file = ['./index.js', './config/connection.js'];
  var snippet = ['./bin/snippets/file_index.txt', './bin/snippets/file_connection.txt'];


  console.log(``);
  console.log(`----> DELETING build <----`);
  console.log(``);

  // -----> Create files <-------------
  for (var i = 0; i < file.length; i++) {
    if (fs.existsSync(file[i])){
      fs.unlinkSync(file[i], 'w');
      console.log(`++ ${file[i]} Deleted!`);
      console.log(``);
    } else {
      console.log(`-> ${file[i]} already Deleted!`);
      console.log(``);
    }
  }

  // -----> Create folders <-----------
  for (var i = 0; i < dir.length; i++) {
    if (fs.existsSync(dir[i])){
      fs.rmdirSync(dir[i]);
      console.log(`++ ${dir[i]} Deleted!`);
      console.log(``);
    } else {
      console.log(`-> ${dir[i]} already Deleted!`);
      console.log(``);
    }
  }

}
