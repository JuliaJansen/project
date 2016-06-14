/* scatterplot.js 
 *
 * Julia Jansen
 * programmeerproject
 * Draws a scatterplot
 * used as a reference: http://bl.ocks.org/mbostock/3887118
 */

function scatterplot(year) {

	data = scatterData[year];

	console.log("countries: ", data.length);

	// set margins, width and height
	var margin = {top: 90, right: 35, bottom: 35, left: 35},
	width = 600 - margin.left - margin.right,
	height = 380 - margin.top - margin.bottom;

	var x = d3.scale.linear()
	.range([0, width]);

	var y = d3.scale.linear()
	.range([height, 0]);

	var color = d3.scale.category20();


// 	d3.scale.category20 = function() {
//     return d3.scale.ordinal().range(d3_category20);
// };
// var d3_category20 = [
//   0x1f77b4, 0xaec7e8,
//   0xff7f0e, 0xffbb78,
//   0x2ca02c, 0x98df8a,
//   0xd62728, 0xff9896,
//   0x9467bd, 0xc5b0d5,
//   0x8c564b, 0xc49c94,
//   0xe377c2, 0xf7b6d2,
//   0x7f7f7f, 0xc7c7c7,
//   0xbcbd22, 0xdbdb8d,
//   0x17becf, 0x9edae5,
//   0x003300, 

// ].map(d3_rgbString);



	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("#scatterplot").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(d3.extent(data, function(d) { return d.renEnergy; })).nice();
	y.domain(d3.extent(data, function(d) { return d.emission; })).nice();

	svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
		.append("text")
		  .attr("class", "scatterplotlabel")
		  .attr("x", width)
		  .attr("y", 30)
		  .style("text-anchor", "end")
		  .text("Renewable Energy / capita (tonnes of oil equivalent)");

	svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("class", "scatterplotlabel")
		  .attr("transform", "rotate(-90)")
		  .attr("y", -35)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Emission / capita (tonnes of CO2 equivalent")

	svg.selectAll(".dot")
		  .data(data)
		.enter().append("circle")
		  .attr("class", "dot")
		  .attr("r", 3.5)
		  .attr("cx", function(d) { if (d.renEnergy > 10) { console.log("fucked up", d.country) }; return x(d.renEnergy); })
		  .attr("cy", function(d) { return y(d.emission); })
		  .style("fill", function(d) { return color(d.country); });

// 	var legend = svg.selectAll(".legend")
// 		  .data(color.domain())
// 		.enter().append("g")
// 		  .attr("class", "legend")
// 		  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// 	legend.append("rect")
// 		  .attr("x", width - 18)
// 		  .attr("width", 18)
// 		  .attr("height", 18)
// 		  .style("fill", color);

// 	legend.append("text")
// 		  .attr("x", width - 24)
// 		  .attr("y", 9)
// 		  .attr("dy", ".35em")
// 		  .style("text-anchor", "end")
// 		  .text(function(d) { return d; });
}