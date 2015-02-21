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
            "type":task.type,
            "startDate":task.dt,
            "endDate":task.dt,
            "headline":task.what,
            "text":[task.user1, task.user2],
            "tag":task.tags[0].text
          });
    },
    // put: function(idx){
    //   var self = this;
    //   $http.put('/api/user/'+ UserService.currentUser.id +'/tasks/')

    //   //maybe needs a callback
    // },
    remove: function(idx){
      var self= this;

      self.tasks.splice(idx, 1);
    },
    get: function(callback){
      var self = this;
      $http.get('/api/user/'+ UserService.currentUser.id +'/tasks')
      .success(function(data){

        self.tasks = [];

        for (i = 0; i < data.length; i++) {
          self.tasks.push({
            "type":data[i].type,
            "startDate":data[i].dt,
            "endDate":data[i].dt,
            "headline":data[i].what,
            // "text":[task.user1, task.user2],
            "tag":data[i].tags[0].text
          })

        }
          console.log("self", self.tasks);

        callback(null,self.tasks);
      }).error(function(data){
        callback(err);
      })

    }
  };

}])