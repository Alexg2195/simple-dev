var fs = require('fs');
var cmd = require('node-cmd');

module.exports = {
  app: function() {
    var dir = ['./config', './routes', './models', './controllers'];
    var file = [
      './index.js',
      './config/connection.js',
      './routes/index.js',
      './routes/api.js',
      '.gitignore',
    ];
    var snippet = [
      require('./../snippets/index.js'),
      require('./../snippets/connection.js'),
      require('./../snippets/routeIndex.js'),
      require('./../snippets/routeApi.js'),
      require('./../snippets/ignore.js'),
    ];

    console.log('\n----> STARTING INITIAL BUILD <----\n');

    // -----> Create folders <-----
    for(var i = 0; i < dir.length; i++) {
      if(!fs.existsSync(dir[i])) {
        fs.mkdirSync(dir[i]);
        console.log(`++ ${dir[i]} Created!\n`);
      } else {
        console.log(`>> ${dir[i]} Already Created!\n`);
      }
    }

    // -----> Create files <-----
    for(var i = 0; i < file.length; i++) {
      if(!fs.existsSync(file[i])) {
        fs.openSync(file[i], 'w');
        fs.writeFileSync(file[i], snippet[i]);
        console.log(`++ ${file[i]} Created!\n`);
      } else {
        console.log(`>> ${file[i]} Already Created!\n`);
      }
    }

    // -----> NPM Installs <-----
    console.log('>> Installing Required Packages....\n');
    var baseInstalls = 'express mongoose body-parser morgan';
    cmd.get(`npm install ${baseInstalls} --save`, function(data) {
      console.log('>> Packages Installed!\n');
    });

  },
  endPoint: function(endPtName) {
    var routeDir = './routes/api.js';
    var routePointer = '// Routes';
    var controllerPointer = '// Controllers';
    var newRoute = `\nrouter.use(\`/${endPtName}\`, ${endPtName}Route);`;
    var newController = `\nvar ${endPtName}Route = require(\`../controllers/${endPtName}\`);`;
    var controllerFilePath = `./controllers/${endPtName}.js`;
    var modelFilePath = `./models/${endPtName}.js`;
    var endpointSnippet = require('./../snippets/apiEndpoint.js');
    var modelSnippet = require('./../snippets/model.js');

    endPtName = endPtName.toLowerCase();
    if(endPtName[endPtName.length-1] !== 's') {
      endPtName += 's';
    }

    var apiJsBody = fs.readFileSync(routeDir).toString();

    if(apiJsBody.indexOf(endPtName) < 0) {

      apiJsBody = apiJsBody.split('\n');
      apiJsBody.splice();
      apiJsBody[apiJsBody.indexOf(routePointer)] += newRoute;
      apiJsBody[apiJsBody.indexOf(controllerPointer)] += newController;
      fs.writeFileSync(routeDir, apiJsBody.join('\n'));

      if(!fs.existsSync(controllerFilePath)) {
        fs.openSync(controllerFilePath, 'w');
        fs.writeFileSync(controllerFilePath, endpointSnippet(endPtName.slice(0, -1)));
      }

      if(!fs.existsSync(modelFilePath)) {
        fs.openSync(modelFilePath, 'w');
        fs.writeFileSync(modelFilePath, modelSnippet(endPtName));
      }

      console.log(`\n++ ${endPtName} Endpoint created!\n`);
    } else {
      console.log(`\n>> ${endPtName} Endpoint already created!\n`);
    }


    // function remove () {
    //
    //   var body = fs.readFileSync(routeDir).toString();
    //   var idx = body.indexOf(search);
    //
    //   if (idx >= 0 ) {
    //     var output = body.substr(0, idx) + body.substr(idx + search.length);
    //     fs.writeFileSync(`example.js`, output);
    //   }
    //
    // }
  }
}
