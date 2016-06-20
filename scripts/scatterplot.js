/* scatterplot.js 
 *
 * Julia Jansen
 * programmeerproject
 * Draws a scatterplot
 * used as a reference: http://bl.ocks.org/mbostock/3887118
 */

function scatterplot(year) {

	data = scatterData[year];

	d3.select("#scatterplot-svg").remove();

	// set margins, width and height
	var margin = {top: 95, right: 95, bottom: 35, left: 35},
	width = 500 - margin.left - margin.right,
	height = 380 - margin.top - margin.bottom;

	// define x scale
	var x = d3.scale.linear()
	.range([0, width]);

	// define y scale
	var y = d3.scale.linear()
	.range([height, 0]);

	// remember xMax and Ymax
	var xMax = 2.9;
	var yMax = 29;

	// define color scale
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

	// x axis
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	// y axis 
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	// tooltip
	var tip = d3.tip()
		.attr('class', 'scattertip')
		.offset([-15, -151])
		.html(function(d) {
	    	return "<span class=\"scattertext\"><center>" + d.country + "</center><span class=\"scattertext\" id=\"renenergy-label\">Renewable energy: " 
	    	+ roundToTwo(d.renEnergy) + " TOE</span><span class=\"scattertext\" id=\"emission-label\"><br>Emission: " 
	    	+ roundToTwo(d.emission) + " T CO2</span>";
	  	});

	// append svg for scatterplot
	var svg = d3.select("#scatterplot").append("svg")
		.attr("id", "scatterplot-svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);

	// define x and y domain
	x.domain([0, xMax]);
	y.domain([0, yMax]);

	// add an x axis with label
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

	// add y axis with label
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

	// add a circle for each data point
	svg.selectAll(".dot")
			.data(data)
		.enter().append("circle")
			.attr("class", "dot")
			.attr("id", function(d) { return "circle." + d.country })
			.attr("r", 4.0)
			.attr("cx", function(d) { return x(d.renEnergy); })
		 	.attr("cy", function(d) { return y(d.emission); })
		  	.style("fill", function(d) { return color(d.country); })
		  	.on("mouseover", function(d) {
		  		tip.show(d);
		  		d3.select(this)
		  			.attr("r", 7.5).transition().duration(50)
		  			.style("stroke", "#000");

		  		// select coresponding line in parallel coordinates
				var parallellines = d3.select("#graph-svg").select(".foreground").selectAll("path");
				var selectedline = parallellines.filter(function(e) { return e.country === d.country; });

				// change stroke width of line in parallelcoordinates
				selectedline.transition().duration(50)
					.style("stroke-width", "5.0px");
		  	}) 
		  	.on("mouseout", function(d) {
		  		tip.hide(d);
		  		d3.select(this).transition().duration(150)
		  			.attr("r", 4.0)
		  			.style("stroke", "none");

		  		// select coresponding line in parallel coordinates
				var parallellines = d3.select("#graph-svg").select(".foreground").selectAll("path");
				var selectedline = parallellines.filter(function(e) { return e.country === d.country; });

				// change stroke width of line in parallelcoordinates
				selectedline.transition().duration(150)
					.style("stroke-width", "1.0px");
		  	})
		  	.on("click", function(d) {
	  			// remember country that is clicked
	  			country = d.country;
	  			barchart(d.country, "energy");
				$('.navbar-nav a[href="#country_tab"]').tab('show');	  		
			});

	// create title 
    svg.append("text")
    	.attr("x", -35)
    	.attr("y", -20)
    	.attr("id", "scatterplot_title")
    	.style("text-anchor", "right")
    	.style("color", "#999999")
    	.text(function(d) { return "Renewable Energy & Emission" });
}