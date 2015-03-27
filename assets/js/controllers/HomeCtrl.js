app.controller('HomeCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location',function($scope, $http, $modal, AlertService, UserService, $location) {

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  })

}]);