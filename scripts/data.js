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
		.defer(d3.csv, '/data/gasdata.csv')
		.defer(d3.csv, '/data/heatdata.csv')
		.defer(d3.csv, '/data/nuclear_energydata.csv')
		.defer(d3.csv, '/data/oildata.csv')
		.defer(d3.csv, '/data/renewable_energydata.csv')
		.defer(d3.csv, '/data/solidfuelsdata.csv')
		.defer(d3.csv, '/data/waste_consumtiondata.csv')
		.defer(d3.csv, '/data/primary_production_energy.csv')
		.await(prepareData);
}

function prepareData(error, paralleldata, energysavings, economicemissions, 
	economicwaste, gasdata, heatdata, nucleardata, oildata, renewabledata, 
	solidfuelsdata, wasteconsumption_data, primproduction) {
	if (error) { alert(error); }

	// prepare data for parallel coordinates
	var parallel_data = {};
	paralleldata.forEach(function(d) {
		var year = +d.TIME;

		// make index for year only if not existing yet
		parallel_data[year] = typeof parallel_data[year] !== "undefined" ? parallel_data[year] : [];

		// push data to array
		if (+d.ENERGY > 0 && +d.EMISSIONS > 0 && +d.WASTE > 0) { // && d.GEO != "Iceland" && d.GEO != "Luxembourg"
			parallel_data[year].push({
				"country" : d.GEO,
				"energy" : +d.ENERGY,
				"emissions" : +d.EMISSIONS,
				"waste" : +d.WASTE
			})
		}
	});

	// nest data for energy savings
	var energy_savings = d3.nest()
		.key(function(d) {  if (d.UNIT == "Thousand TOE (tonnes of oil equivalent)") {
			return "TOE" } else { return d.UNIT } })
		.key(function(d) { return d.TIME })
		.entries(energysavings);

	// prepare gas data for energy bargraph
	var energy = {};
	gasdata.forEach(function(d, i) {
		var country = d.GEO;
		
		// make index for country only if not existing yet
		energy[country] = typeof energy[country] !== "undefined" ? energy[country] : [];

		// push data to array
		energy[country].push({
			"year" : +d.TIME,
			"gas" : +d.GAS,
			"heat" : +heatdata[i].HEAT,
			"oil" : +oildata[i].OIL,
			"nuclEnergy" : +nucleardata[i].NUC_ENERGY,
			"renewEnergy" : +renewabledata[i].REN_ENERGY,
			"solidFuels" : +solidfuelsdata[i].SOLID_FUELS,
			"wasteConsumption" : +wasteconsumption_data[i].WASTE_CONS
		});
	});

	var prim_prod_energy = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(primproduction);

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

	slider(parallel_data, energy);
	parallelGraph(energy, parallel_data, 2005);
	barchart("Netherlands", energy);
}
