var express = require('express');
var app = express();
var fs = require('fs');
var events = require('events');
var walk = require('walk')
var eventEmitter = new events.EventEmitter();
var tmpDirectory = require('./modules/tmpDirectory.js')();

var inputData = [];
var outputData = [];

app.use("/bower_components", express.static(__dirname + '/app/bower_components'));
app.use("/js", express.static(__dirname + '/app/js'));
app.use("/app/assets", express.static(__dirname + '/app/assets'));
app.use("/app/_tmp", express.static(__dirname + '/app/_tmp'));
app.use("/styles", express.static(__dirname + '/app/styles'));

//clean up and make new tmp directory for webp images.
tmpDirectory.init('./app/_tmp');


//convert all the files to webp
var convert = require('./modules/convert.js')(eventEmitter);
convert.convertFilesToWebP();


//wait untill files are created
eventEmitter.on('webpFilesCreated', function(){

    walker = walk.walk("./app/assets");

    walker.on("file", function (root, fileStats, next) {
        if(fileStats.name.indexOf('DS_Store') <= 0){
            var key = fileStats.name.substr(0, fileStats.name.indexOf('.png'));
            inputData[key] = {
                size: fileStats.size/1000,
                path : root + "/" + fileStats.name
            }
        }
        next();
    });

    wpWalker = walk.walk("./app/_tmp");

    wpWalker.on("file", function (root, fileStats, next) {
        if(fileStats.name.indexOf('DS_Store') <= 0){
            var key = fileStats.name.substr(0, fileStats.name.indexOf('.webp'));
            outputData[key] = {
                size: fileStats.size/1000,
                path : root + "/" + fileStats.name
            }
        }
        next();
    });

});


app.get('/', function(req, res) {
    res.sendfile(__dirname + '/app/index.html');
});

app.get('/getFileData', function(req, res) {

   var data = [];

   for (var key in inputData){
      if(outputData[key]){
        data.push({
            orgFilePath: inputData[key].path,
            orgFileSize: inputData[key].size,
            webpFilePath: outputData[key].path,
            webpFileSize: outputData[key].size
        }); 
      }
   }

  res.send(data);

});

app.listen(3000);
