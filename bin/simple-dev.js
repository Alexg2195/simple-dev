#!/usr/bin/env node
'use strict';
var fs = require('fs');
var cli = require('cli');
cli.parse({
  build: [ 'b', 'Build Starter Files', 'boolean', false ]      // -b, Build Start files
});
var options = cli.parse(process.argv);


if (options[2] == 'build') {
  var dir_routes = './routes';
  var dir_models = './models';
  var file_index = './index.js';


  console.log(``);
  console.log(`----> Starting initial build <----`);
  console.log(``);


  if (!fs.existsSync(dir_routes)){
    fs.mkdirSync(dir_routes);
    console.log(`++ ${dir_routes} created!`);
    console.log(``);
  } else {
    console.log(`-> ${dir_routes} already created!`);
    console.log(``);
  }

  if (!fs.existsSync(dir_models)){
    fs.mkdirSync(dir_models);
    console.log(`++ ${dir_models} created!`);
    console.log(``);
  } else {
    console.log(`-> ${dir_models} already created!`);
    console.log(``);
  }

  if (!fs.existsSync(file_index)){
    fs.openSync(file_index, 'w');
    console.log(`++ ${file_index} created!`);
    console.log(``);
  } else {
    console.log(`-> ${file_index} already created!`);
    console.log(``);
  }
}
