app.factory('TimelineService', ['UserService', '$http', function(UserService, $http){
  console.log('Timeline loaded')

  // var tasks = [];

  return {
    clear: function(){
      tasks=[];
    },
    sort: function() {
      this.tasks = this.tasks.sort(function(a, b) {
        var x = new Date(a["startDate"]); var y = new Date(b["startDate"]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
      return this.tasks;
    },
    add: function(task){
      var self= this;

      console.log("adding task", task);
      self.tasks.push({
            "id": task.id,
            "type":task.type,
            "startDate":task.dt,
            "endDate":task.dt,
            "headline":task.what,
            "text":[task.user1, task.user2],
            "tag":task.tags[0].text
          });
      this.sort();
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
            "id": data[i].id,
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