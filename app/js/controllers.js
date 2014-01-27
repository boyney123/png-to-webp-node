var webpApp = angular.module('webpApp', []);
 
webpApp.controller('FileCtrl', function ($scope, $http) {

  $scope.compressImageSize = true;

  $http.get('/getFileData').success(function(data) {
    $scope.files = data;
    $scope.totalSavings = calculateTotalSavings(data);
  });

  calculateTotalSavings = function(data){
  	var totalSavings = 0;
  	for(var i = 0; i < data.length; i++){
  		totalSavings += (data[i].orgFileSize - data[i].webpFileSize);
  	}
  	return (totalSavings).toFixed(2);
  }

});