/* visuals.js
 *
 * Julia Jansen
 * Programmeerproject
 * Loading data and preparing visualisations
 */

function slider() {
	var slider = d3.slider().min(2004).max(2015).showRange(true).value(2008).tickFormat(d3.format("d"));
	d3.select('#slider').call(slider);
}

function parallelGraph(data, year) {
	var margin = {top: 30, right: 5, bottom: 10, left: 5},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

	var x = d3.scale.ordinal().rangePoints([0, width], 1),
	    y = {},
	    dragging = {};

	var line = d3.svg.line(),
	    axis = d3.svg.axis().orient("left"),
	    background,
	    foreground;

	// append svg for graph
	var svg = d3.select("#graph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// get data of specific year
	data = data[year];
	console.log("data = ", data);

	// get dimensions and y domain per dimension
	x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
	 	return d != "country" && (y[d] = d3.scale.linear()
	 		.domain(d3.extent(data, function(p) { return +p[d]; }))
	 		.range([height, 0]));
	}));

	// add background lines
	background = svg.append("g")
		.attr("class", "background")
	  .selectAll("path")
	  	.data(data)
	  .enter().append("path")
	  	.attr("d", path);

	// add foreground lines
	foreground = svg.append("g")
		.attr("class", "foreground")
	  .selectAll("path")
	  	.data(data)
	  .enter().append("path")
	  	.attr("d", path);

	// Add a group element for each dimension.
	var g = svg.selectAll(".dimension")
	    .data(dimensions)
	  .enter().append("g")
	    .attr("class", "dimension")
	    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
	    .call(d3.behavior.drag()
	    	.origin(function(d) { return {x: x(d)}; })
	     	.on("dragstart", function(d) {
	        	dragging[d] = x(d);
	        	background.attr("visibility", "hidden");
	      	})
	      	.on("drag", function(d) {
	       		dragging[d] = Math.min(width, Math.max(0, d3.event.x));
	        	foreground.attr("d", path);
	        	dimensions.sort(function(a, b) { return position(a) - position(b); });
	        	x.domain(dimensions);
	        	g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
	      	})
	      	.on("dragend", function(d) {
	        	delete dragging[d];
	        	transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
	        	transition(foreground).attr("d", path);
	        	background
	        	    .attr("d", path)
	         	  .transition()
	            	.delay(500)
	            	.duration(0)
	            	.attr("visibility", null);
	    }));

	// add an axis and title
    g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; });

	// add and store a brush for each axis
	g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
      })
    .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

	function position(d) {
		var v = dragging[d];
		return v == null ? x(d) : v;
	}

	function transition(g) {
		return g.transition().duration(500);
	}

	// Returns the path for a given data point.
	function path(d) {
		if (isNaN(d.emissions) || isNaN(d.energy) || isNaN(d.waste)) {
			console.log("d", d);
		} else {
			return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
		}
	}

};