var fs = require('fs');

var tmpDirectory = function(eventEmitter){

	//Remove all files in a given directory
	removeAllFilesInDirectory = function(dirPath) {
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


	return {
		//Clears the path if one already exists or just creates one...
		init: function(dirPath){
			try{
    			fs.mkdirSync(dirPath);
			}catch(e){
			    removeAllFilesInDirectory(dirPath);
			}
		}
	}
}


module.exports = tmpDirectory;

