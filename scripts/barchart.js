/* barchart.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing barchart
 * used as reference: https://bl.ocks.org/mbostock/3887051
 */

// set margins
var margin = {top: 70, right: 140, bottom: 20, left: 40},
	width = 620 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

// color scale
var color = d3.scale.ordinal()
	.range(["#98abc5", "#8a89a6", "#7b6888", "#FFFF00", "#99ff33", "#d0743c", "#ff8c00"]);

// x scale and domain
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .08);

var x1 = d3.scale.ordinal();

// y scale and domain
var y = d3.scale.linear()
    .range([height, 0]);

// define x axis
var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

// define y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

/* 
 * draws barchart
 */
function barchart(country, variable) {

	d3.select("#barsvg").remove();
	d3.select(".year").remove();
	d3.select(".bartip").remove();

	// append svg
	var svg = d3.select("#barchart").append("svg")
		.attr("id", "barsvg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// tooltip
	var tip = d3.tip()
		.attr('class', 'bartip')
		.offset([-21, -151])
		.html(function(d) {
	    	return "<span class=\"bartiptext\"><center>" + d.name 
	    	+ "</center></span><span class=\"bartiptext\" id=\"tipvalue\">" 
	    	+ roundToTwo(d.value) + " TOE</span>";
	  	});

	svg.call(tip);

	// get the data
	data = getBarchartData(country, variable);

	// create labels for catagories
	var labels = d3.keys(data[0]).filter(function(key) { return key !== 'year' && key !== 'categories'; });
	
	// prepare data
	data.forEach(function(d) { 
		d.categories = labels.map(function(name) { return {name: name, value: d[name]}; });
	});

	// define domains for x and y
	x0.domain(data.map(function(d) { return d.year; }));
	x1.domain(labels).rangeRoundBands([0, x0.rangeBand()]);
	y.domain([0, d3.max(data, function(d) { return d3.max(d.categories, function(d) { return d.value; }); })]);

	// append x axis 
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis);

	// append y axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	  .append("text")
	  	.attr("transform", "rotate(-90)")
	  	.attr("y", -38)
	  	.attr("dy", ".71em")
	  	.style("text-anchor", "end")
	  	.text("Energy Use (thousand tonnes of oil equivalent");

	// add a g for each layer
	var year = svg.selectAll(".year")
		.data(data)
		  .enter().append("g")
		.attr("class", "year")
		.attr("transform", function(d, i) { return "translate(" + x0(d.year) + ",0)"; });

	// append rectangle
	year.selectAll("rect")
	    .data(function(d) { return d.categories; })
	  .enter().append("rect")
	  	.attr("width", x1.rangeBand())
	    .attr("x", function(d) { return x1(d.name); })
	    .attr("y", function(d) { return y(d.value); })
	    .attr("height", function(d) { return height - y(d.value); })
	    .style("fill", function(d) { return color(d.name); })
	    .on("mouseover", function(d) {
	    	d3.select(this).style("fill", "#b30000");
	    	tip.show(d);
		})
	    .on("mouseout", function(d) {
	    	d3.select(this).transition().duration(100)
	    		.style("fill", color(d.name));
	    	tip.hide(d);
	    }); 

	// append legend
	var legend = svg.selectAll(".legend")
	    .data(labels.slice().reverse())
	  .enter().append("g")
	    .attr("class", "legend")
	    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	// for every variable a rectangle
	legend.append("rect")
	    .attr("x", width + 5)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", color);

	// for every variable a label
	legend.append("text")
	    .attr("x", width + 26)
	    .attr("y", 9)
	    .attr("dy", ".35em")
	    .style("text-anchor", "begin")
	    .text(function(d) { return d; });

	// create graph title 
	svg.append("text")
		.attr("x", 10)
		.attr("y", -20)
		.attr("id", "barchart_title")
		.style("text-anchor", "right")
		.text(function(d) { if (variable == "energy") { 
				return "Use of energy - " + country;
			} else {
				return "Generation of "+ variable + " - " + country;
			}});
}

/* 
 * updates barchart
 */
function updateBarchart(country, variable) {
	// select the right dataset
	data = getBarchartData(country, variable);
	console.log("variable in update", variable);

	var labels = d3.keys(data[0]).filter(function(key) { return key !== 'year'; });

	console.log("labels", labels);

	// prepare data
	data.forEach(function(d) { 
		d.categories = labels.map(function(name) { return {name: name, value: d[name]}; });
	});

	console.log("country", country);
	console.log("data in update", data);

	// define domains for x and y
	x0.domain(data.map(function(d) { console.log("d.year in update", d.year); return d.year; }));
	x1.domain(labels).rangeRoundBands([0, x0.rangeBand()]);
	y.domain([0, d3.max(data, function(d) { console.log("d.value", d.value); return d3.max(d.categories, function(d) { return d.value; }); })]);

    // Select the section we want to apply our changes to
    var svg = d3.select("#barchart").transition();

    // Make the changes
    svg.selectAll(".year")   // change the bars
        .duration(750)
		.attr("transform", function(d, i) { console.log("x0(d.year), d.year, d.value", x0(d.year), d.year, d.value); return "translate(" + x0(d.year) + ",0)"; });    
	svg.select(".x.axis") // change the x axis
        .duration(750)
        .call(xAxis);
    svg.select(".y.axis") // change the y axis
        .duration(750)
        .call(yAxis);
    svg.select(".legend")
    	.duration(750)
    	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
}

/* 
 * Updates barchart
 */
function getBarchartData(country, variable) {
	data = [];
	// select the right dataset
	if (variable == "energy") {
		data = energy[country];
	} else if (variable == "waste") {
		data = waste[country];
		console.log("waste data", waste[country]);
	} else if (variable == "emission") {
		data = emissions[country];
	}
	return data;
}