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
function barchart(country, gas, heat, oil, renewableenergy, 
	solidfuels, nuclearenergy, wasteconsumption) {

	// get data for country
	data = [gas[country], heat[country], oil[country], renewableenergy[country], 
	solidfuels[country], nuclearenergy[country], wasteconsumption[country]];

	console.log("data =", data);

	var n = 7, // number of layers
	    m = 10, // number of samples per layer
	    stack = d3.layout.stack(),
	    layers = stack(d3.range(n).map(function() { bump = bumpLayer(m, .1); return bump })),
	    yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
	    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

	// console.log("stack, layers", stack, layers);

	// set margins
	var margin = {top: 70, right: 5, bottom: 15, left: 5},
    	width = 700 - margin.left - margin.right,
    	height = 450 - margin.top - margin.bottom;

    // scale x axis
	var x = d3.scale.ordinal()
	    .domain(d3.range(m))
	    .rangeRoundBands([0, width], .08);

	// scale y axis
	var y = d3.scale.linear()
	    .domain([0, yStackMax])
	    .range([height, 0]);

	// color scale
	var color = d3.scale.linear()
    .domain([0, n - 1])
    .range(["#aad", "#556"]);

    // define x axis
	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickSize(0)
	    .tickPadding(6)
	    .orient("bottom");

	// append svg
	var svg = d3.select("#barchart").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// 
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
	    .attr("y", function(d) { return y(d.y0 + d.y); })
	    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

	// append an axis 
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

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
	      .attr("height", function(d) { return height - y(d.y); });
	}

	function transitionStacked() {
	  y.domain([0, yStackMax]);

	  rect.transition()
	      .duration(500)
	      .delay(function(d, i) { return i * 10; })
	      .attr("y", function(d) { return y(d.y0 + d.y); })
	      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
	    .transition()
	      .attr("x", function(d) { return x(d.x); })
	      .attr("width", x.rangeBand());
	}

	// Inspired by Lee Byron's test data generator.
	function bumpLayer(n, o) {

	  function bump(a) {
	    var x = 1 / (.1 + Math.random()),
	        y = 2 * Math.random() - .5,
	        z = 10 / (.1 + Math.random());
	    for (var i = 0; i < n; i++) {
	      var w = (i / n - y) * z;
	      a[i] += x * Math.exp(-w * w);
	    }
	  }

	  var a = [], i;
	  for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
	  for (i = 0; i < 5; ++i) bump(a);
	  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
	}
}