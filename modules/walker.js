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

var walker = function(eventEmitter){

	var currentFileIndex = 1;
	var files = [];

	var walkerFile = function(){

	});




		
}


module.exports = walker;


		walker = walk.walk("./app/input", options);

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

    wpWalker = walk.walk("./app/tmp", options);

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
	};

