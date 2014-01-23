var phonecatApp = angular.module('phonecatApp', []);
 
phonecatApp.controller('PhoneListCtrl', function ($scope, $http) {
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

 
  $scope.orderProp = 'age';
});