

mainApp.controller('usaController', function($scope) {
    
    
	
 var window_width  = $(window).width();
 var window_height = $(window).height() ;
 

 //console.log(usaJson);
 
 var stateTooltip = d3.select("body").append("div").attr("class", "countryTooltip");


 var projection = d3.geo.albersUsa()
  .scale(window_width/window_height*600)
  .translate([window_width / 2, window_height / 2.3	]);
    
var path = d3.geo.path()
    .projection(projection);




var svgMap = d3.select(document.querySelector('#map')) 
    .append("svg")
    	.attr("width", "100vw")
    	.attr("height","100vh")
		.attr("align","center");



var g = svgMap .append("g");


var states  = usaJson.features
var color;

//Add the land now
g.selectAll("path.land")
.data(usaJson.features)
.enter()
.append("path")
.attr("d", path)
.attr("class","land")
.on("mouseover", function(d) {
    stateTooltip.text(d.properties.NAME)
    .style("left", (d3.event.pageX + 7) + "px")
    .style("top", (d3.event.pageY - 15) + "px")
    .style("display", "block")
    .style("opacity", 1);
  })
  .on("mouseout", function(d) {
    stateTooltip.style("opacity", 0)
    .style("display", "none");
  })
  .on("mousemove", function(d) {
    stateTooltip.style("left", (d3.event.pageX + 7) + "px")
    .style("top", (d3.event.pageY - 15) + "px");
  });


});