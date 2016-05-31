# DESIGN
Julia Jansen

#### Sketches  
see doc folder for the images. They are named 'advanced_nr.png'.
- advanced 1: lalala  
- advanced 2: lalala  
- advanced 3: lalala  

advanced sketches of your UI that clearly explain which features are connected to which underlying part of the code

#### Plugins
* d3.js
* bootstrap

#### Data
* Energy:  
eurostat   
_complete energy, gas, oil, heat, solid fuels, waste-consumption, renewable energy, nuclear energy, primary production of energy, energy savings since 2005:  

* Emissions:  
eurostat  
_per country. all greenhouse gas emissions:  
http://ec.europa.eu/eurostat/statistics-explained/index.php/Greenhouse_gas_emission_statistics

_per industry and per household:  
http://ec.europa.eu/eurostat/statistics-explained/index.php/Greenhouse_gas_emissions_by_industries_and_households

* Waste:  
eurostat
_waste per economic activity, waste generation (per waste)  
http://ec.europa.eu/eurostat/data/database?p_auth=9a8V6R3i&p_p_id=estatsearchportlet_WAR_estatsearchportlet&p_p_lifecycle=1&p_p_state=maximized&p_p_mode=view&_estatsearchportlet_WAR_estatsearchportlet_action=search&text=Generation+of+waste+by+economic+activity

The data will be formatted from csv to json and then loaded using the d3.json load function. One file (the waste per economic activity) will be loaded from directly using the load tsv function from the d3 library.  
