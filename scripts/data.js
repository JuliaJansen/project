/* project.js
 *
 * Julia Jansen
 * Programmeerproject
 * Loading data and preparing visualisations
 */

window.onload = function() {

	// load two datasets asynchronously
	d3_queue.queue()
		.defer(d3.csv, '/data/parallelgraph_capita.csv')
		.defer(d3.csv, '/data/energysavings.csv')
		.defer(d3.csv, '/data/emissions_what_industries.csv')
		.defer(d3.csv, '/data/waste_sector.csv')
		.defer(d3.csv, '/data/gas.csv')
		.defer(d3.csv, '/data/heat.csv')
		.defer(d3.csv, '/data/nuclear_energy.csv')
		.defer(d3.csv, '/data/oil.csv')
		.defer(d3.csv, '/data/renewable_energy.csv')
		.defer(d3.csv, '/data/solid_fuels.csv')
		.defer(d3.csv, '/data/waste_consumption.csv')
		.defer(d3.csv, '/data/primary_production_energy.csv')
		.await(prepareData);
}

function prepareData(error, paralleldata, energysavings, economicemissions, economicwaste, gasdata, heatdata, nucleardata, 
	oildata, renewabledata, solidfuelsdata, wasteconsumption_data, primproduction) {
	if (error) { alert(error); }

	// prepare data for parallel coordinates
	var parallel_data = {};

	// 
	paralleldata.forEach(function(d) {
		var year = +d.TIME;
		var data_country = d.GEO;
		var total_energy = +d.ENERGY;
		var total_emissions = +d.EMISSIONS;
		var total_waste = +d.WASTE;

		parallel_data[year] = typeof parallel_data[year] !== "undefined" ? parallel_data[year] : [];

		parallel_data[year].push({
				"country" : data_country,
				"energy" : total_energy,
				"emissions" : total_emissions,
				"waste" : total_waste
			})
	})

	var energy_savings = d3.nest()
		.key(function(d) {  if (d.UNIT == "Thousand TOE (tonnes of oil equivalent)") {
			return "TOE" } else { return d.UNIT } })
		.key(function(d) { return d.TIME })
		.entries(energysavings);

	// nest data for energy bargraph
	var gas = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(gasdata);

	// console.log("energy from gas:", gas);

	// nest data for energy bargraph
	var heat = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(heatdata);

	// console.log("energy from heat:", heat);

	// nest data for energy bargraph
	var nuclear = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(nucleardata);

	// console.log("nuclear energy:", nuclear);

	// nest data for energy bargraph
	var oil = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(oildata);

	// console.log("energy from oil:", oil);

	// nest data for energy bargraph
	var renewable_energy = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(renewabledata);

	// console.log("renewable energy:", renewable_energy);

	// nest data for energy bargraph
	var solid_fuels = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(solidfuelsdata);

	// console.log("solid fuels:", solid_fuels);

	// nest data for energy bargraph
	var waste_consumption = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(wasteconsumption_data);

	// console.log("wasteconsumtion for energy", waste_consumption);

	var prim_prod_energy = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(primproduction);

	// console.log("primary energy production:", prim_prod_energy);

	// nest data for emission bargraph
	// nested by industry
	var economic_emissions = d3.nest() 
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.NACE_R2 })
		.entries(economicemissions);

	// console.log("emission per economic activity: ", economic_emissions);

	// nested by sort of pollution
	var pol_emissions = d3.nest() 
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.AIRPOL })
		.entries(economicemissions);

	// console.log("emission per pollution: ", pol_emissions);

	// nest data for waste bargraph
	var economic_waste = d3.nest()
		.key(function(d) { return d.Country })
		.key(function(d) { return d.Year })
		.entries(economicwaste);

	// console.log("waste specified by economic activity: ", economic_waste);

	slider();
	parallelGraph(parallel_data, 2006);

}
