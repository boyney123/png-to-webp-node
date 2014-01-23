
var express = require('express');
var app = express();
var fs = require('fs');

var convert = require('./modules/convert.js')();
convert.convertFilesToWebP();

var inputData = [];
var outputData = [];

//loop through files in folder and store there name and filesize.

var walk = require('walk')
    , fs = require('fs')
    , options
    , walker
    ;

options = {
followLinks: false
// directories with these keys will be skipped
, filters: ["Temp", "_Temp", ".DS_Store"]
};

walker = walk.walk("./app/input", options);

walker.on("file", function (root, fileStats, next) {
    inputData[fileStats.name] = fileStats.size;
    next();
});

wpWalker = walk.walk("./app/output", options);

wpWalker.on("file", function (root, fileStats, next) {
    outputData[fileStats.name] = fileStats.size;
    next();
});


//TODO: parse data and return it pretty...??

//I am parsing the data, maybe I need the path to each file?
// {
//     oringal:'path/path.png',
//     webp:'path',
//     orgSize:222,
//     webpsize:222
// }


app.use("/bower_components", express.static(__dirname + '/app/bower_components'));
app.use("/js", express.static(__dirname + '/app/js'));
app.use("/input", express.static(__dirname + '/app/input'));
app.use("/output", express.static(__dirname + '/app/output'));
app.use("/styles", express.static(__dirname + '/app/styles'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/app/index.html');
});

app.get('/getFileData', function(req, res) {

    var data = [
    {
        orgFilePath:'./input/bogdan.png',
        orgFileSize: 12000,
        webpFilePath:'./output/bogdan.webp',
        webpFileSize: 21222
    }, {
        orgFilePath:'./input/Vassily.png',
        orgFileSize: 12000,
        webpFilePath:'./output/Vassily.webp',
        webpFileSize: 21222
    }];


    res.send(data);
});

app.listen(3000);
