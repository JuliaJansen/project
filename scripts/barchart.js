/* barchart.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing barchart
 * used as reference: https://bl.ocks.org/mbostock/3887051
 */

// set barchartmargins
var barchartmargin = {top: 70, right: 140, bottom: 20, left: 40},
	width = 620 - barchartmargin.left - barchartmargin.right,
	height = 300 - barchartmargin.top - barchartmargin.bottom;

// x scale and domain
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .08);

var x1 = d3.scale.ordinal();

/* 
 * draws barchart
 */
function barchart(country, variable) {

	// remove old svg's and no data sign
	d3.select("#barsvg").remove();
	d3.select(".year").remove();
	d3.select(".bartip").remove();
	d3.select(".no_data").remove();

	// set color scale for dataset
	if (variable == "energy") {
		var barchartcolor = d3.scale.ordinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#ffcc00", "#99ff33", "#d0743c", "#ff8c00"]);
	} else if (variable == "emission") {
		var barchartcolor = d3.scale.ordinal()
			.range(["#99e600", "#BAA224", "#d0743c", "#ffcc00", "#2eb8b8", "#669999", "#999999"]);
	} else {
		var barchartcolor = d3.scale.ordinal()
			.range(["#99e600", "#BAA224", "#d0743c", "#ffcc00", "#2eb8b8", "#b3cccc", "#e6e6e6"]);
	};

	// get the data
	data = getBarchartData(country, variable);

	if (typeof(data) == "undefined") {
		// show 'no data' text
		var message = d3.select("#barchart").append("g")
		    .attr("heigt", 300)
		    .attr("width", 620)
		  .append("text")
		  	.attr("height", 620)
		  	.attr("class", "no_data")
		    .attr("transform", "translate(30, -50)")
		    .html("NO DATA");
	} else {
		// append svg
		var svg = d3.select("#barchart").append("svg")
			.attr("id", "barsvg")
		    .attr("width", width + barchartmargin.left + barchartmargin.right)
		    .attr("height", height + barchartmargin.top + barchartmargin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + barchartmargin.left + "," + barchartmargin.top + ")");
		
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
		  	.attr("y", -40)
		  	.attr("dy", ".71em")
		  	.style("text-anchor", "end")
		  	.text(function(d) { 
		  		if (variable == "energy") {
		  			return "Energy Use (thousand tonnes of oil equiv.)";
		  		} else if (variable == "waste") {
		  			return "Hazardous waste (thousand tonnes)";
		  		} else if (variable =="emission") {
		  			return "Carbon Emission (tonnes of CO2)";
		  		}});

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
		    .style("fill", function(d) { return barchartcolor(d.name); })
		    .on("mouseover", function(d) {
		    	d3.select(this).style("fill", "#b30000");
		    	tip.show(d);
			})
		    .on("mouseout", function(d) {
		    	d3.select(this).transition().duration(100)
		    		.style("fill", barchartcolor(d.name));
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
		    .style("fill", barchartcolor);

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
				} else if (variable == "waste") {
					return "Generation of hazardous "+ variable + " - " + country;
				} else if (variable == "emission") {
					return "Generation of " + variable + " - " + country;
				}
			});
	}
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
	} else if (variable == "emission") {
		data = emissions[country];
	}

	return data;
}