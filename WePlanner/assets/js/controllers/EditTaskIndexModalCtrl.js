app.controller('EditTaskIndexModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', 'TimelineService','task', function($scope, $http, $modalInstance, AlertService, UserService, TimelineService, task) {

//the settings modal is accessible in the dropdown
//it will appear after user signup automatically
  // $scope.task = TimelineService.tasks[$scope.timelineValues.index-1]

  // console.log('From edit task modal, scope.task is:',$scope.task);


  //DATEPICKER INFO

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
//END OF DATE PICKER

  $scope.what = task.headline;
  $scope.user1 = task.user1;
  $scope.user2 = task.user2;
  $scope.type = task.type;
  $scope.dt = task.endDate;
  $scope.tags = task.tag;
  //need a scope for TASK ID

  $scope.editTask = function(){
    // console.log('Loading this task',$scope.task)

    var taskData = {
      what: $scope.what,
      user1: $scope.user1,
      user2: $scope.user2,
      type: $scope.type,
      dt: $scope.dt,
      tags: $scope.tags[0].text
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