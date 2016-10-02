#!/usr/bin/env node
'use strict';
var fs = require('fs');
var cli = require('cli');
cli.parse({
  force: [ 'f', 'Force Operation', 'boolean', false ]      // -b, Build Start files
});

var options = cli.parse(process.argv);

if (options[2] == 'create') {
  switch (options[3]) {
    case 'app':
      createApp ();
      break;
    default:
      endPoint (options[3]);
  }
}


function createApp () {
  var dir = ['./config', './routes', './models', './controllers'];
  var file = [
    './index.js',
    './config/connection.js',
    './routes/index.js',
    './routes/api.js'
  ];
  var snippet = [
    './bin/snippets/file_index.txt',
    './bin/snippets/file_connection.txt',
    './bin/snippets/file_route_index.txt',
    './bin/snippets/file_route_api.txt'
  ];


  console.log(``);
  console.log(`----> STARTING INITIAL BUILD <----`);
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


function endPoint (endPtName) {
  var routeDir = './routes/api.js';
  var route_pointer = '// Routes\r';
  var controller_pointer = '// Controllers\r';

  endPtName = endPtName.toLowerCase();

  var new_route = `\napp.use('/${endPtName}', ${endPtName}_route);`;
  var new_controller = `\nvar ${endPtName}_route = require('../controllers/${endPtName}');`;

  var body = fs.readFileSync(routeDir).toString();

  if (body.indexOf(endPtName) < 0 || options.force) {

    body = body.split('\n');
    body.splice();
    body[body.indexOf(route_pointer)] += new_route;
    body[body.indexOf(controller_pointer)] += new_controller;
    var output = body.join('\n');
    fs.writeFileSync(routeDir, output);


    if (!fs.existsSync(`./controllers/${endPtName}.js`)){
      fs.openSync(`./controllers/${endPtName}.js`, 'w');
      // fs.writeFileSync(`./controllers/${endPtName}.js`, fs.readFileSync(snippet[i]));
    }

    console.log(``);
    console.log(`++ ${endPtName} Endpoint created!`);
    console.log(``);
  } else {
    console.log(``);
    console.log(`-> ${endPtName} Endpoint already created!`);
    console.log(``);
  }


  // function remove () {
  //
  //   var body = fs.readFileSync(routeDir).toString();
  //   var idx = body.indexOf(search);
  //
  //   if (idx >= 0 ) {
  //     var output = body.substr(0, idx) + body.substr(idx + search.length);
  //     fs.writeFileSync('example.js', output);
  //   }
  //
  // }
}




// -------------------------> FOR DEVELOPMENT ONLY <-----------------------------

if (options[2] == 'delete') {
  var dir = ['./config', './routes', './models'];
  var file = [
    './index.js',
    './config/connection.js',
    './routes/index.js',
    './routes/api.js'
  ];
  var snippet = [
    './bin/snippets/file_index.txt',
    './bin/snippets/file_connection.txt',
    './bin/snippets/file_route_index.txt',
    './bin/snippets/file_route_api.txt'
  ];


  console.log(``);
  console.log(`----> DELETING build <----`);
  console.log(``);

  // -----> Create files <-------------
  for (var i = 0; i < file.length; i++) {
    if (fs.existsSync(file[i])){
      fs.unlinkSync(file[i], 'w');
      console.log(`-- ${file[i]} Deleted!`);
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
      console.log(`-- ${dir[i]} Deleted!`);
      console.log(``);
    } else {
      console.log(`-> ${dir[i]} already Deleted!`);
      console.log(``);
    }
  }

}
