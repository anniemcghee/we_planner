app.controller('HomeCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location',function($scope, $http, $modal, AlertService, UserService, $location) {


//scope.timelineData = false
//on login data, render /dashboard


  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function(){ //something changing in the scope that is being watched triggers the function
    $scope.currentUser = UserService.currentUser;
  })





}]);