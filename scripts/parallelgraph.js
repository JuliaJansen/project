/* parallelgraph.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing parallel coordinates graph
 * used as reference: https://bl.ocks.org/jasondavies/1341281
 */

// draws parallel graph
function parallelGraph(data, year) {

	// remove old graph and tooltip if existing
	d3.select(".graphsvg").remove();
	d3.select(".graphTooltip").remove();
	d3.select(".paralleltip").remove();

	// set margins, width and height
	var margin = {top: 70, right: 0, bottom: 15, left: 5},
    	width = 480 - margin.left - margin.right,
    	height = 320 - margin.top - margin.bottom;

    // x and y scale and dragging scale prepared
	var x = d3.scale.ordinal().rangePoints([0, width], 1),
	    y = {},
	    dragging = {};

	// lines axis, foreground and background
	var line = d3.svg.line(),
	    axis = d3.svg.axis().orient("left"),
	    background,
	    foreground;

	// energy tooltip
	var energytip = d3.tip()
		.attr('class', 'paralleltip')
		.offset(function(d) { 
			return [0, y[d.Energy]]; })
		.html(function(d) {
	    	return "<span id=\"paralleltiptext\">Energy: " 
	    	+ roundToTwo(d.Energy) + " T Oil Eq.<br>Emission: "
	    	+ roundToTwo(d.Emissions) + " T CO2 eq.<br>Municipal Waste: "
	    	+ roundToTwo(d.Waste) + " T</span>"
	  	});

	// // emission tooltip
	// var emissiontip = d3.tip()
	// 	.attr('class', 'paralleltip')
	// 	.offset(function(d) {
	// 		return [273, y[d.Emissions]]; 
	// 	})
	// 	.html(function(d) {
	//     	return "<span class=\"paralleltiptext\">Emission: " 
	//     	+ roundToTwo(d.Emissions) + " T CO2<br>";
	//   	});

	// // emission tooltip
	// var wastetip = d3.tip()
	// 	.attr('class', 'paralleltip')
	// 	.offset(function(d) {
	// 		return [395, y[d.Waste]]; 
	// 	})
	// 	.html(function(d) {
	//     	return "<span class=\"paralleltiptext\">Waste: " 
	//     	+ roundToTwo(d.Waste) + " Tonnes<br>";
	//   	});

	// append svg for graph
	var svg = d3.select("#graph").append("svg")
		.attr("id", "graph-svg")
		.attr("class", "graphsvg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(energytip);
	// svg.call(emissiontip);
	// svg.call(wastetip);

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

	// select circles in scatterplot for interactivity			
	var scatterdots = d3.select("#scatterplot-svg").selectAll(".dot");

	// add foreground lines
	foreground = svg.append("g")
		.attr("class", "foreground")
	  .selectAll("path")
	  	.data(data)
	  .enter().append("path")
	  	.attr("id", function(d) { return "line." + d.country })
	  	.attr("d", path)
	  	.on("mouseover", function(d) {
	  		d3.select(this)
	  			.style("stroke-width", "5.0px")
	  			// .moveToFront();
	  		energytip.show(d);
			d3.select("#parallelgraph_title")
				.text(function() {
					if (d.country == "Kosovo (under United Nations Security Council Resolution 1244/99)") {
						return "Kosovo";
					} else {
						return year + "     " + d.country;
					}});
			var circle = scatterdots.filter(function(e) { return e.country === d.country; });
			circle.transition().duration(50)
				.attr("r", 7.5)
				.style("stroke", "#000");
	  	})
	  	.on("mouseout", function(d) {
	  			transition(d3.select(this).transition().duration(100)
		  			.style("stroke-width", "1px")
		  			.style("stroke", "#4682b4"));
	  			d3.select("#parallelgraph_title").transition().duration(150)
					.text(function() {
						if (d.country == "Kosovo (under United Nations Security Council Resolution 1244/99)") {
							return "Kosovo";
						} else {
							return year;
						}
					});
				energytip.hide(d);
				var circle = scatterdots.filter(function(e) { return e.country === d.country; });
				circle.transition().duration(150)
					.attr("r", 4.0)
					.style("stroke", "none");
	  	})
	  	.on("click", function(d) {
	  		// remember country that is clicked
	  		country = d.country;
	  		barchart(d.country, "energy");
			$('.navbar-nav a[href="#country_tab"]').tab('show');	  		
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
   	  .attr("class", "axis-text")
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
		if (isNaN(d.Emissions) || isNaN(d.Energy) || isNaN(d.Waste)) {
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

	// d3.selection.prototype.moveToFront = function() {
	// 	return this.each(function() {
	// 		var line = this.parentNode.appendChild(this);
	// 		line.className = "hover";
	// 	});
	// };

};