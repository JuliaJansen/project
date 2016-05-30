# project proposal
Julia Jansen

Doel
----

Steden zijn de cruciale factor om de klimaatverandering te verminderen! In deze visualisatie wil ik van (enkele) steden twee beelden tegenover elkaar zetten. BAD en GOOD gedrag wanneer het gaat om verschillende oorzaken van klimaatverandering en het verder ontwikkelen daarvan. 

Drie tegenstellingen zijn de focus:
* gebruik van fossiele brandstoffen versus duurzame brandstoffen 
* gebruik van auto naar werk versus openbaar vervoer
* waste generation versus waste recycling 

Naast een vergelijking tussen enkele steden, kan de gebruiker er vervolgens voor kiezen om de data voor het gehele land met die van de steden te vergelijken. Dan wordt duidelijk waarin die twee met elkaar overeenkomen en verschillen. 

Naast het verbeelden van deze drie tegenstellingen zal de pagina beeldend vertellen over de initiatieven die er vooral op stedelijk niveau plaatsvinden. De 'Convenant of Mayors' zal daarbij leidend zijn. 


Minimum viable product
----------------------
De vergelijking van minstens drie grote steden in Europa over de drie bovengenoemde tegenstellingen is het minste dat ik wil bereiken. Dat vertelt al een mooi verhaal over de bijdrage van steden aan het klimaatprobleem en de oplossingen. 

Waarom?
-------
Het probleem over klimaatverandering wordt altijd enorm groots beschreven en als globaal probleem benaderd. Met deze visualisatie wil ik laten zien dat veel verandering op kleinere schaal haalbaarder is, maar van niet onderschatbare waarde. Het grootste gedeelte van de wereldbevolking woont immers in steden! 

Hoe?
----
De data zal met name in grafiekjes en simpele figuren verbeeld worden, aangezien het om enkele steden gaat. Wel wordt eerst op een landkaartje aangegeven tussen welke steden kan worden gekozen om data van weer te geven. Met een simpel 'onclick' op die steden zullen dan de grafiekjes en tabellen veranderen. Wanneer dit alles is gelukt, zal ik bij het verbeelden van de data per land wel een landkaart gebruiken met alleen het land waarmee een daarin liggende stad vergeleken wordt. Mocht er nog tijd over zijn dan kan ik op weer een andere pagina een landkaart maken waarop ik de data van de landen met elkaar vergelijk.

De visualisatie voor het vergelijken van steden met elkaar en steden ten opzichte van de rest van hun land wil ik op gescheiden pagina's weergeven. Het betreft namelijk verschillende vergelijkingen. De optionele vergelijking tussen landen alleen kan op een derde pagina. De pagina's wil ik onder elkaar plaatsen, maar laten verschijnen met naar beneden scrollen. Ik weet nog niet of dat me lukt. 


Sketches
--------
See doc folder


Seperate parts
---------------
1. energiegebruik

2. transport naar werk
http://appsso.eurostat.ec.europa.eu/nui/show.do

3. afval 

Hoe werken die samen?
Deze verschillende onderwerpen komen samen binnen het onderwerp duurzame omgang met natuurbronnen en leefomgeving. De verschillende onderdelen wil ik aan elkaar koppelen door een verhaal rond verschillende visualisaties te bouwen. Ik wil de onderwerpen wua interactiviteit redelijk gescheiden houden. Slechts een verandering van focus op een bepaald land in de twee overige secties als er binnen één onderdeel een land/stad wordt aangeklikt is genoeg. De onderwerpen hangen namelijk wua thema wel samen, maar niet zo sterk qua datapunten. 

Interactiviteit
---------------
Het vergelijken van steden staat voorop en het moet daarom mogelijk zijn voor de gebruiker om op een kaart verschillende steden aan te klikken die de focus/vergelijking moeten krijgen. In staafdiagrammen en grafieken wil ik vervolgens de data voor 1 van bovengenoemde onderwerpen laten zien voor de aangeklikte landen. Dat kan dus verschillen van 1 tot 5. 

Mogelijke problemen
--------------------
Tot nu is er geen data over energiegebruik van alle steden in europa in één dataset te vinden (erg jammer en gek) maar is er wel over sommige losse steden data te vinden, dus ik zal me nu op enkele steden focussen. Tot nu Amsterdam, Londen, Berlijn, Madrid en Boekarest. Verschillende landen met een verschillende positie in de EU. En Amsterdam omdat het interessant is voor mij en mijn omgeving. Nadeel bij deze versplinterde data dat het misschien nodig is om de data meer om te vormen naar dezelfde eenheden om te rekenen. Ook kan het zijn dat de data van verschillende bronnen komt waardoor de interne consistentie vermindert. 

Vergelijkbare data/visualisaties
--------------------------
* Energiegebruik
http://coolclimate.berkeley.edu/maps
Op deze map zijn per regio de carbon emissions te zien en wanneer je met je muis over een regio beweegt verschijnt een staafdiagram met een specificatie waar die uitstoot uit is opgebouwd. De interactie werkt goed en de kleuren in de staafdiagram maken duidelijk dat het om nominale data gaat. Het is wel jammer dat de samenstelling van de uitstoot van verschillende regio's niet gemakkelijk met elkaar te vergelijken is om dat er maar 1 staafdiagram verschijnt. Het zou interessant zijn als de gebruiker er twee of meerdere aan kan klikken en die dus met elkaar kan vergelijken. Dan wordt inzichtelijker of er voor grote en kleine uitstoters typische verhoudingen zijn in de soort uitstoot of niet. 

* Transport 
http://flowingdata.com/2015/01/20/how-americans-get-to-work/
De visualisatie op bovengenoemde pagina geeft voor de VS weer hoe mensen tussen werk en huis reizen. Door de knoppen bovenaan de pagina kunnen verschillende filters aan en uit worden gezet. Dit geeft de gebruiker goed de mogelijkheid om de data de exploreren naar eigen interesse. Het is niet helemaal duidelijk hoe de kleur wordt bepaald als alle filters aan staan. De pop up (wanneer er over een regio bewogen wordt) geeft echter mooi weer wat de precieze data is. Het zou wel handiger zijn als het mogelijk is om die specificatie van verschillende regio's tegelijkertijd te zien. De kleuren zijn mooi subtiel. 

* Afval
http://www.opendata.rs/visualizations/composition-municipal-waste
Deze visualisatie maakt het onderwerp meteen duidelijk aan de gebruiker door met typische symbolen te werken. De cijfers zijn daardoor wel iets minder goed te interpreteren, maar worden er ook bij vermeld. Het interactieve element van deze visualisatie laat geen extra verbanden in de data zien. Het maakt de afbeelding slechts leesbaarder. 

https://data.oecd.org/waste/municipal-waste.htm
Deze data geeft meteen data voor verschillende landen weer waardoor ze goed met elkaar te vergelijken zijn. Het interactieve effect zorgt ervoor dat de focus op één land komt te liggen en geeft exacte waardes weer aan de gebruiker. Ook de vergelijking met het gemiddelde is goed mogelijk omdat die lijn vet zwart wordt weergegeven. De slider onder de grafiek geeft heel mooi de mogelijkheid om de tijdsperiode die wordt weergegeven in de grafiek te veranderen en zo dus ook in te zoomen op een periode die de gebruiker interesseert. Het trekken van lijnen tussen de datapunten wordt wel twijfelachtig als er heel erg wordt ingezoomd (op bijvoorbeeld twee jaren) aangezien het gaat om data per jaar. 

