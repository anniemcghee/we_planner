var app = angular.module('WePlanner',['ngRoute','ui.bootstrap','ngTagsInput','pippTimelineDirectives'])

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  // console.log('config');

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl:'/views/home.html',
      controller:'HomeCtrl'
    })
    .when('/dashboard', {
      templateUrl:'/views/dashboard.html',
      controller:'DashboardCtrl'
    })
    // .when('/contact/:id',{
    //   templateUrl:'/views/show.html',
    //   controller:'ShowCtrl'
    // })
    .when('/about',{
      templateUrl:'/views/about.html',
      controller:'StaticCtrl'
    })
    // .when('/faq',{
    //   templateUrl:'/views/faq.html',
    //   controller:'StaticCtrl'
    // })

}]);

//app.run userservice to call check .check
app.run(['UserService',function(UserService){

  UserService.check(function(err,data){
    console.log('check',err,data)
  })

}]);