app.controller('AuthModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', function($scope, $http, $modalInstance, AlertService, UserService){
//DATE PICKER ACTION IS BELOW
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

  $scope.login = function(){
    // alert('login function')
    UserService.login($scope.email,$scope.password,function(err,data){
      if(err){
        alert(err);
      } else if(data.user){
        AlertService.add('success','Welcome!');
        $modalInstance.close();
      } else {
        alert(data.error);
      }
    });
  }

  $scope.signup = function(){
//need signup to trigger User Service / session too
    if ($scope.password != $scope.signupPasswordConfirmation) {
      AlertService.add('danger','Password is not a match.')
      return
    }

    var signupData = {
      email:$scope.email,
      password:$scope.password,
      lastName:$scope.lastName,
      user1:$scope.user1,
      user2:$scope.user2,
      wedding:$scope.wedding
    }


    $http.post('/api/user',signupData)
    .success(function(data){
      $scope.login()
    })
    .error(function(err){
      alert(err);
    })
  }


}]);