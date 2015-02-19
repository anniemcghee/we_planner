app.factory('TimelineService', ['UserService', '$http', function(UserService, $http){
  console.log('Timeline loaded')

  var tasks = [];

  $http.get('/api/user/'+ UserService.currentUser.id+'/tasks')
  .success(function(data){
    tasks = data;
  return {
    clear: function(){
      tasks=[];
    },
    add: function(task){
      tasks.push(task);
    },
    remove: function(idx){
      tasks.splice(idx, 1);
    },
    get: function(){
      return alerts;
    }
  };
  })


}])