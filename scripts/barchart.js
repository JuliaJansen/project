/* barchart.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing barchart
 * used as reference: http://bl.ocks.org/mbostock/3943967
 */


/* 
 * draws a barchart for one country
 */
function barchart(country, data) {

	d3.select("#barsvg").remove();

	// get data for country
	data = data[country];

	console.log("data =", data);

	// console.log("domain of", d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

	// color scale
	var color = d3.scale.ordinal()
    	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#99ff33", "#d0743c", "#ff8c00"])
		.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

	var oil = [];
	var heat = [];
	var gas = [];
	var nucEnergy = [];
	var renEnergy = [];
	var wasteConsumption = [];
	var solidFuels = [];

	// n = amount of layers
	// m = data points per layer
	n = 7;
	m = 10;

	// reformat data to layers
	data.forEach(function(d) {
		oil.push({ 	"x" : d.year, // - 2004, 
					"y0" : d.oil,
					"y1": d.oil
		});
		heat.push({	"x" : d.year, // - 2004, 
					"y0" : d.heat,
					"y1": d.oil 
		});
		gas.push({	"x" : d.year, // - 2004, 
					"y0" : d.gas,
					"y1": d.oil + d.heat 
		});
		nucEnergy.push({	
					"x" : d.year, // - 2004, 
					"y0" : d.nucEnergy,
					"y1": d.oil + d.heat + d.gas 
		});
		renEnergy.push({	
					"x" : d.year, // - 2004, 
					"y0" : d.renEnergy,
					"y1": d.oil + d.heat + d.gas + d.nucEnergy 
		});
		wasteConsumption.push({	
					"x" : d.year, //- 2004, 
					"y0" : d.wasteConsumption,
					"y1": d.oil + d.heat + d.gas + d.nucEnergy + d.renEnergy 
		});
		solidFuels.push({	
					"x" : d.year,//  - 2004, 
					"y0" : d.solidFuels,
					"y1": d.oil + d.heat + d.gas + d.nucEnergy + d.renEnergy + d.wasteConsumption
		});
	});

	var layers = [oil, heat, gas, nucEnergy, renEnergy, wasteConsumption, solidFuels];
	console.log("layers", layers);

	yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y1; }); }),
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y1; }); });

	// set margins
	var margin = {top: 70, right: 5, bottom: 15, left: 5},
    	width = 480 - margin.left - margin.right,
    	height = 300 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
		.domain([2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014])
	    .rangeRoundBands([0, width], .08);

	var y = d3.scale.linear()
	    .domain([0, yStackMax])
	    .range([height, 0]);

    // define x axis
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickSize(0)
	    .tickPadding(6)
	    .orient("bottom");

	// append svg
	var svg = d3.select("#barchart").append("svg")
		.attr("id", "barsvg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// add a g for each layer
	var layer = svg.selectAll(".layer")
    	.data(layers)
  	  .enter().append("g")
    	.attr("class", "layer")
    	.style("fill", function(d, i) { return color(i); });

    // append rectangle
	var rect = layer.selectAll("rect")
	    .data(function(d) { return d; })
	  .enter().append("rect")
	    .attr("x", function(d) { return x(d.x); })
	    .attr("y", height)
	    .attr("width", x.rangeBand())
	    .attr("height", 0);

	// transition for rects
	rect.transition()
	    .delay(function(d, i) { return i * 10; })
	    .attr("y", function(d) { return y(d.y1 + d.y0); })
	    .attr("height", function(d) { return (y(d.y1) - y(d.y1 + d.y0)); });

	// append an axis 
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	// create title 
    svg.append("text")
    	.attr("x", 120)
    	.attr("y", -20)
    	.attr("id", "barchart_title")
    	.style("text-anchor", "right")
    	.text(function(d) { return "Use of Energy per Capita" });

    var legend = svg.selectAll(".legend")
        .data(color.domain().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { console.log("d = ", d); return "translate(0," + i * 20 + ")"; });

	legend.append("rect")
	    .attr("x", width - 18)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", color);

	legend.append("text")
	    .attr("x", width - 24)
	    .attr("y", 9)
	    .attr("dy", ".35em")
	    .style("text-anchor", "end")
	    .text(function(d) { return d; });


	d3.selectAll("input").on("change", change);

	var timeout = setTimeout(function() {
	  d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
	}, 2000);

	function change() {
	  clearTimeout(timeout);
	  if (this.value === "grouped") transitionGrouped();
	  else transitionStacked();
	}

	function transitionGrouped() {
	  y.domain([0, yGroupMax]);

	  rect.transition()
	      .duration(500)
	      .delay(function(d, i) { return i * 10; })
	      .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
	      .attr("width", x.rangeBand() / n)
	    .transition()
	      .attr("y", function(d) { return y(d.y); })
	      .attr("height", function(d) { return height - y(d.y0); });
	}

	function transitionStacked() {
	  y.domain([0, yStackMax]);

	  rect.transition()
	      .duration(300)
	      .delay(function(d, i) { return i * 10; })
	      .attr("y", function(d) { return y(d.y1 + d.y0); })
	      .attr("height", function(d) { return y(d.y1) - y(d.y1 + d.y0); })
	    .transition()
	      .attr("x", function(d) { return x(d.x); })
	      .attr("width", x.rangeBand());
	}
}