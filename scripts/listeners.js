/* listeners.js
 *
 * Julia Jansen
 * Programmeerproject
 * Listeners defined
 */

function listeners() {
	// listen to buttons underneath barchart
	$("#energy").on('click', function(e) {
		barchart(country, "energy");
	});
	$("#emission").on('click', function(e) {
		barchart(country, "emission");
	});
	$("#waste").on('click', function(e) {
		barchart(country, "waste");
	});

	// listen to buttons under parallel coordinates graph
	$("#noOutliers").on('click', function(e) {
		choosedata = "noOutliers";
		scatterplot();
		parallelGraph();
	});
	$("#outliers").on('click', function(e) {
		choosedata = "outliers";
		scatterplot();
		parallelGraph();
	});

	// show interactive line
	$( "#line" ).on('mouseover', function() {
		// select coresponding line in parallel coordinates
		var parallellines = d3.select("#graph-svg").select(".foreground").selectAll("path");
		var selectedline = parallellines.filter("Netherlands");

		// change stroke width of line in parallelcoordinates
		selectedline.transition().duration(50)
			.style("stroke-width", "5.0px");
	});

	// show interactive line
	$( "#line" ).on('mouseout', function() {
		// select coresponding line in parallel coordinates
		var parallellines = d3.select("#graph-svg").select(".foreground").selectAll("path");
		var selectedline = parallellines.filter("Netherlands");

		// change stroke width of line in parallelcoordinates
		selectedline.transition().duration(50)
			.style("stroke-width", "1.3px");
	});
}
	