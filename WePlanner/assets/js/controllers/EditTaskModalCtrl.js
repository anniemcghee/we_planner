app.controller('EditTaskModalCtrl', ['$scope','$http','$modalInstance','AlertService', 'UserService', function($scope, $http, $modalInstance, AlertService, UserService) {

//the settings modal is accessible in the dropdown
//it will appear after user signup automatically
  console.log('Hello world');

   $scope.editTask = function(idx){
    alert('edit function')
// reveals the modal for the specific task - kind of looks like add new modal
    }

}]);