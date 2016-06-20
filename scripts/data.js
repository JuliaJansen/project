/* data.js
 *
 * Julia Jansen
 * Programmeerproject
 * Loading data and preparing visualisations
 */

// global variables to hold data
var parallelData = {};
var waste = {};
var emissions = {};
var energy = {};
var scatterData = {};
var country = "Netherlands";

window.onload = function() {

	// load two datasets asynchronously
	d3_queue.queue()
		.defer(d3.csv, '/data/parallelgraph_capita.csv')
		.defer(d3.csv, '/data/energysavings.csv')
		.defer(d3.csv, '/data/emission_industries_data.csv')
		.defer(d3.csv, '/data/waste_sector_data.csv')
		.defer(d3.csv, '/data/gasdata.csv')
		.defer(d3.csv, '/data/heatdata.csv')
		.defer(d3.csv, '/data/nuclear_energydata.csv')
		.defer(d3.csv, '/data/oildata.csv')
		.defer(d3.csv, '/data/renewable_energydata.csv')
		.defer(d3.csv, '/data/solidfuelsdata.csv')
		.defer(d3.csv, '/data/waste_consumtiondata.csv')
		.defer(d3.csv, '/data/primary_production_energy.csv')
		.defer(d3.csv, '/data/renenergy_emission.csv') 
		.await(prepareData);
}

function prepareData(error, paralleldata, energysavings, economicemissions, 
	economicwaste, gasdata, heatdata, nucleardata, oildata, renewabledata, 
	solidfuelsdata, wasteconsumption_data, primproduction, renenergy_emission) {
	if (error) { alert(error); }

	// prepare data for parallel coordinates
	paralleldata.forEach(function(d) {
		var year = +d.TIME;

		// make index for year only if not existing yet
		parallelData[year] = typeof parallelData[year] !== "undefined" ? parallelData[year] : [];

		// push data to array
		if (+d.ENERGY > 0 && +d.EMISSIONS > 0 && +d.WASTE > 0) { // && d.GEO != "Iceland" && d.GEO != "Luxembourg") {
			parallelData[year].push({
				"country" : d.GEO,
				"Energy" : +d.ENERGY,
				"Emissions" : +d.EMISSIONS,
				"Waste" : +d.WASTE
			})
		}
	});

	// prepare energy use data for energy bargraph
	gasdata.forEach(function(d, i) {
		var country = d.GEO;
		
		// make index for country only if not existing yet
		energy[country] = typeof energy[country] !== "undefined" ? energy[country] : [];

		// push data to array
		energy[country].push({
			"year" : +d.TIME,
			"Gas" : +d.GAS,
			"Heat" : +heatdata[i].HEAT,
			"Oil" : +oildata[i].OIL,
			"Nuclear Energy" : +nucleardata[i].NUC_ENERGY,
			"Renewable Energy" : +renewabledata[i].REN_ENERGY,
			"Solid Fuels" : +solidfuelsdata[i].SOLID_FUELS,
			"Waste Consumption" : +wasteconsumption_data[i].WASTE_CONS
		});
	});


	// prepare emissions data for bargraph
	economicemissions.forEach(function(d, i) {
		var country = d.GEO;

		// make index for country only if not existing yet
		emissions[country] = typeof emissions[country] !== "undefined" ? emissions[country] : [];

		// push data to array
		emissions[country].push({
			"year" : +d.TIME,
			"Agriculture" : +d.Agriculture,
			"Mining" : +d.Mining, 
			"Manufacturing" : +d.Manufacturing, 
			"Electricity_Gas_Steam" : +d.Electricity_Gas_Steam, 
			"Water_management" : +d.Water_management, 
			"Transportation_Storage" : +d.Transportation_Storage, 
			"Accomodation_Food" : +d.Accomodation_Food
			// "Information_Communication" : +d.Information_Communication, 
			// "Financial_Insurance" : +d.Financial_Insurance, 
			// "RealEstate" : +d.RealEstate, 
			// "Professional_Scientific_Technical" : +d.Professional_Scientific_Technical, 
			// "Administration_Defence_SocialSecurity" : +d.Administration_Defence_SocialSecurity, 
			// "Education" : +d.Education, 
			// "Health_SocialWork" : +d.Health_SocialWork, 
			// "Arts_Entertainment" : +d.Arts_Entertainment, 
			// "OtherService" : +d.OtherService, 
			// "Households_Employers" : +d.Households_Employers,
		 // 	"Extraterritorial_Org" : +d.Extraterritorial_Org
		});
	}); 

	// prepare waste data for bargraph
	economicwaste.forEach(function(d, i) {
		var country = d.GEO;

		// make index for country only if not existing yet
		waste[country] = typeof waste[country] !== "undefined" ? waste[country] : [];

		// push data to array
		waste[country].push({
			"year" : +d.TIME,
			"Agriculture" : +d.Agriculture,
			"Mining" : +d. Mining,
			"Manufacturing" : +d.Manufacturing,
			"Energyproduction" : +d.Energyprod,
			"Water Management" : +d.Water,
			"Construction" : +d.Construction,
			"Other" : +d.Other		
		});
	});

	// prepare energy use data for energy bargraph
	renenergy_emission.forEach(function(d, i) {
		year = +d.TIME;
		if (i > 0 && d.GEO != "Iceland") {
		
			// make index for country only if not existing yet
			scatterData[year] = typeof scatterData[year] !== "undefined" ? scatterData[year] : [];

			// push data to array
			scatterData[year].push({
				"country" : d.GEO,
				"renEnergy" : +d.REN_ENERGY,
				"emission" : +d.EMISSION
			});
		}
	});


	// // nest data for energy savings
	// var energy_savings = d3.nest()
	// 	.key(function(d) {  if (d.UNIT == "Thousand TOE (tonnes of oil equivalent)") {
	// 		return "TOE" } else { return d.UNIT } })
	// 	.key(function(d) { return d.TIME })
	// 	.entries(energysavings);

	// var prim_prod_energy = d3.nest()
	// 	.key(function(d) { return d.GEO })
	// 	.key(function(d) { return d.TIME })
	// 	.key(function(d) { return d.UNIT })
	// 	.entries(primproduction);

	slider(parallelData, energy);
	scatterplot(2005);
	parallelGraph(parallelData, 2005);
	barchart("Netherlands", "energy");
	// scatterplot(2010);
	listeners();

	console.log("nuc energy NL ", energy["Netherlands"]);
}
