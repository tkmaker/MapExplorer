 var mainApp = angular.module("mainApp", ['ngRoute']);
 
         mainApp.controller ('mainController',function ($scope,$location) {
             $scope.changeView = function (view) {
            	 $location.path(view);
            	 if (view = 'home') {
                     $scope.showMenu = true;
            	 }
             };
         });
         
         mainApp.config(['$routeProvider', function($routeProvider,$scope) {
            $routeProvider.
            
            when('/world', {
               templateUrl: 'world.htm',
               controller: 'worldController'
            }).
            
            when('/usa', {
               templateUrl: 'usa.htm',
               controller: 'usaController'
            }).
            when('/quiz', {
                templateUrl: 'quiz.htm',
                controller: 'usaQuizController',
               
             }).
             when('/home', {
                 redirectTo: '/',
                 controller: 'homeController'

              }).
            otherwise({
               redirectTo: '/',
               controller: 'homeController'

            });
         }]);
         
         mainApp.controller('homeController', function($scope) {
             $scope.showMenu = true;
          });
         mainApp.controller('worldController', function($scope) {
            $scope.message = "World map here";
         });
         
         mainApp.controller('usaController', function($scope) {
            $scope.message = "USA map here";
         });
         
         
      	
         
         
			