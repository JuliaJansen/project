/* parallelgraph.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing parallel coordinates graph
 * used as reference: https://bl.ocks.org/jasondavies/1341281
 */

// calls slider
function slider() {
	// var slider = d3.slider().min(2004).max(2015).showRange(true).value(2008).tickFormat(d3.format("d"));

	var slider = d3.slider().axis(true).min(2004).max(2015).step(5)
	d3.select('#slider').call(slider);
}

// draws parallel graph
function parallelGraph(data, year) {

	// set margins, width and height
	var margin = {top: 70, right: 5, bottom: 15, left: 5},
    	width = 480 - margin.left - margin.right,
    	height = 300 - margin.top - margin.bottom;
    console.log("width", width);
    console.log("height", height);


    // x and y scale and dragging scale prepared
	var x = d3.scale.ordinal().rangePoints([0, width], 1),
	    y = {},
	    dragging = {};

	// lines axis, foreground and background
	var line = d3.svg.line(),
	    axis = d3.svg.axis().orient("left"),
	    background,
	    foreground;

	// make tooltip
	var tooltip = d3.select("#graph")
		.append("div")	
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .text("a simple tooltip")
	    .attr("class", "graphTooltip");

	// make tooltip
	var countrylabel = d3.select("#graph").append("div")	
		.attr("class", "countryLabel")		
		.style("visibility", "hidden");

	// append svg for graph
	var svg = d3.select("#graph").append("svg")
		.attr("class", "svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// create title 
    svg.append("text")
    	.attr("x", 120)
    	.attr("y", -20)
    	.attr("id", "parallelgraph_title")
    	.style("text-anchor", "right")
    	.text(function(d) { return year });

	// get data of specific year
	data = data[year];

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
	  	.attr("d", path)
	  	.on("mouseover", function(d) {
	  		d3.select(this)
	  			.style("stroke-width", "5.0px")
	  			.style("stroke", "#ff9900")
	  			.moveToFront();
			// tooltip.text(d.country);
			// 	return tooltip.style("visibility", "visible");
			d3.select("#parallelgraph_title")
				.text(function() {
					console.log("country", d);
					if (d.country == "Kosovo (under United Nations Security Council Resolution 1244/99)") {
						return "Kosovo";
					} else {
						return year + "     " + d.country;
					}});
	  			})
	  	.on("mouseout", function(d) {
	  			transition(d3.select(this).transition().duration(50)
		  			.style("stroke-width", "1px")
		  			.style("stroke", "#4682b4"));
	  	});

	// add a group element for each dimension
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

	// add an axis 
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

    // return v
	function position(d) {
		var v = dragging[d];
		return v == null ? x(d) : v;
	}

	// transitions of 500 ms
	function transition(g) {
		return g.transition().duration(500);
	}

	// returns the path for a given data point
	function path(d) {
		if (isNaN(d.emissions) || isNaN(d.energy) || isNaN(d.waste)) {
			console.log("d", d);
		} else {
			return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
		}
	}

	// 
	function brushstart() {
  		d3.event.sourceEvent.stopPropagation();
	}

	// handles a brush event, toggling the display of foreground lines.
	function brush() {
	  	var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
	      	extents = actives.map(function(p) { return y[p].brush.extent(); });
	  	foreground.style("display", function(d) {
	    	return actives.every(function(p, i) {
	      		return extents[i][0] <= d[p] && d[p] <= extents[i][1];
	    	}) ? null : "none";
	  	});
	}

	d3.selection.prototype.moveToFront = function() {
		return this.each(function() {
			var line = this.parentNode.appendChild(this);
			line.className = "hover";
		});
	};

};