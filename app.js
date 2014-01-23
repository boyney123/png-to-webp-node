
var express = require('express');
var app = express();
var fs = require('fs');
var events = require('events');
 var walk = require('walk')
var eventEmitter = new events.EventEmitter();

app.use("/bower_components", express.static(__dirname + '/app/bower_components'));
app.use("/js", express.static(__dirname + '/app/js'));
app.use("/app/input", express.static(__dirname + '/app/input'));
app.use("/app/tmp", express.static(__dirname + '/app/tmp'));
app.use("/styles", express.static(__dirname + '/app/styles'));

rmDir = function(dirPath) {
      try { var files = fs.readdirSync(dirPath); }
      catch(e) { return; }
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            rmDir(filePath);
        }
};



//create or clear the tmp folder for webp images
try{
    fs.mkdirSync('./app/tmp');
}catch(e){
    rmDir('./app/tmp');
}

//convert all the files to webp
var convert = require('./modules/convert.js')(eventEmitter);
convert.convertFilesToWebP();

var inputData = [];
var outputData = [];

//loop through files in folder and store there name and filesize.



//wait untill files are created
eventEmitter.on('webpFilesCreated', function(){

    walker = walk.walk("./app/input");

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

    wpWalker = walk.walk("./app/tmp");

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
