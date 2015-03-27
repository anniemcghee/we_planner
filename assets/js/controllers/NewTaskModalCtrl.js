app.controller('NewTaskModalCtrl', ['$scope','$http','$modalInstance','$routeParams','AlertService', 'UserService', function($scope, $http, $modalInstance, $routeParams, AlertService, UserService){

  //DATEPICKER INFO

  $scope.today = function() {
    $scope.dt = new Date();
  };

  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
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

//tags input info here
  $scope.tags = [];

  $scope.loadTags = function(query) {
      return $http.get('/tags?query=' + query);
      };

  $scope.userOne = UserService.currentUser.userOne
  $scope.userTwo = UserService.currentUser.userTwo


  $scope.addNew = function(){

    var userId = UserService.currentUser.id

    var taskData = {
      type:$scope.type,
      dt:$scope.dt,
      user1:$scope.user1,
      user2:$scope.user2,
      what:$scope.what,
      tags:$scope.tags
    }

    $http.post('/api/user/'+userId+'/tasks', taskData)
    .success(function(data){

      AlertService.add('success','Task has been created.');
      $modalInstance.close(data);
    })
    .error(function(err){
      alert(err);
    })

  }



}]);