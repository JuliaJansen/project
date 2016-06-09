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

	// get data for country
	data = data[country];

	console.log("data =", data);

	// console.log("domain of", d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

	// color scale
	var color = d3.scale.ordinal()
    	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

	var oil = [];
	var heat = [];
	var gas = [];
	var nucEnergy = [];
	var renEnergy = [];
	var wasteConsumption = [];
	var solidFuels = [];

	data.forEach(function(d) {
		oil.push({ 	"x" : d.year - 2004, 
					"y0" : d.oil,
					"y1": d.oil
		});
		heat.push({	"x" : d.year - 2004, 
					"y0" : d.heat,
					"y1": d.oil 
		});
		gas.push({	"x" : d.year - 2004, 
					"y0" : d.gas,
					"y1": d.oil + d.heat 
		});
		nucEnergy.push({	"x" : d.year - 2004, 
					"x" : d.year - 2004,
					"y0" : d.nucEnergy,
					"y1": d.oil + d.heat + d.gas 
		});
		renEnergy.push({	"x" : d.year - 2004, 
					"x" : d.year - 2004,
					"y0" : d.renEnergy,
					"y1": d.oil + d.heat + d.gas + d.nucEnergy 
		});
		wasteConsumption.push({	"x" : d.year - 2004, 
					"x" : d.year - 2004,
					"y0" : d.wasteConsumption,
					"y1": d.oil + d.heat + d.gas + d.nucEnergy + d.renEnergy 
		});
		solidFuels.push({	"x" : d.year - 2004, 
					"x" : d.year - 2004,
					"y0" : d.solidFuels,
					"y1": d.oil + d.heat + d.gas + d.nucEnergy + d.renEnergy + d.wasteConsumption
		});
	});

	var layers = [oil, heat, gas, nucEnergy, renEnergy, wasteConsumption, solidFuels];
	console.log("layers", layers);

	layers.forEach(function(d) {
		var y0 = 0;	
		d.values = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
		d.total = d.values[d.values.length - 1].y1;
	});

	yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y1; }); }),
    yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y1; }); });
	console.log("groupmax", yGroupMax);
	console.log("stackmax", yStackMax);

	var x = d3.scale.ordinal()
	    .domain(d3.range(10))
	    .rangeRoundBands([0, width], .08);

	var y = d3.scale.linear()
	    .domain(d3.extent(data, function(d) { return d.values }))
	    .range([height, 0]);

	x.domain(data.map(function(d) { return d.year; }));
	y.domain([0, d3.max(data, function(d) { return d.total; })]);

	// set margins
	var margin = {top: 70, right: 5, bottom: 15, left: 5},
    	width = 700 - margin.left - margin.right,
    	height = 450 - margin.top - margin.bottom;

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
	      .attr("x", function(d, i, j) { console.log("d.x", d.x, x.rangeBand()); return x(d.x) + x.rangeBand() / n * j; })
	      .attr("width", x.rangeBand() / n)
	    .transition()
	      .attr("y", function(d) { return y(d.y); })
	      .attr("height", function(d) { console.log("y, dy", d.y, y(d.y)); return height - y(d.y); });
	}

	function transitionStacked() {
	  y.domain([0, yStackMax]);

	  rect.transition()
	      .duration(300)
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