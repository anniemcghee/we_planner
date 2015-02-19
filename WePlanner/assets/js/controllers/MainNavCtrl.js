app.controller('MainNavCtrl',['$scope','$location','$modal','UserService',function($scope, $location, $modal, UserService){

  $scope.navCollapsed = true;

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function(){ //something changing in the scope that is being watched triggers the function
    $scope.currentUser = UserService.currentUser;
  })

  $scope.isActive = function(url){
    return url == $location.path();
  //location is directly related to ngRoute that we loaded into our app - it helps get the url - or can set it with path('/whatever')
  }

  $scope.isActive = function(url){
    return url == $location.path();
  //location is directly related to ngRoute that we loaded into our app - it helps get the url - or can set it with path('/whatever')
  }

  // $scope.showTimeline = function(){
  //   //the timeline will magically render on homepage? not a modal.
  //   render '/';
  // }

  $scope.showLogin = function(){
    // alert('Here comes the modal');
    $modal.open({
      templateUrl:'/views/loginModal.html',
      controller:'AuthModalCtrl'
    })
  };

  $scope.showSignup = function(){
    // alert('Here comes the signup modal');
    $modal.open({
      templateUrl:'/views/signupModal.html',
      controller:'AuthModalCtrl'
    })
  };

  $scope.showNew = function(){
    var modalInstance = $modal.open({
      templateUrl:'/views/newTaskModal.html',
      controller:'NewTaskModalCtrl'
    })

    modalInstance.result.then(function (data) {
      console.log(data);
    })

  };

  $scope.showEdit = function(){
    $modal.open({
      templateUrl:'views/settingsModal.html',
      controller:'SettingsModalCtrl'
    })
  }

  $scope.logout = function(){
    UserService.logout(function(err, data){

    });
  }


}])