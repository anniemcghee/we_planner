app.factory('TimelineService', ['UserService', '$http', function(UserService, $http){
  console.log('Timeline loaded')

  // var tasks = [];

  return {
    clear: function(){
      tasks=[];
    },
    add: function(task){
      var self= this;

      console.log("adding task", task);
      self.tasks.push({
            "startDate":task.dt,
            "endDate":task.dt,
            "headline":task.what,
            "text":"Person",
            "tag":task.tags
          });
    },
    remove: function(idx){
      tasks.splice(idx, 1);
    },
    get: function(callback){
      var self = this;
      $http.get('/api/user/'+ UserService.currentUser.id +'/tasks')
      .success(function(data){

        self.tasks = [];

        for (i = 0; i < data.length; i++) {
          self.tasks.push({
            "startDate":data[i].dt,
            "endDate":data[i].dt,
            "headline":data[i].what,
            "text":"Person",
            "tag":data[i].tags
          })

        }
          // console.log("self", self.tasks);

        callback(null,self.tasks);
      }).error(function(data){
        callback(err);
      })

    }
  };

}])