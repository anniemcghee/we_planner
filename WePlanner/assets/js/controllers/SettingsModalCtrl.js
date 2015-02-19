app.controller('SettingsModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', function($scope, $http, $modalInstance, AlertService, UserService) {

//the settings modal is accessible in the dropdown
//it will appear after user signup automatically
  console.log('Hello world');

   $scope.editUser = function(){
    alert('edit function')

    }

}]);