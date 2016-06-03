/* visuals.js
 *
 * Julia Jansen
 * Programmeerproject
 * Loading data and preparing visualisations
 */

function slider() {
	var slider = d3.slider().min(2004).max(2015).showRange(true).value(2008).tickFormat(d3.format("d"));
	d3.select('#slider').call(slider);
}

function parallelGraph(total_energy, total_emissions, municipal_waste) {
	var margin = {top: 30, right: 10, bottom: 10, left: 10},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	var x = d3.scale.ordinal().rangePoints([0, width], 1),
	    y = {},
	    dragging = {};

	var line = d3.svg.line(),
	    axis = d3.svg.axis().orient("left"),
	    background,
	    foreground;

	// append svg for graph
	var svg = d3.select("#graph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// merge data
	energy = total_energy[0];
	console.log("energy = ", energy.values);

	emission = total_emissions[0];
	console.log("emission = ", emission.values);

	waste = municipal_waste;
	console.log("waste = ", waste);



}
