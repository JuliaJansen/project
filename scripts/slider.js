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
            // set global value year to the right value
            year =  d3.format(".0f")(slider.value());

      	// draw parallelGraph and scatterplot
            scatterplot();
      	parallelGraph();
      });
	d3.select('#slider').call(slider);
}
