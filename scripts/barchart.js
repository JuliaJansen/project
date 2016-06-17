/* barchart.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing barchart
 * used as reference: https://bl.ocks.org/mbostock/3887051
 */

function barchart(country, variable) {

	d3.select("#barsvg").remove();
	d3.select(".year").remove();

	// n = amount of layers
	// m = data points per layer (years)
	n = 7;
	m = 10;

	// set margins
	var margin = {top: 70, right: 55, bottom: 20, left: 40},
		width = 500 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;

	data = energy[country];

	console.log("country", country);
	console.log("layers in barchart", data);

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

	// append svg
	var svg = d3.select("#barchart").append("svg")
		.attr("id", "barsvg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// create labels for catagories
	var labels = d3.keys(data[0]).filter(function(key) { return key !== 'year'; });
	
	// prepare data
	data.forEach(function(d) { 
		d.categories = labels.map(function(name) { return {name: name, value: d[name]}; });
	});

	// define domains for x and y
	x0.domain(data.map(function(d) { return d.year; }));
	x1.domain(labels).rangeRoundBands([0, x0.rangeBand()]);
	y.domain([0, d3.max(data, function(d) { return d3.max(d.categories, function(d) { return d.value; }); })]);

	// tooltip
	var tip = d3.tip()
		.attr('class', 'bartip')
		.offset([-21, -151])
		.html(function(d) {
			console.log("in tip?");
	    	return "<span class=\"bartext\"><center>" + country + "</center><span class=\"bartext\">"+ d.name + ": " 
	    	+ roundToTwo(d.value) + " TOE</span></span>";
	  	});

	svg.call(tip);

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
	    	d3.select(this).style("fill", "#e60000");
	    	tip.show(d);
		})
	    .on("mouseout", function(d) {
	    	d3.select(this).style("fill", color(d.name));
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
	    .attr("x", width + 35)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", color);

	// for every variable a label
	legend.append("text")
	    .attr("x", width + 29)
	    .attr("y", 9)
	    .attr("dy", ".35em")
	    .style("text-anchor", "end")
	    .text(function(d) { return d; });

	// // transition for rects
	// rect.transition()
	//     .delay(function(d, i) { return i * 10; })
	//     .attr("y", function(d) { console.log("y0, y1, y(y1 + y0)", d.y0, d.y1, y(d.y1 + d.y0)); return y(d.y1 + d.y0); })
	//     .attr("height", function(d) { return (y(d.y1) - y(d.y1 + d.y0)); });

	// create title 
	svg.append("text")
		.attr("x", 20)
		.attr("y", -20)
		.attr("id", "barchart_title")
		.style("text-anchor", "right")
		.text(function(d) { console.log("title?"); return "Use of Energy per Capita - " + country});

	// // toggle stacked/grouped
	// d3.selectAll("input").on("change", change);

	// var timeout = setTimeout(function() {
	//   d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
	// }, 2000); 

	// function change() {
	// 	console.log("in change");
	//   clearTimeout(timeout);
	//   if (this.value === "grouped") transitionGrouped();
	//   else transitionStacked();
	// }

	// function transitionGrouped() {
	//   y.domain([0, yGroupMax]);

	//   rect.transition()
	//       .duration(500)
	//       .delay(function(d, i) { return i * 10; })
	//       .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
	//       .attr("width", x.rangeBand() / n)
	//     .transition()
	//       .attr("y", function(d) { return y(d.y0); })
	//       .attr("height", function(d) { return height - y(d.y0); });
	// }

	// function transitionStacked() {
	//   y.domain([0, yStackMax]);

	//   rect.transition()
	//       .duration(300)
	//       .delay(function(d, i) { return i * 10; })
	//       .attr("y", function(d) { return y(d.y1); }) //y(d.y1 + d.y0); })
	//       .attr("height", function(d) { return y(d.y0) - y(d.y1); })// y(d.y1) - y(d.y1 + d.y0); })
	//     .transition()
	//       .attr("x", function(d) { return x(d.x); })
	//       .attr("width", x.rangeBand());
	// }

	// // change graph when buttons are clicked
	// d3.select("#energy")
	//     .on("click", function(d,i) {
	//     	changeBarchart(country, "energy")
	//     });
	// d3.select("#emission")
	//     .on("click", function(d,i) {
	//         changeBarchart(country, "emission")
	//     });   
	// d3.select("#random")
	//     .on("click", function(d,i) {
	//         changeBarchart(country, "waste")
	//     });  

}
/* 
 * Updates barchart
 */
function changeBarchart(country, variable) {

	// set margins
	var margin = {top: 70, right: 5, bottom: 15, left: 5},
		width = 480 - margin.left - margin.right,
		height = 300 - margin.top - margin.bottom;

	// get data for barchart
	var layers = getBarchartData(country, variable);

	console.log("layers in change barchart", layers);

	// color scale
	var color = d3.scale.ordinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#99ff33", "#d0743c", "#ff8c00"])
		.domain(d3.keys(layers).filter(function(key) { return key !== "year"; }));

	// calculate y max values
	yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y1; }); }),
	yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y1; }); });

	// x scale and domain
	var x = d3.scale.ordinal()
		.domain([2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014])
	    .rangeRoundBands([0, width], .08);

	// y scale and domain
	var y = d3.scale.linear()
		.domain([0,yStackMax])
	    .range([height, 0]);

    d3.select("rect").transition().duration(300)
    	.attr("x", function(d) { console.log("x, x(x)", d.x, x(d.x)); return x(d.x); })
	    .attr("y", function(d) { console.log("height", height); return height; })
	    .attr("width", function(d) { console.log("rangeband", x.rangeBand()); return x.rangeBand(); })
	    .attr("height", 0);
}

function getBarchartData(country, variable) {
	var layers = [];

	// select the right dataset
	if (variable == "energy") {
		console.log("country", country);
		console.log("variable", variable);

		data = energy[country];

		console.log("energy data", energy);
		console.log("data", data);

		var oil = [];
		var heat = [];
		var gas = [];
		var nucEnergy = [];
		var renEnergy = [];
		var wasteConsumption = [];
		var solidFuels = [];

		// reformat data to layers
		data.forEach(function(d) {
			gas.push({	"x" : d.year, // - 2004, 
						"y0" : d.gas,
						"y1": d.oil + d.heat 
			});
			heat.push({	"x" : d.year, // - 2004, 
						"y0" : d.heat,
						"y1": d.oil 
			});
			nucEnergy.push({	
						"x" : d.year, // - 2004, 
						"y0" : d.nucEnergy,
						"y1": d.oil + d.heat + d.gas 
			});
			oil.push({ 	"x" : d.year, // - 2004, 
						"y0" : d.oil,
						"y1": d.oil
			});			
			renEnergy.push({	
						"x" : d.year, // - 2004, 
						"y0" : d.renEnergy,
						"y1": d.oil + d.heat + d.gas + d.nucEnergy 
			});
			solidFuels.push({	
						"x" : d.year,//  - 2004, 
						"y0" : d.solidFuels,
						"y1": d.oil + d.heat + d.gas + d.nucEnergy + d.renEnergy + d.wasteConsumption
			});
			wasteConsumption.push({	
						"x" : d.year, //- 2004, 
						"y0" : d.wasteConsumption,
						"y1": d.oil + d.heat + d.gas + d.nucEnergy + d.renEnergy 
			});
		});

		layers = [oil, heat, gas, nucEnergy, renEnergy, wasteConsumption, solidFuels];

	// console.log("energy data", energy, data);
	} else if (variable == "waste") {
		data = waste[country];

	} else if (variable == "emission") {
		data = emissions[country];
	}

	return layers;
}