/* project.js
 *
 * Julia Jansen
 * Programmeerproject
 * Loading data and preparing visualisations
 */

window.onload = function() {
	// load two datasets asynchronously
	d3_queue.queue()
		.defer(d3.csv, '/data/complete_energy_data.csv')
		.defer(d3.csv, '/data/energysavings.csv')
		.defer(d3.csv, '/data/total_emissions.csv')
		.defer(d3.csv, '/data/municipal_waste.csv')
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

function prepareData(error, totalenergy, energysavings, totalemissions, 
	municipalwaste, economicemissions, economicwaste, gasdata, heatdata, nucleardata, 
	oildata, renewabledata, solidfuelsdata, wasteconsumption_data, primproduction) {
	if (error) { alert(error); }

	// nest data for parallel coordinates
	// energy
	var total_energy = d3.nest()
		.key(function(d) { if (d.UNIT == "Thousand TOE (tonnes of oil equivalent)") {
			return "TOE" } else { return d.UNIT } })
		.key(function(d) { return d.TIME })
		.entries(totalenergy);

	console.log("total energy use:", total_energy); 

	var energy_savings = d3.nest()
		.key(function(d) {  if (d.UNIT == "Thousand TOE (tonnes of oil equivalent)") {
			return "TOE" } else { return d.UNIT } })
		.key(function(d) { return d.TIME })
		.entries(energysavings);

	console.log("energy savings since 2005:", energy_savings);

	// emissions
	var total_emissions = d3.nest()
		.key(function(d) { if (d.AIREMSECT == "All sectors excluding all memo items") {
			return "ALL" } else { return d.AIREMSECT } })
		.key(function(d) { return d.TIME })
		.entries(totalemissions);

	console.log("total emissions:", total_emissions);

	// waste
	var municipal_waste = d3.nest() 
		.key(function(d) { return d.Year })
		.key(function(d) { return d.Country })
		.entries(municipalwaste);

	console.log("municipal waste:", municipal_waste);
	

	// nest data for energy bargraph
	var gas = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(gasdata);

	console.log("energy from gas:", gas);

	// nest data for energy bargraph
	var heat = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(heatdata);

	console.log("energy from heat:", heat);

	// nest data for energy bargraph
	var nuclear = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(nucleardata);

	console.log("nuclear energy:", nuclear);

	// nest data for energy bargraph
	var oil = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(oildata);

	console.log("energy from oil:", oil);

	// nest data for energy bargraph
	var renewable_energy = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(renewabledata);

	console.log("renewable energy:", renewable_energy);

	// nest data for energy bargraph
	var solid_fuels = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(solidfuelsdata);

	console.log("solid fuels:", solid_fuels);

	// nest data for energy bargraph
	var waste_consumption = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(wasteconsumption_data);

	console.log("wasteconsumtion for energy", waste_consumption);

	var prim_prod_energy = d3.nest()
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.UNIT })
		.entries(primproduction);

	console.log("primary energy production:", prim_prod_energy);

	// nest data for emission bargraph
	// nested by industry
	var economic_emissions = d3.nest() 
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.NACE_R2 })
		.entries(economicemissions);

	console.log("emission per economic activity: ", economic_emissions);

	// nested by sort of pollution
	var pol_emissions = d3.nest() 
		.key(function(d) { return d.GEO })
		.key(function(d) { return d.TIME })
		.key(function(d) { return d.AIRPOL })
		.entries(economicemissions);

	console.log("emission per pollution: ", pol_emissions);

	// nest data for waste bargraph
	var economic_waste = d3.nest()
		.key(function(d) { return d.Country })
		.key(function(d) { return d.Year })
		.entries(economicwaste);

	console.log("waste specified by economic activity: ", economic_waste);

}
