app.controller('DashboardCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location',function($scope, $http, $modal, AlertService, UserService, $location) {

$scope.UserService = UserService;

$scope.currentUser = UserService.currentUser

console.log($scope.currentUser.id)
//get the current user CHECK

$http.get('/api/user/'+$scope.currentUser.id+'/tasks')
    .success(function(data){
      $scope.tasks = data;
      console.log($scope.tasks);
    }).error(function(err){
      alert('ERROR!');
    })
//get the array of tasks associated to that user CHECK

//loop through them and present them in $scope.data

  $scope.data = {
    "timeline":
    {
      "headline":$scope.currentUser.lastName+" Wedding",
      "type":"default",
      "text":"<p>A timeline dedicated to strategizing together leading to the big day.</p>",
      "date": [
        {
          "startDate":"2014,04,29",
          "endDate":"2014,04,29",
          "headline":"Donor Consultations",
          "text":"<p>Government officials meet with donors to confer on policy priorities, providing an opportunity to align and better coordinate their work." +
          " A dialogue between the government and donors should begin to align priorities. In practice this process does not take place.</p>",
          "tag":"Donors"
        },
        {
          "startDate":"2014,05,13",
          "endDate":"2014,05,17",
          "headline":"Ministry Ceilings Established",
          "text":"<p>2014 Ministry budget ceilings are approved by the Ministerial Budget Committee and then the Council Of Ministers." +
          " In practice Vanuatu sees little movement in budget ceilings.</p>" +
          "<p>Using the established budget ceilings individual ministries submit their preliminary budget submissions to the ministry of finance " +
          "They also consider whether they wish to bid for <a href='/#/budget/vu/npps/2014'>New Policy Proposals</a>" +
          " - new pots of money to fund ministerial programs and initiatives.</p>",
          "tag":"Council of Ministers"
        }
      ],
      "era": [
        {
          "startDate":"2014,1,1",
          "endDate":"2014,12,31",
          "headline":"Vanuatu's financial year is the same as the calendar year",
          "tag":"FINANCIAL YEAR"
        }
      ]
    }
  };


}]);