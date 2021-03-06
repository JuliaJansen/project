# Julia Jansen
# Process book programmeerproject

#### Day 2:  
* Data  
Helaas is er over steden in Europa nauwelijks centraal data te vinden over energie verbruik. Dit betekent dat ik voorlopig bij een vergelijking tussen landen blijf. Mijn verhaal "steden als voorlopers voor verduurzaming" is daarmee wel verdwenen. Vandaar na wat data zoeken en bekijken van meer visualisaties een kleine verandering qua insteek.  

De nadruk in het verhaal komt nu te liggen op energieverbruik van alle landen in Europa aan de ene kant. Daarbij wil ik ook laten zien hoe het energieverbruik per land verdeeld is over verschillende bronnen en natuurlijk de focus leggen op een vergelijking tussen renewable energies en de rest.  

Het verhaal gaat vervolgens de link leggen naar waar het verbruik van energie uiteeeeeindelijk toe leidt: uitstoot van broeikasgassen en afval generatie. Vandaag heb ik alle data gevonden voor deze drie onderwerpen. Voor de uitstoot heb ik data per land en verder gespecificeerd per economische activiteit. Zie voor meer achtergrondinformatie om in het verhaal te verwerken nog een keer hier: http://ec.europa.eu/eurostat/statistics-explained/index.php/Greenhouse_gas_emissions_by_industries_and_households. 

De data over afval in europa heb ik per land in kilotonnen en verder gespecificeerd per economische activiteit en per soort afval. Ik weet nog niet of ik alles daarvan zal gebruiken. 

* Advanced sketches  
Parallel coordinates met drie assen en voor elk land een lijn. 1 jaar wordt weergegeven en een slider geeft de optie om een ander jaar weer te geven. 

Wanneer een land is aangeklikt:  
Een barchart met data over de jaren (jaren op x-as). Stacked bars zodat de specificatie in verschillende categoriën duidelijk wordt:  
http://bl.ocks.org/mbostock/3943967  
met een menu om te switchen tussen energy use/emissions/waste. 

#### Day 3:  
Enkele uren geprobeerd om mijn github weer clean in de lucht te krijgen wat dankzij Jaap succesvol is gelukt!

Design.md bevat nu schetsen van pagina 1, 2 en grof van pagina 3. Voor pagina drie weet ik nog niet precies wat ik ga weergeven omdat ik daarvoor eerst uitzonderlijke landen moet zien te vinden aan de hand van de eerste twee visualisaties. Morgen data inladen via d3.json load!! 

#### Day 5
De data voor de parallel graph staat nu in het juiste format. De pagina's zijn allemaal zichtbaar en de navigatie tussen de pagina's werkt. De interactieve elementen staan op bij de plek waar de visualisaties moeten komen. Vanaf maandag ga ik de eerste grafiek tekenen. Volgende week hopelijk de grafiek en barchart af. 

#### Day 6
Databronnen: 
municipal waste: oecd stats
energy use: eurostat
energy production: eurostat
emissions: eurostats
population: eurostat

Alle data voor de parallel graph nu omgezet in data/capita.
Eenheden:
energy: tonnes of oil equivalent
emissions: tonnes of CO2 equivalent
waste: tonnes of waste

Parallel coordinates is zichtbaar op de site. MAAR
....nog daaraan doen:
-slider werkend (interactief) maken
-landen namen weergeven + lijn dik on hover

#### Day 7
Vandaag nog weer veel data bewerkt, omdat het format toch net weer anders moest dan ik dacht.
Alle data voor de energy barchart is nu in het goede format, maar wordt per land weergegeven. Voor data per capita moet dit dus nog bewerkt worden. Dat lijkt me handig in javascript te doen.

Voor de emissie en waste moet ik dezelfde databewerkingen ook nog doen. Dat kost me waarschijnlijk minstens een halve dag morgen.

De layout van m'n webpagina heeft helaas opeens padding aan de zijkant waarvan ik niet weet hoe het ontstaan is en waar ik het kan veranderen. De site gebruikt opeens niet meer de hele breedte van de pagina. Dat is jammerrrr, morgen naar kijken. 

#### Day 8
De parallel coordinates is nu gedeeltelijk interactief. On hover licht een lijn op en verandert van kleur. De tooltip is nog niet echt gelukt. En verschijnt wel in een divje welk land er bij de lijn hoort waar de gebruiker over heen beweegt. TO DO aan deze grafiek:
- tooltip voor waardes op assen
- country label werkend krijgen
- interactie bij onclick naar barchart

De barchart-data voor energy is nu eindelijk in het goede format. Dat zal heel wat tijd schelen  bij het verwerken van de emissie en waste data, maar is nog steeds veel werk. 

Het uitzoeken van in welk formaat de data nou precies moest was niet goed duidelijk aan veel voorbeelden op the interwebz omdat er veel random gegenereerde dummy data werd gebruik ;(.

#### Day 9
Het gaat stap voor stap verder. 

PROBLEEM:  
Iceland en Luxembourg lijken outliers die met de jaren absurd veel meer energie per capita gaan gebruiken waardoor de andere lijnen steeds dichter tegen elkaar toekruipen. UITZOEKEN OF HET KOMT OMDAT DEZE LANDEN ZO KLEIN ZIJN!! Even rondzoeken op internet of er iets te vinden is over het energieverbruik en stijging daarvan in deze kleine ***energievreters***. 

Verder:
- parallel coordinates is interactief, slider werkt en hover ook en click op land geeft land door aan console.log
- barchart ben ik ongelooflijk mee aan t kloten snap er de ballen van.
- slider werkt nu ook goed, alleen cijfers worden met comma weergegeven. Krijg ik wel weg, maar dan verdwijnen de jaren tijdens het draggen van de slider. :(

#### Day 10
**Iceland** gebruikt per capita de meeste energy TER WERELD. Luxembourg staat op nr. 5. Geen wonder dat deze twee landen de data scheef trekken. Link naar uitleg over energy use op Iceland:  
http://www.planetforward.org/idea/why-do-icelanders-consume-so-much-energy-brynj%C3%B3lfur-v-%C3%B3lafsson  
Dit is wellicht interessant om dieper op in te gaan in de FACTS sectie. Die kan dan gaan over het verband tussen het gebruik van renewable energy en uitstoot/afval productie. 

**Luxembourg**'s energy consumptie is niet te wijten aan super lage kosten voor het opwekken of de productie ervan. Het hoge verbruik van energie in Luxembourg schrijft men vaak toe aan de lage tax voor benzine, waardoor buitenlanders worden gestimuleerd dit af te nemen in Luxemburg. Omdat het land een klein inwoneraantal heeft, zou het zo kunnen zijn dat deze buitenlandse gebruikers inderdaad in grote mate invloed hebben op het Luxemburgse energieverbruik per capita. Een in  verhouding groot verbruik van petroleum zou dat bevestigen. Dit blijkt hopelijk snel uit de energie grafiek.  
https://askjaenergy.com/2014/11/17/iceland-is-the-world-largest-energy-consumer-per-capita/  

###### outliers
Vandaag bij de presentatie vragen: is het boeiend om deze outliers extra aandacht te geven in een aparte visualisatie? Of toch blijven bij de samenhang tussen renewable energy en uitstoot (waarvoor ijsland misschien ook een interessant voorbeeld is.)  

###### energie data
Het is me onduidelijk geworden of ik 'waste consumption' moet weergeven in de barchart over energieverbruik. Ik moet iets verder onderzoeken of de categoriën die ik nu heb aangemaakt kloppen als aanduiders van energieverbruik. 

#### 12 juni
De belangrijkste broeikasgassen en hun relatieve aardopwarmingsvermogens zijn:

Een uitgebreider overzicht staat onder Aardopwarmingsvermogen  
Naam	Formule	CO2-equivalent  
Koolstofdioxide	CO2	1  
Methaan	CH4	28  
Distikstofoxide (lachgas)	N2O	265  
Waterdamp	H2O	Zie sectie over waterdamp  
Chloorfluorkoolstofverbindingen	CxFyClz	5700 tot 11 900  
Zwavelhexafluoride	SF6	23 500  
Ozon	O3	 ?  

Daarom neem ik voor de uitstoot tabel per industrie alleen CO2. Ook nog specificeren voor verschillende broeikasgassen zou te veel informatie voor één grafiek zijn. 

#### 13 juni
Vandaag de data voor emissie en waste per economische activiteit omgeschreven naar hezelfde format als de energy/bron. 

Het is nogal een gedoe omdat er zoveel veschillende economische activiteiten zijn, maar we komen er wel. 

- Emission data: 
** alle missende waardes van : veranderd in '', zodat het te lezen is in javascript en ik een if-statement in kan bouwen voor de waarde ''. 

** 			Names of variables:  
			"Agriculture_ forestry and fishing"  
			"Mining and quarrying"  
			"Manufacturing"  
			"Electricity_ gas_ steam and air conditioning supply"  
			"Water supply_ sewerage_ waste management and remediation activities"  
			"Wholesale and retail trade_ repair of motor vehicles and motorcycles"  
			"Transportation and storage"  
			"Accommodation and food service activities"  
			"Information and communication"  
			"Financial and insurance activities"  
			"Real estate activities"  
			"Professional_ scientific and technical activities"  
			"Administrative and support service activities"  
			"Public administration and defence_ compulsory social security"  
			"Education"  
			"Human health and social work activities"  
			"Arts_ entertainment and recreation"  
			"Other service activities"  
			"Activities of households as employers_ undifferentiated goods- and services-producing activities of households for own use"  
			"Activities of extraterritorial organisations and bodies"  

			Labels in barchart:  

			"Agriculture"  
			"Mining"  
			"Manufacturing"  
			"Electricity_Gas_Steam"  
			"Water_management"  
			"Transportation_Storage"  
			"Accomodation_Food"  
			"Information_Communication"  
			"Financial_Insurance"  
			"RealEstate"  
			"Professional_Scientific_Technical"  
			"Administration_Defence_SocialSecurity"  
			"Education"  
			"Health_SocialWork"  
			"Arts_Entertainment"   
			"OtherService"  
			"Households_Employers"  
		 	"Extraterritorial_Org"  

#### 14 juni
Nog doen:
- libraries lokaal opslaan
- Camel case overal toepassen

Waste data ook geladen en omgezet! 
Bedenken: hoe zorg ik dat ik bij de grafieken bij mijn data kan zonder dat ik de data door hoef te geven?

!! Eenheid energy barchart: thousand tonnes of oil equivalent  
!! Eenheid emissie barchart: tonnen  
!! Eenheid waste barchart: thousand tonnes  

!! Eenheid renewable energy in scatterplot = tonnes of oil equivalent  
!! Eenheid emission in scatterplot = tonnes of CO2 equivalent

- Scatterplot zichtbaar, ijsland voor nu er uit (omdat het een mega outlier is)
TO DO: 
- kleurenpallet scatterplot uitbreiden
- scatterplot interactief maken: per jaar (reagerend op de parallel coordinates slider) en met tooltipjes

#### 15 juni
Vandaag gedaan gekregen:
- scatterplot met tooltip
- slider roept scatterplot aan per jaar
- comma's zijn eindelijk weg bij de jaartallen van de slider

#### 17 juni
Weer een halve dag besteed aan de grouped-stacked barchart. Ik ga overstappen op een grouped barchart en die eerst werkend krijgen. Het aanroepen van de barchart en het updaten van de bars is nogal wat gedoe. 
:(

#### 18 juni
De grouped barchart tekenen lukt, en alles is interactief, maar ik vewijder nu nog steeds alle grafieken en teken een nieuwe ipv updaten. Dit moet nog gefikst!! 

De legenda tekenen klopt nog niet helemaal... bij waste zijn twee verschillende variabelen groen.

#### 20 juni
Done today:  
- parallel coordinates en scatterplot reageren op elkaar: wanneer een element in de ene grafiek moused over is, krijgt het element van dat land in de andere grafiek ook nadruk. Helaas moet in in één van beide functies telkens wanneer er gehoverd wordt weer opnieuw het dom-element selecteren omdat de grafieken ietsje na elkaar worden getekend en de elementen dus voor één van de twee grafieken niet direct al in de functie van de andere geselecteerd kunnen worden.  
- de kleuren bij on hover gewijzigd: lijn wordt alleen dikker in parallel coordinates en stippen groter in scatterplot. Nu nog fixen dat de andere lijnen/stippen wat doorzichtig worden. 

TO DO:
- verslag schrijven
- legenda barchart bug fixen
- navragen of update ook met barchart met totaal verschillende datasets kan
- naar beneden scrollen met on click in parallel coordinates en scatterplot... ELKE KEER
- verhaaltjes over de data + bronvermelding
- eenheid bij assen parallel coordinates

OPTIONAL
- "tooltips" om de gebruiker te laten zien hoe het moet werken
- parallel coordinates opsplitsen in draw en update

..... IS HET MOGELIJK OM TE WISSELEN TUSSEN 2 DATASETS MET EN ZONDER OUTLIERS VOOR PARALLEL COORDINATES??? 

#### 21 juni
Het verslag is zo goed als af. Nog wel de veranderingen die ik vandaag morgen en overmorgen doe daarin aanpassen. 
Verder besloten om de barchart niet te update, omdat het bij toggelen tussen de variabelen toch om totaal verschillende datasets gaat. Dan zou met het updaten alles in de exit selectie komen en de nieuwe data in de append. Dan geven de effecten zoals transition ook niet veel info, omdat het om totaal nieuwe variabelen gaat ipv variabelen die ge-updatet worden. 

Met een wrap functie van Mike Bostock (<3) is het gelukt om de variabele EN eenheid bij de y-assen van de parallel coordinates er mooi op te krijgen.  

Na vandaag nog to do:
- naar beneden scrollen met on click in parallel coordinates en scatterplot... ELKE KEER
- color scale scatterplot uitbreiden
- margins definitie naamgeving per grafiek
- verhaaltjes over de data + bronvermelding
- legenda barchart bug fixen
- slider mooi maken
- line en dot linken naar interactie vanuit text
- on hover line grap: andere lines opacity groter.
- zelfde voor scatterplot

optioneel: zie gisteren. 

#### 22 juni
Color scale scatterplot opgelost met een dictionary.
Global variable year werkt. Slider year updaten gaat goed. 
Bezig geweest met de pagina opmaak.
Legenda barchart gefixt, met voor elke selectie een ander kleurenpallet. Economische sectoren die zowel bij uitstoot als bij afvalproductie te zien zijn houden dezelfde kleur. 

Nog to do nu: 
- verslag afschrijven
- verhaal over de data 
- slider mooi maken
- line en dot linken naar interactie vanuit text
- lijnen parallel kleuren naar emissie. 
- on hover line grap: andere lines opacity groter.
- zelfde voor scatterplot

OPTIONAL
- "tooltips" om de gebruiker te laten zien hoe het moet werken

#### *** 23 LAST DAY ***
De laatste dag is begonnen. Net het verslag afgeschreven, tijdens het schrijven nog wat dingetjes bedacht die nog moeten gebeuren:
- y ax label barchart
- weergeven of het met of zonder outlier is

Helaas lukt de interactie tussen tekst op de pagina en de on hover functie in een grafiek me nog niet! 

Schluss ermee.

