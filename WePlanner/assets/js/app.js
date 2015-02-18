var app = angular.module('WePlanner',['ngRoute','ui.bootstrap','ngTagsInput','pippTimelineDirectives'])

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  // console.log('config');

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl:'/views/home.html',
      controller:'HomeCtrl'
    })
    // .when('/contact/new', {
    //   templateUrl:'/views/new.html',
    //   controller:'NewCtrl'
    // })
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

}])