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
    indexOf: function(task) {
      for(var i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id == task.id) {
          return i;
        }
      }
      return 0;
    },
    add: function(task){
      var self= this;

      var users = [];

        if (task.user1 === true && task.user2 === true) {
          users.push(UserService.currentUser.userOne, UserService.currentUser.userTwo);
        } else if (task.user1 === true) {
          users.push(UserService.currentUser.userOne);
        } else {
          users.push(UserService.currentUser.userTwo);
        };

      console.log("adding task", task);
      self.tasks.push({
            "id": task.id,
            "type":task.type,
            "startDate":task.dt,
            "endDate":task.dt,
            "headline":task.what,
            "text":users,
            "tag":task.type
          });
      this.sort();
    },
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
            "text": '',
            // (if (data[i].user1 && data[i].user2 === true) {
            //     "text": UserService.currentUser.userOne+' & '+UserService.currentUser.userTwo
            //   } else if (data[i].user2 === true) {
            //     "text":UserService.currentUser.userTwo
            //   } else {
            //     "text":UserService.currentUser.userOne
            //   }),
            "tag":data[i].type
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