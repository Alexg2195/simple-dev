#!/usr/bin/env node
`use strict`;
var fs = require(`fs`);
var cli = require(`cli`);

var create = require(`./lib/create`);

var options = cli.parse(process.argv);


fs.readdir(`./`, function(err, files) {
  if(files.indexOf(`package.json`) !== -1){


    // NPM INIT = TRUE
    // Ready to use app
    switch(options[2]){
      case `create`:
        switch(options[3]) {
          case `app`:
            create.app();
            break;
          default:
            create.endPoint(options[3]);
        }
        break;
      default:
        logHelpMenu();
    }


  } else {
    console.log(`***** Please Run "npm init" before using and dev commands! *****`);
  }
});




function logHelpMenu(){
  console.log(`
    Welcome to simple-dev!

    Commands:

    > dev create app

    Will create all base files and install required packages.


    > dev create END_POINT_NAME

    Will create a REST end point in the API.
    `);
}
