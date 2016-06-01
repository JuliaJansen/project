# DESIGN
Julia Jansen

#### Sketches  
see doc folder for the images. They are named 'advanced_nr.png'.
- 1.0: parallel coordinates met drie assen en voor elk land een lijn. 1 jaar wordt weergegeven en een slider geeft de optie om een ander jaar weer te geven. 
- 1.1: slider
- 1.2: option to select several lines, following values on (one of) te axes.  

- 2.0: wanneer een land is aangeklikt, volgt een barchart onder de parallel coordinates met data over de jaren (jaren op x-as). Stacked bars zodat de specificatie in verschillende categoriën duidelijk wordt:  
http://bl.ocks.org/mbostock/3943967  
met een menu om te switchen tussen energy use/emissions/waste.  
- 2.1: menu om te kiezen tussen data die moet worden weergegeven.
- 2.2: menu te kiezen tussen stacked of grouped bars

- 3.0: landen uitlichten?

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

#### File structure
* project.html
* folder: scripts  
> voor elk datafile een python script die de data (ofwel csv ofwel tsv) naar json omzet  
* folder sources:  
> * project.js __hierin wordt de data uit json geladen en de functie aangeroepen die de eerste grafiek tekent.
> * helper_functions.js __hierin worden helper functions gedefinieerd om bijvoorbeeld waardes om te rekenen of kleuren aan datapunten te linken. 
> * graphic_functions.js __hierin worden de functies beschreven die alle grafieken/tabellen vormen en op de pagina plaatsen.
> * project.css __style sheet van de webpagina.