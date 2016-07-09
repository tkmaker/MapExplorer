 var mainApp = angular.module("mainApp", ['ngRoute']);
 
         mainApp.controller ('mainController',function ($scope,$location) {
             $scope.changeView = function (view) {
            	 $location.path(view);
             }
         });
         
         mainApp.config(['$routeProvider', function($routeProvider) {
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
                controller: 'usaQuizController'
             }).
            otherwise({
               redirectTo: '/world'
            });
         }]);
         
         mainApp.controller('worldController', function($scope) {
            $scope.message = "World map here";
         });
         
         mainApp.controller('usaController', function($scope) {
            $scope.message = "USA map here";
         });
         
         
         mainApp.controller('usaQuizController', function($scope) {
             $scope.message = "USA quiz here";
          });        	
         
         
			