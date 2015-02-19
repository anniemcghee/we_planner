app.controller('DashboardCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location', 'TimelineService',function($scope, $http, $modal, AlertService, UserService, $location, TimelineService) {

  $scope.UserService = UserService;

  $scope.currentUser = UserService.currentUser

// console.log($scope.currentUser.id)

//get the current user CHECK

//get the array of tasks associated to that user CHECK

// console.log($scope.tasks);

//loop through them and present them in $scope.data or src

// console.log(TimelineService.tasks);
$scope.TimelineService = TimelineService;



$scope.counter = 0;



$scope.TimelineService.get(function(err,data) {
  $scope.dates = TimelineService.tasks;
  $scope.timelineValues = {index: 0};
  // $scope.data = {

  //   "timeline":
  //   {
  //     "headline":$scope.currentUser.lastName+" Wedding",
  //     "type":"default",
  //     "text":"<p>A timeline dedicated to strategizing together leading to the big day.</p>",
  //   //for each task in $scope.tasks - present them like this
  //   "date": TimelineService.tasks,
  //   "era": [
  //   {
  //       "startDate":"2014,1,1", //date of sign up
  //       "endDate":"2014,12,31", //current date
  //       "headline":"Vanuatu's financial year is the same as the calendar year",
  //       "tag":"FINANCIAL YEAR"
  //     }
  //     ]
  //   }
  // };

})

$scope.taco = function() {
  var random = Math.floor(Math.random() * ($scope.data.timeline['date'].length)) + 1;
  console.log("Changing slide: ", random);
  $scope.timelineValues['index'] = random;
}




    $scope.$watchCollection('dates', function(){ //something changing in the scope that is being watched triggers the function
      // alert('things changing');
      // $scope.data.timeline['date'] = TimelineService.tasks
        $scope.data = {

    "timeline":
    {
      "headline":$scope.currentUser.lastName+" Wedding",
      "type":"default",
      "text":"<p>A timeline dedicated to strategizing together leading to the big day.</p>",
    //for each task in $scope.tasks - present them like this
    "date": TimelineService.tasks,
    "era": [
    {
        "startDate":"2014,1,1", //date of sign up
        "endDate":"2014,12,31", //current date
        "headline":"Vanuatu's financial year is the same as the calendar year",
        "tag":"FINANCIAL YEAR"
      }
      ]
    }
  };


    })





  }]);