app.controller('DashboardCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location', 'TimelineService',function($scope, $http, $modal, AlertService, UserService, $location, TimelineService) {

  if(!UserService.currentUser){
    $location.path('/');
  }

  $scope.UserService = UserService;

  $scope.currentUser = UserService.currentUser;

  $scope.TimelineService = TimelineService;


  $scope.TimelineService.get(function(err,data) {
    $scope.dates = TimelineService.tasks;
    $scope.timelineValues = {index: 0};

    })

  $scope.$watchCollection('dates', function(){

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
          "startDate":"2014,1,1", //$scope.currentUser.createdAt
          "endDate":"2014,12,31", //$scope.currentUser.wedding
          "headline":"Vanuatu's financial year is the same as the calendar year", //nothing
          "tag":"FINANCIAL YEAR" //no tag
            }
          ]
        }
      };
    })


  $scope.showNew = function(){
    var modalInstance = $modal.open({
      templateUrl:'/views/newTaskModal.html',
      controller:'NewTaskModalCtrl'
    })

    modalInstance.result.then(function (data) {
      TimelineService.add(data);

      console.log("New Timeline data from main nav", data);
    })
  };

//these are the two buttons inside the timeline that are great
  $scope.editItem = function(){
    console.log('item to edit', TimelineService.tasks[$scope.timelineValues.index-1]);
    //open a modal identical to new modal
    //use resolve to pass in data and populate text fields
    //update in db via taskcontroller update Task
  };

  $scope.deleteItem = function(){
    //code from other one + DB delete somehow
    console.log('item to delete',$scope.timelineValues.index-1,TimelineService.tasks[$scope.timelineValues.index-1]);
  };


//this is the big modal with the list - OLD MODAL
  $scope.showEdit = function(){
    console.log('tl index maybe?',$scope.timelineValues.index-1);
    var modalInstance = $modal.open({
      templateUrl:'/views/editTaskModal.html',
      controller:'EditTaskModalCtrl'
    })

    // modalInstance.result.then(function (data) {
    //   TimelineService.update(data);

    //   console.log("New Timeline data from main nav", data);
    // })

  };

}]);