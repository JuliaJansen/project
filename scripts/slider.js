/* slider.js
 *
 * Julia Jansen
 * Programmeerproject
 * Drawing slider and calling other functions
 */

// calls slider
function slider(data, energydata) {


	var data = data;
	var energydata = energydata;
	var slider = d3.slider()
      .min(2005)
      .max(2013)
      .showRange(true)
      .value(2005)
      .callback(function() {
            // draw scatterplot
            year = Math.floor(slider.value());
            console.log("slider value", slider.value());
            scatterplot();
            // scatterplot(Math.floor(slider.value()));
      	// draw parallelGraph
      	parallelGraph(data, Math.floor(slider.value()));
      });

	d3.select('#slider').call(slider);

}
