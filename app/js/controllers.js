var phonecatApp = angular.module('phonecatApp', []);
 
phonecatApp.controller('PhoneListCtrl', function ($scope, $http) {
  $http.get('/getFileData').success(function(data) {
    $scope.files = data;
  });
 
  $scope.orderProp = 'age';
});