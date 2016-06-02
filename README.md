# project proposal
Julia Jansen

### Doel
----

De visualisatie moet een inzicht bieden in de balans tussen energie verbruik en negatieve gevolgen daarvan: broeikasgassen en afvalgeneratie. De balans tussen de bron van onze economie en de overblijfselen daarvan kunnen interessant inzicht geven in hoe verschillende landen zich op deze drie vlakken tot elkaar verhouden en of er trends in te ontdekken zijn. Is het echt zo dat landen die veel duurzame energie gebruiken minder broeikasgassen uitstoten bijvoorbeeld? 

Drie onderwerpen zijn dus de focus:
* energie gebruik van landen
* broeikasgassen uitstoot van landen
* afval generatie van landen

Naast het vergelijken van landen op deze drie onderwerpen zal er inzicht geboden worden in de verdeling binnen de drie categorieën over bijvoorbeelde verschillende energiebronnen of afvalgeneratie per economische activiteit. 


Minimum viable product
----------------------
Het vergelijken van de scores van landen in Europa op drie bovengenoemde categorieën, zonder de categorieën verder op te delen is het minimum viable product. Dat geeft al een interessant beeld over de verschillen die er binnen Europa bestaan ten opzichte van energie en milieu beleid. 

Hoe?
----
Een parallel coordinates grafiek verbind de scores voor de drie categorieën met elkaar en een barchart geeft vervolgens meer informatie over een land dat de focus heeft gekregen door interactie. Zie meer info in DESIGN.md. 


Sketches
--------
Zie design.md


Seperate parts
---------------
1. energiegebruik

2. broeikasgassen uitstoot

3. afval 

Hoe werken die samen?
Deze verschillende onderwerpen komen samen binnen het onderwerp duurzame omgang met natuurbronnen en leefomgeving. De verschillende onderdelen wil ik aan elkaar koppelen door een verhaal rond verschillende visualisaties te bouwen. 

Interactiviteit
---------------
De gebruiker heeft de mogelijkheid focus te leggen op verschillende dingen middels interactiteit. Er kan gekozen worden om de data voor 1 specifiek land weer te geven en vervolgens kan er tussen energie/uitstoot/afval gekozen worden om daar specifiekere informatie over te zien voor dat land over de jaren heen. 

Mogelijke problemen
--------------------
Het maken van verschillende tabbladen is nieuw voor mij. Dat wordt dus even wat uitzoekwerk. Verder hoop ik snel inzicht te krijgen in interessante uitschieters zodat ik het laatste tabblad kan ontwerpen. 

Vergelijkbare data/visualisaties
--------------------------
* Energiegebruik:
http://coolclimate.berkeley.edu/maps

Op deze map zijn per regio de carbon emissions te zien en wanneer je met je muis over een regio beweegt verschijnt een staafdiagram met een specificatie waar die uitstoot uit is opgebouwd. De interactie werkt goed en de kleuren in de staafdiagram maken duidelijk dat het om nominale data gaat. Het is wel jammer dat de samenstelling van de uitstoot van verschillende regio's niet gemakkelijk met elkaar te vergelijken is om dat er maar 1 staafdiagram verschijnt. Het zou interessant zijn als de gebruiker er twee of meerdere aan kan klikken en die dus met elkaar kan vergelijken. Dan wordt inzichtelijker of er voor grote en kleine uitstoters typische verhoudingen zijn in de soort uitstoot of niet. 

* Transport: 
http://flowingdata.com/2015/01/20/how-americans-get-to-work/

De visualisatie op bovengenoemde pagina geeft voor de VS weer hoe mensen tussen werk en huis reizen. Door de knoppen bovenaan de pagina kunnen verschillende filters aan en uit worden gezet. Dit geeft de gebruiker goed de mogelijkheid om de data de exploreren naar eigen interesse. Het is niet helemaal duidelijk hoe de kleur wordt bepaald als alle filters aan staan. De pop up (wanneer er over een regio bewogen wordt) geeft echter mooi weer wat de precieze data is. Het zou wel handiger zijn als het mogelijk is om die specificatie van verschillende regio's tegelijkertijd te zien. De kleuren zijn mooi subtiel. 

* Afval: 
http://www.opendata.rs/visualizations/composition-municipal-waste

Deze visualisatie maakt het onderwerp meteen duidelijk aan de gebruiker door met typische symbolen te werken. De cijfers zijn daardoor wel iets minder goed te interpreteren, maar worden er ook bij vermeld. Het interactieve element van deze visualisatie laat geen extra verbanden in de data zien. Het maakt de afbeelding slechts leesbaarder. 


https://data.oecd.org/waste/municipal-waste.htm

Deze data geeft meteen data voor verschillende landen weer waardoor ze goed met elkaar te vergelijken zijn. Het interactieve effect zorgt ervoor dat de focus op één land komt te liggen en geeft exacte waardes weer aan de gebruiker. Ook de vergelijking met het gemiddelde is goed mogelijk omdat die lijn vet zwart wordt weergegeven. De slider onder de grafiek geeft heel mooi de mogelijkheid om de tijdsperiode die wordt weergegeven in de grafiek te veranderen en zo dus ook in te zoomen op een periode die de gebruiker interesseert. Het trekken van lijnen tussen de datapunten wordt wel twijfelachtig als er heel erg wordt ingezoomd (op bijvoorbeeld twee jaren) aangezien het gaat om data per jaar. 

