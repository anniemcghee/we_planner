app.controller('EditTaskIndexModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', 'TimelineService','task', function($scope, $http, $modalInstance, AlertService, UserService, TimelineService, task) {

//the settings modal is accessible in the dropdown
//it will appear after user signup automatically
  // $scope.task = TimelineService.tasks[$scope.timelineValues.index-1]

  // console.log('From edit task modal, scope.task is:',$scope.task);


      $scope.what = task.what;
      $scope.user1 = task.user1;
      $scope.user2 = task.user2;
      $scope.type = task.type;
      $scope.dt = task.dt;
      $scope.tags = task.tags

  $scope.editTask = function(){
    // console.log('Loading this task',$scope.task)

    var taskData = {
      what: $scope.what,
      user1: $scope.user1,
      user2: $scope.user2,
      type: $scope.type,
      dt: $scope.dt,
      tags: $scope.tags
    }

    $http.put('/api/user/'+UserService.currentUser.id+'/tasks/'+$scope.task, taskData)
      .success(function(data){
        AlertService.add('success','The task has been updated');
        $modalInstance.close(data);
      })
      .error(function(err){
        alert(err);
      });
  }

//    $scope.editTask = function(idx){
//     alert('edit function')

//     var modalInstance = $modal.open({
//       templateUrl:'/views/editTaskIndexModalCtrl.html',
//       controller:'EditTaskIndexModalCtrl'
//     })
// // reveals the modal for the specific task - kind of looks like add new modal
//     }

//   $scope.deleteTask = function(idx){
//     $scope.tasks.splice(idx, 1);
//     TimelineService.remove(idx);
//     // $modalInstance.close();
//   }

}]);