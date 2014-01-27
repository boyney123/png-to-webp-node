var fs = require('fs');
var events = require('events');
var execFile = require('child_process').execFile;
var binPath = require('webp-bin').path;

var convert = function(eventEmitter){

	var currentFileIndex = 1;
	var files = [];

	//Recursive function that converts file to webp format
	var convertFile = function(){

		var fileName = files[currentFileIndex];
		fileName = fileName.substr(0, fileName.indexOf('.png'));

		//Magic happens...
		execFile(binPath, ('./app/assets/' + fileName + '.png -q 80 -o ./app/_tmp/' + fileName + '.webp').split(/\s+/), function(err, stdout, stderr) {
	    	currentFileIndex++;
	    	if(currentFileIndex < files.length){
	    		convertFile();
	    	}
	    	else{
	    		eventEmitter.emit('webpFilesCreated');
	    	}
		});

	};


	return {
		convertFilesToWebP:function(){
			//Read all files in input and conver them all
			fs.readdir('./app/assets/',function(err,_files){
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

