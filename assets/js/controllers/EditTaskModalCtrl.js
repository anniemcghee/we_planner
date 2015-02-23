app.controller('EditTaskModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', 'TimelineService', function($scope, $http, $modalInstance, AlertService, UserService, TimelineService) {

//the settings modal is accessible in the dropdown
//it will appear after user signup automatically
  $scope.tasks = TimelineService.tasks

  console.log($scope.tasks);

   $scope.editTask = function(idx){
    alert('edit function')

    var modalInstance = $modal.open({
      templateUrl:'/views/editTaskIndexModalCtrl.html',
      controller:'EditTaskIndexModalCtrl'
    })
// reveals the modal for the specific task - kind of looks like add new modal
    }

  $scope.deleteTask = function(idx){
    $scope.tasks.splice(idx, 1);
    TimelineService.remove(idx);
    // $modalInstance.close();
  }

}]);