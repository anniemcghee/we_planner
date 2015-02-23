app.controller('AuthModalCtrl', ['$scope','$http','$location','$modalInstance','AlertService', 'UserService','TimelineService', function($scope, $http, $location, $modalInstance, AlertService, UserService, TimelineService){
//DATE PICKER ACTION IS BELOW
   $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };
  // $scope.showWeeks=false;
  // $scope.maxDate = '01-01-2020'

  // // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };

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
  $scope.userId = UserService.currentUser.id
//for the use of signup add wedding task ONLY

  //end of wedding task adder




  $scope.login = function(){
    // alert('login function')
    UserService.login($scope.email,$scope.password,function(err,data){
      if(err){
        alert(err);
      } else if(data.user){
        // AlertService.add('success','Welcome!');
        $modalInstance.close();
        $location.path('/dashboard')
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
      userOne:$scope.userOne,
      userTwo:$scope.userTwo,
      wedding:$scope.wedding
    }


    $http.post('/api/user',signupData)
    .success(function(data){
      $scope.login();
      //ADD A NEW TASK TO INITIALIZE TIMELINE
    })
    .error(function(err){
      alert(err);
    })

  }


}]);