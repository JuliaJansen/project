/* visuals.js
 *
 * Julia Jansen
 * Programmeerproject
 * Loading data and preparing visualisations
 */

window.onload = function() {
	var slider = d3.slider().min(2004).max(2015).showRange(true).value(2008);
	d3.select('#slider').call(slider);
}

function parallelGraph() {

}
