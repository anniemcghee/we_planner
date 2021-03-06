app.controller('DashboardCtrl',['$scope','$http','$modal', 'AlertService','UserService', '$location', 'TimelineService', '$timeout', function($scope, $http, $modal, AlertService, UserService, $location, TimelineService, $timeout) {

  console.log('dashboard ctrl v2')

  if(!UserService.currentUser){
    $location.path('/');
  }

  $scope.task = [];

  $scope.UserService = UserService;

  $scope.currentUser = UserService.currentUser;

  $scope.TimelineService = TimelineService;


  var addNew = function(){
//this creates the wedding event upon signup

      var taskData = {
        type:"Appointment",
        dt:UserService.currentUser.wedding,
        user1:true,
        user2:true,
        what:"Get married!"
        // tags:$scope.tags
      }

      $http.post('/api/user/'+UserService.currentUser.id+'/tasks', taskData)
      .success(function(data){
        // alert('Wedding created');
        loadTasks();
        // AlertService.add('success','Task has been created.');
        // $modalInstance.close(data);
      })
      .error(function(err){
        alert('there was an error');
        console.log('error',err);
      })

    }


    var loadTasks = function(){
      $scope.TimelineService.get(function(err,data) {
        if(TimelineService.tasks.length < 1){
          addNew();
        }else{
          $scope.dates = TimelineService.tasks;
          $scope.timelineValues = {index: 0};
        }


      })
    }
    loadTasks();

  $scope.$watchCollection('TimelineService.tasks', function(){

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
      // debugger;
      // TimelineService.get(function() { $scope.timelineValues = {index: TimelineService.indexOf(data) }})
      $scope.timelineValues = {index: TimelineService.indexOf(data) + 1 };

      console.log("New Timeline data from main nav", data);
    })
  };

//these are the two buttons inside the timeline that are great
  $scope.editItem = function(){
    $scope.task = TimelineService.tasks[$scope.timelineValues.index-1]
    console.log("TASK", $scope.task)
    // console.log('item to edit', $scope.task);
    var modalInstance = $modal.open({
      templateUrl:'/views/editTaskIndexModal.html',
      controller:'EditTaskIndexModalCtrl',
      resolve:{ //resolve passes the info into the modal
        task:function(){
          return $scope.task;
        }
      }
    })

    modalInstance.result.then(function(updatedTask){
      TimelineService.get(function() {
       $scope.timelineValues = {index: TimelineService.indexOf(updatedTask)}
      })
      // $scope.timelineValues = {index: TimelineService.indexOf(updatedTask) + 1 };

    })
  }

  $scope.deleteItem = function(idx){
    $scope.task = TimelineService.tasks[$scope.timelineValues.index-1]

    console.log('THIS IS THE TASK',$scope.task)
    idx = $scope.timelineValues.index-1

    $http.delete('api/user/'+UserService.currentUser.id+'/tasks/'+$scope.task.id)
        .success(function(data){
        console.log('Deleted success',data);
        console.log("Tasks before", TimelineService.tasks.length)
        TimelineService.remove(idx);
                console.log("Tasks after", TimelineService.tasks.length)

        $scope.timelineValues = {index: 0 };
        // TimelineService.get(function() { $scope.timelineValues = {index: TimelineService.indexOf(idx) }})

      })
      .error(function(err){
        // alert(err);
      });


    // $scope.tasks.splice(idx, 1);
    // $modalInstance.close();
  }

//This is the code to use for the list view
  // $scope.showEdit = function(){
  //   console.log('tl index maybe?',$scope.timelineValues.index-1);
  //   var modalInstance = $modal.open({
  //     templateUrl:'/views/editTaskModal.html',
  //     controller:'EditTaskModalCtrl'
  //   })

  //   // modalInstance.result.then(function (data) {
  //   //   TimelineService.update(data);

  //   //   console.log("New Timeline data from main nav", data);
  //   // })

  // };

}]);