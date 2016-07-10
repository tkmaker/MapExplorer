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
         
         mainApp.directive("usaChart", function($window) {
        	  return{
        	    restrict: "EA",
        	    scope: {data: '=?'},
        	    template : '<div id="map"></div>',

        	    link: function(scope, elem, attrs){
        	    	 var window_width  =  angular.element($window).width; //window.width();
                	 var window_height = angular.element($window).height;//window.height() ;


                	     
                	 // Accuracy of pixel closeness for dragging state. 
                	 // Decided how much error margin to allow while dragging states
                	 var pix_accuracy = 20;

                	 //US state count
                	 var state_count = 50;

                	 //Array to store indices of states - used to shuffle and get random states to drag
                	 var states_list = [];

                	 //Used to keep count of states completed
                	 var state_counter = 0;

                	 var score = 0;

                	 var d3 = $window.d3;

                	 var projection = d3.geo.albersUsa()
                	     .scale(1000)
                	     .translate([window_width / 2, window_height / 3]);

                	 var path = d3.geo.path()
                	     .projection(projection);

                	 /*
                	 var projectionState = d3.geo.albersUsa()
                	 .scale(1000)
                	 .translate([window_width / 2, window_height / 3]);

                	 var pathState = d3.geo.path()
                	 .projection(projection);
                	 */
                	 //var rawSvg = elem[0].getElementsByClassName('map');
                	 //var rawSvg = elem.find('svg');
                	 //console.log(rawSvg);
                	 var svgMap = d3.select(elem[0]).select('#map')
                	 		.append('svg')
                	     		.attr("width", "80vw")
                	     		.attr("height","80vh")
                	        .append("g");

                	   
                	 console.log(svgMap);



                	 //console.log(us);
                	 console.log(us_geo);

                	 
                	 
                	 svgMap.selectAll('path')
                	 .data(us_geo.features)
                	 .enter()
                	 .append("path")
                	 .attr("d", path)
                	 .attr("class","land");


                	 var drag = d3.behavior.drag()
                	 .on("drag", dragmove)
                	 .on("dragstart", dragstart)
                	 .on("dragend", dragend);


                	 //Initializ states list with indices
                	 for (var i = 0; i <= state_count ; ++i) {
                	 	states_list.push(i); 	
                	 }


                	 //Shuffle array so that we get random states to drag
                	 shuffle(states_list);

                	 //Get first state
                	 //All subsequent states will be generated after dragend event is done
                	 getState();


                	 //Render a state on the map for the user to drag and drop 
                	 function getState() {
                	 	
                	 	console.log(state_counter);
                	 	console.log(states_list[state_counter]);
                	 	

                	 	
                	 	var state = svgMap.insert("path")
                	 	.datum(us_geo.features[states_list[state_counter]])
                	 	.attr("d", path)
                	 	.attr("class","drag-state")
                	 	.attr("transform", function(d,i){
                	     	  //This selects a location on bottom right of the map 
                	           var cx = Number(-1*path.centroid(d)[0]) + window_width/2;
                	           var cy = Number(-1*path.centroid(d)[1]) + window_height/1.5;
                	           var coord = [cx,cy];

                	 	      return "translate(" + coord + ")" //Starting position of state to drag
                	       })
                	       .call(drag);
                	 	
                	 	/*
                	       state.append("text")         // append text
                	    		// .style("fill", "black")   // fill the text with the colour black
                	     	//.attr("x", 200)           // set x position of left side of text
                	     	//.attr("y", 100)           // set y position of bottom of text
                	     	//.attr("dy", ".35em")           // set offset y position
                	     	//.attr("text-anchor", "middle") // set anchor y justification
                	     	.text(function(d) { return "CA"; });
                	      */
                	       
                	 	
                	 	
                	 }



                	 function dragstart(d) {

                	 	  d.x = Number(-1*path.centroid(d)[0]) + window_width/2; 
                	 	  d.y = Number(-1*path.centroid(d)[1]) + window_height/1.5; 


                	 	}

                	 function dragmove(d) {

                	 	  
                	 	   d.x += d3.event.dx;
                	 	   d.y += d3.event.dy;
                	  

                	 	   d3.select(this).attr("transform", function(d,i){
                	 	    	return "translate(" + [ d.x,d.y ] + ")"
                	 	    });
                	 	     
                	 	 
                	 }


                	 function dragend(d) {
                	     
                	     //snap to position if you are X pixels or closer
                	     // This is a correct answer
                	     if(d.x > -pix_accuracy && d.x < pix_accuracy && d.y > -pix_accuracy && d.y < pix_accuracy ){
                	     	d3.select(this).attr("class","drag-state-correct").attr("transform", function(d,i){
                	         return "translate("+ [0,0] + ")";
                	       });
                	       score += 1;
                	     }
                	     //Incorrect answer
                	     else {
                	     	
                	     	//console.log ("Incorrect!!");
                	     	
                	         d3.select(this).attr("class","drag-state-incorrect").attr("transform", function(d,i){
                	         	return "translate("+ [0,0] + ")";
                	         });
                	       
                	     }
                	     state_counter +=1;
                	     
                	     //Stop gettting a new state if we have exhausted all
                	     if (state_counter <= state_count) {
                	     		getState();
                	     }
                	     else { 
                	     	window.alert("Done!")
                	     }
                	 	document.getElementById('score_text').innerHTML = "Score:"+score;

                	 }
                	 	


                	 function shuffle(array) {
                	 	  var currentIndex = array.length, temporaryValue, randomIndex;

                	 	  // While there remain elements to shuffle...
                	 	  while (0 !== currentIndex) {

                	 	    // Pick a remaining element...
                	 	    randomIndex = Math.floor(Math.random() * currentIndex);
                	 	    currentIndex -= 1;

                	 	    // And swap it with the current element.
                	 	    temporaryValue = array[currentIndex];
                	 	    array[currentIndex] = array[randomIndex];
                	 	    array[randomIndex] = temporaryValue;
                	 	  }

                	 	  return array;
                	 }

                	 
                	 
                 
        	    }
        	    }
        	  });
        	  
         mainApp.controller('usaQuizController', function($scope) {
             $scope.message = "USA quiz here";
          });        	
         
         
			