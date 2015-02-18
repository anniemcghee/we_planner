app.controller('AuthModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', function($scope, $http, $modalInstance, AlertService, UserService){

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
      lastName:$scope.lastName
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