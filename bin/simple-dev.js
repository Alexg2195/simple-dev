#!/usr/bin/env node
'use strict';
var fs = require('fs');
var cli = require('cli');
cli.parse({
  build: [ 'b', 'Build Starter Files', 'boolean', false ]      // -b, Build Start files
});
var options = cli.parse(process.argv);


console.log(options);


if (options[2] == 'build') {
  var dir_routes = './routes';
  var dir_models = './models';

  if (!fs.existsSync(dir_routes)){
    fs.mkdirSync(dir_routes);
  }
  
  if (!fs.existsSync(dir_models)){
    fs.mkdirSync(dir_models);
  }
}
