app.factory('UserService',['$http',function($http){

//this factory is all about checking for a current user and triggering a session
  var currentUser = false;

  return {
    login: function(email,password,callback){
      // alert('user service working')
      var self = this;
      var loginData={email:email,password:password}
      $http.post('/api/auth', loginData)
      .success(function(data){
        if(data && data.user){
          self.currentUser=data.user
        } else {
          self.currentUser=false;
        }
        callback(null,data);
      }).error(function(err){
        callback(err);
      })
    },
    logout: function(callback){
      var self = this;
      $http.delete('/api/auth')
      .success(function(data){
        self.currentUser = false;
        callback(null,data);
      }).error(function(data){
        callback(err);
      })
    },
    check: function(callback){
      var self = this;
      $http.get('/api/auth')
      .success(function(data){
        if(data && data.user){
          self.currentUser=data.user
        } else {
          self.currentUser=false;
        }
        callback(null,data);
      }).error(function(err){
        callback(err)
      })
    }
  }

}])