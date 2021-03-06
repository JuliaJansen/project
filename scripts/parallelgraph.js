/* parallelgraph.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing parallel coordinates graph
 * used as reference: https://bl.ocks.org/jasondavies/1341281
 */

// set parallelmargins, width and height
var parallelmargin = {top: 105, right: 20, bottom: 15, left: 20},
	width = 480 - parallelmargin.left - parallelmargin.right,
	height = 310 - parallelmargin.top - parallelmargin.bottom;

// lines axis, foreground and background
var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    background,
    foreground;

// draws parallel graph
function parallelGraph() {
	// select the right dataset
	if (choosedata == "noOutliers") {
		data = parallelDataNoOutliers;
	} else {
		data = parallelData;
	}

	// remove old graph and tooltips if existing
	d3.select(".graphsvg").remove();
	d3.select(".paralleltip").remove();

	// energy tooltip
	var energytip = d3.tip()
		.attr('class', 'paralleltip')
		.style('position', 'absolute')
		.style('z-index', 10)
		.html(function(d) {
	    	return "<span id=\"paralleltiptext\">Energy Production: <span class=\"redtext\">" 
	    	+ roundToTwo(d.EnergyProduction) + "</span> T Oil eq.<br>Energy use: <span class=\"redtext\">" 
	    	+ roundToTwo(d.EnergyUse) + "</span> T Oil eq.<br>Emission: <span class=\"redtext\">"
	    	+ roundToTwo(d.Emissions) + "</span> T CO2 eq.<br>Municipal Waste: <span class=\"redtext\">"
	    	+ roundToTwo(d.Waste) + "</span> T</span>"
	  	});

	// append svg for graph
	var svg = d3.select("#graph").append("svg")
		.attr("id", "graph-svg")
		.attr("class", "graphsvg")
		.attr("width", width + parallelmargin.left + parallelmargin.right)
		.attr("height", height + parallelmargin.top + parallelmargin.bottom)
	  .append("g")
	  	.attr("transform", "translate(" + parallelmargin.left + "," + parallelmargin.top + ")");

	svg.call(energytip);

	// create title 
    svg.append("text")
    	.attr("x", 90)
    	.attr("y", -50)
    	.attr("id", "parallelgraph_title")
    	.style("text-anchor", "right")
    	.text(function(d) { return year });

    // create sign communicating outlier yes or no
    svg.append("text")
    	.attr("x", 320)
    	.attr("y", -68)
    	.attr("id", "outliersign")
    	.style("text-anchor", "right")
    	.text(function(d) { 
    		if (choosedata == "noOutliers") {
    			return "Iceland not shown";
    		} else {
    			return "All countries visible";
    		}
    	});

	// get data of specific year
	data = data[year];

	// x and y scale and dragging scale prepared
	var x = d3.scale.ordinal().rangePoints([0, width], 1),
	    y = {},
	    dragging = {};

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
	  	.style("stroke-width", "1.3px")
	  	.on("mouseover", function(d) {
	  		d3.select(this)
	  			.style("stroke-width", "5.0px");

	  		// show tooltip
	  		energytip.show(d);
			d3.select("#parallelgraph_title")
				.text(function() {
					if (d.country == "Kosovo (under United Nations Security Council Resolution 1244/99)") {
						return "Kosovo";
					} else {
						return year + "     " + d.country;
					}});

			// highlight circle in scatteplot
			var circle = scatterdots.filter(function(e) { return e.country === d.country; });
			circle.transition().duration(50)
				.attr("r", 7.5)
				.style("stroke", "#000");
	  	})
	  	.on("mouseout", function(d) {
	  			d3.select(this).transition().duration(100)
		  			.style("stroke-width", "1.3px");

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

	  		// navigate to tab with barchart
	  		$( "html, body").animate({scrollTop: $("#country_tab").offset().top }, 500);
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
	      .attr("dy", -2)
	      .text(function(d) { return parallelAxisText(d); })
	      .call(wrap, 85);

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
		if (isNaN(d.EnergyProduction) || isNaN(d.Emissions) || isNaN(d.EnergyUse) || isNaN(d.Waste)) {
		} else {
			return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
		}
	}

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

	// wraps title text 
	// reference: http://bl.ocks.org/mbostock/7555321
	function wrap(text, width) {
	    text.each(function() {
	    	var text = d3.select(this),
		        words = text.text().split(/\s+/).reverse(),
		        word,
		        line = [],
		        lineNumber = 0,
		        lineHeight = 1.1, // ems
		        y = text.attr("y"),
		        dy = parseFloat(text.attr("dy")),
		        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
	    	while (word = words.pop()) {
			    line.push(word);
			    tspan.text(line.join(" "));
			    if (tspan.node().getComputedTextLength() > width) {
			        line.pop();
			        tspan.text(line.join(" "));
			        line = [word];
			        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		      	}
	    	}
		});
	}
};

function parallelAxisText(d) {
	if (d == "EnergyUse") {
	    return "Energy Use  Tonnes of Oil equiv.";
  	} else if (d == "EnergyProduction") {
  		return "Energy Production  Tonnes of Oil equiv."; //<br>Tonnes of Oil equiv
  	} else if (d == "Emissions") {
  		return "Carbon Emission Tonnes CO2 equivalent"; 
  	} else if (d == "Waste") {
  		return "Municipal Waste  Tonnes";
  	}
};
