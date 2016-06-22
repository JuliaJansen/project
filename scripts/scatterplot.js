/* scatterplot.js 
 *
 * Julia Jansen
 * programmeerproject
 * Draws a scatterplot
 * used as a reference: http://bl.ocks.org/mbostock/3887118
 */

scattercolor = {
	"Euro area (19 countries)" : "#339966",
	"Belgium" : "#ff751a",
	"Bulgaria" : "#006666",
	"Czech Republic" : "#ffd11a",
	"Denmark" : "#8533ff",
	"Germany" : "#99cc00", 
	"Estonia" : "#999966",
	"Ireland" : "#e60000", 
	"Greece" : "#70dbdb",
	"Spain" : "#3973ac",
	"France" : "#ccff33",
	"Croatia" : "#00e6ac",
	"Italy" : "#ffcc00",
	"Cyprus" : "#ff9933",
	"Latvia" : "#ff6666",
	"Lithuania" : "#9999ff",
	"Luxembourg" : "#66ccff",
	"Hungary" : "#cc6666",
	"Malta" : "#66ffcc",
	"Netherlands" : "#66ff99",
	"Austria" : "#ff80aa",
	"Poland" : "#ccff66",
	"Portugal" : "#ffcc99",
	"Romania" : "#77773c",
	"Slovenia" : "#ff99cc",
	"Slovakia" : "#ff9999",
	"Finland" : "#cc99ff",
	"Sweden" : "#ccccff",
	"United Kingdom" : "#ccffff",
	"Iceland" : "#ccffcc", 
	"Norway" : "#ccff99", 
	"Montenegro" : "#e69900", 
	"Albania" : "#ffcccc", 
	"Serbia" : "#e6e6e6", 
	"Turkey" : "#804000", 
	"Kosovo (under United Nations Security Council Resolution 1244/99)" : "#aec7e8",
	"Moldova" : "#737373", 
	"Ukraine" : "#004d4d"
};

function scatterplot() {
	// select the dataset 
	data = scatterData[year];

	// remove old svg
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
	// var color = d3.scale.category20();

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
		  	.style("fill", function(d) { return scattercolor[d.country]; })
		  	.on("mouseover", function(d) {
		  		tip.show(d);
		  		d3.select(this)
		  			.attr("r", 7.5).transition().duration(50)
		  			.style("stroke", "#000");

				// change title of parallel coordinates graph
		  		d3.select("#parallelgraph_title")
					.text(function() {
							return year + "     " + d.country;
						});

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

		  		// change title parallel coordinates graph
		  		d3.select("#parallelgraph_title").transition().duration(150)
					.text(function() {
						return year
					});

		  		// select coresponding line in parallel coordinates
				var parallellines = d3.select("#graph-svg").select(".foreground").selectAll("path");
				var selectedline = parallellines.filter(function(e) { return e.country === d.country; });

				// change stroke width of line in parallelcoordinates
				selectedline.transition().duration(150)
					.style("stroke-width", "1.3px");
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