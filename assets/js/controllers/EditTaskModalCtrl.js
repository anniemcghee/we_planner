app.controller('EditTaskModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', 'TimelineService', function($scope, $http, $modalInstance, AlertService, UserService, TimelineService) {

  $scope.tasks = TimelineService.tasks

  console.log($scope.tasks);

   $scope.editTask = function(idx){
    alert('edit function')

    var modalInstance = $modal.open({
      templateUrl:'/views/editTaskIndexModalCtrl.html',
      controller:'EditTaskIndexModalCtrl'
    })

    }

  $scope.deleteTask = function(idx){
    $scope.tasks.splice(idx, 1);
    TimelineService.remove(idx);
  }

}]);