app.controller('DashboardCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location', 'TimelineService',function($scope, $http, $modal, AlertService, UserService, $location, TimelineService) {

$scope.UserService = UserService;

$scope.currentUser = UserService.currentUser

console.log($scope.currentUser.id)

//get the current user CHECK

//get the array of tasks associated to that user CHECK

// console.log($scope.tasks);

//loop through them and present them in $scope.data or src

var makeTimeline = function() {

    $http.get('/api/user/'+$scope.currentUser.id+'/tasks')
      .success(function(data){
        $scope.tasks = data;
        // console.log($scope.tasks);

        $scope.dates = [];

        for (i = 0; i < $scope.tasks.length; i++) {
          $scope.dates[i] = {
            "startDate":$scope.tasks[i].dt,
            "endDate":$scope.tasks[i].dt,
            "headline":$scope.tasks[i].what,
            "text":"Person",
            "tag":$scope.tasks[i].tags
          }
        }

        console.log('HEY');
        // console.log($scope.dates);

          $scope.data = {

                "timeline":
                {
                  "headline":$scope.currentUser.lastName+" Wedding",
                  "type":"default",
                  "text":"<p>A timeline dedicated to strategizing together leading to the big day.</p>",
            //for each task in $scope.tasks - present them like this
                  "date": $scope.dates,
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
          console.log($scope.dates);
      }).error(function(err){
        alert('ERROR!');
      })
}

makeTimeline();




}]);