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
		console.log("no outliers");
		choosedata = "noOutliers";
		scatterplot();
		parallelGraph();
	});
	$("#outliers").on('click', function(e) {
		console.log("outliers");
		choosedata = "outliers";
		scatterplot();
		parallelGraph();
	});
}
	