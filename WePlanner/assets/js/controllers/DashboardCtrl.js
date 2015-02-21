app.controller('DashboardCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location', 'TimelineService', '$timeout', function($scope, $http, $modal, AlertService, UserService, $location, TimelineService, $timeout) {

  if(!UserService.currentUser){
    $location.path('/');
  }

  $scope.task = [];

  $scope.UserService = UserService;

  $scope.currentUser = UserService.currentUser;

  $scope.TimelineService = TimelineService;


  $scope.TimelineService.get(function(err,data) {
    $scope.dates = TimelineService.tasks;
    $scope.timelineValues = {index: 0};

    })

  $scope.$watchCollection('dates', function(){

// $scope.taco = $scope.timelineValues

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
          "startDate":$scope.currentUser.createdAt,
          "endDate":$scope.currentUser.wedding, //$scope.currentUser.wedding
          "headline":"",
          "tag":""
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
      // $scope.timelineValues = {index: {}};

      console.log("New Timeline data from main nav", data);
    })
  };

//these are the two buttons inside the timeline that are great
  $scope.editItem = function(){
    $scope.task = TimelineService.tasks[$scope.timelineValues.index-1]
    console.log("TASK", $scope.task)
    // console.log('Task Index is:')
    // console.log('item to edit', $scope.task);
    //open a modal identical to new modal
    var modalInstance = $modal.open({
      templateUrl:'/views/editTaskIndexModal.html',
      controller:'EditTaskIndexModalCtrl',
      resolve:{
        task:function(){
          return $scope.task;
        }
      }
    }).result.then(function(updatedTask){
      $scope.task=updatedTask
      TimelineService.sort();
      //After modal edit and resolve / modal close do a timeline get request to refactor array
    },function(){
      // alert('modal closed with cancel')
    })
  }

  $scope.deleteItem = function(idx){
    $scope.task = TimelineService.tasks[$scope.timelineValues.index-1]

    console.log('THIS IS THE TASK',$scope.task)
    idx = $scope.timelineValues.index-1

    $http.delete('api/user/'+UserService.currentUser.id+'/tasks/'+$scope.task.id)
    // IT IS MAD AT SCOPE.TASK.ID because it doesn't know what it is
        .success(function(data){
        console.log('Deleted success',data);
      })
      .error(function(err){
        alert(err);
      });


    // $scope.tasks.splice(idx, 1);
    TimelineService.remove(idx);
    // $modalInstance.close();
  }



 // $scope.editPost = function() {
 //    $modal.open({
 //      templateUrl:'/views/post/editModal.html',
 //      controller:'PostEditModalCtrl',
 //      resolve:{
 //        post:function(){
 //          return $scope.post
 //        }
 //      }
 //    }).result.then(function(updatedPost){
 //      $scope.post=updatedPost
 //    },function(){
 //      alert('modal closed with cancel')
 //    })
 //  }

    //use resolve to pass in data and populate text fields
    //update in db via taskcontroller update Task

  // $scope.deleteItem = function(){
  //   //code from other one + DB delete somehow
  //   console.log('item to delete',$scope.timelineValues.index-1,TimelineService.tasks[$scope.timelineValues.index-1]);

  // // $scope.deleteTask = function(idx){
  // //   $scope.tasks.splice(idx, 1);
  // //   TimelineService.remove(idx);
  // //   // $modalInstance.close();
  // // }


  // };


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