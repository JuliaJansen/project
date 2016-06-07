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
		parallel_data[year].push({
				"country" : d.GEO,
				"energy" : +d.ENERGY,
				"emissions" : +d.EMISSIONS,
				"waste" : d.WASTE
			})
	});

	// nest data for energy savings
	var energy_savings = d3.nest()
		.key(function(d) {  if (d.UNIT == "Thousand TOE (tonnes of oil equivalent)") {
			return "TOE" } else { return d.UNIT } })
		.key(function(d) { return d.TIME })
		.entries(energysavings);

	// prepare gas data for energy bargraph
	var gas = {};
	gasdata.forEach(function(d) {
		var country = d.GEO;
		
		// make index for country only if not existing yet
		gas[country] = typeof gas[country] !== "undefined" ? gas[country] : [];

		// push data to array
		gas[country].push({
			"year" : +d.TIME,
			"gas" : +d.GAS
		});
	});

	// prepare heat data for energy bargraph
	var heat = {};
	heatdata.forEach(function(d) {
		var country = d.GEO;

		// make index for country only if not existing yet
		heat[country] = typeof heat[country] !== "undefined" ? heat[country] : [];

		// push data to array
		heat[country].push({
			"year" : +d.TIME,
			"heat" : +d.HEAT
		});
	});

	// prepare data for energy bargraph
	var nuclearenergy = {};
	nucleardata.forEach(function(d) {
		var country = d.GEO;
		
		// make index for country only if not existing yet
		nuclearenergy[country] = typeof nuclearenergy[country] !== "undefined" 
		? nuclearenergy[country] : [];

		// push data to array
		nuclearenergy[country].push({
			"year" : +d.TIME,
			"nuc_energy" : +d.NUC_ENERGY
		});
	});

	// prepare array of oil data objects
	var oil = {};
	oildata.forEach(function(d) {
		var country = d.GEO;
		
		// make index for country only if not existing yet
		oil[country] = typeof oil[country] !== "undefined" ? oil[country] : [];

		// push data to array
		oil[country].push({
			"year" : +d.TIME,
			"oil" : +d.OIL
		});
	});

	// prepare renewable energy data for energy bargraph
	var renewableenergy = {};
	renewabledata.forEach(function(d) {
		var country = d.GEO;
		
		// make index for country only if not existing yet
		renewableenergy[country] = typeof renewableenergy[country] !== "undefined" 
		? renewableenergy[country] : [];
		
		// push data to array
		renewableenergy[country].push({
			"year" : +d.TIME,
			"ren_energy" : +d.REN_ENERGY
		})
	})

	// prepare solid fuels data for energy bargraph
	var solidfuels = {};
	solidfuelsdata.forEach(function(d) {
		var country = d.GEO;

		// make index for country only if not existing yet
		solidfuels[country] = typeof solidfuels[country] !== "undefined" 
		? solidfuels[country] : [];

		// push data to array
		solidfuels[country].push({
			"year" : +d.TIME,
			"solidfuels" : +d.SOLID_FUELS
		})
	})

	// prepare waste consumption data for bargraph
	var wasteconsumption = {};
	wasteconsumption_data.forEach(function(d) {
		var country = d.GEO;

		// make index for country only if not existing yet
		wasteconsumption[country] = typeof wasteconsumption[country] !== "undefined" 
		? wasteconsumption[country] : [];

		// push data to array
		wasteconsumption[country].push({
			"year" : +d.TIME,
			"wasteconsumption" : +d.WASTE_CONS
		})
	})

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

	slider();
	parallelGraph(parallel_data, 2010);
	barchart("Netherlands", gas, heat, oil, renewableenergy, solidfuels, nuclearenergy, wasteconsumption);
}
