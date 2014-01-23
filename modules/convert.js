var fs = require('fs');
var events = require('events');
var execFile = require('child_process').execFile;
var binPath = require('webp-bin').path;

var convert = function(eventEmitter){

	var currentFileIndex = 1;
	var files = [];

	var convertFile = function(){

		var fileName = files[currentFileIndex];
		fileName = fileName.substr(0, fileName.indexOf('.png'));

		execFile(binPath, ('./app/input/' + fileName + '.png -q 80 -o ./app/tmp/' + fileName + '.webp').split(/\s+/), function(err, stdout, stderr) {
	    	currentFileIndex++;
	    	if(currentFileIndex < files.length){
	    		convertFile();
	    	}
	    	else{
	    		console.log("send event");
	    		eventEmitter.emit('webpFilesCreated');
	    	}
		});

	};


	return {
		convertFilesToWebP:function(){

			fs.readdir('./app/input/',function(err,_files){
			    if(err) throw err;

			    files = _files;

			    if(files.length > 0){
			    	convertFile();
			    }
			    
			});
		}
	}
}


module.exports = convert;

