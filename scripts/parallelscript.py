import csv

'''
This script reformats data from csv file
into a useful csv file that contains year, country, unit, energy, emission, waste
'''
energy = []
emissions = []
waste = []

# merge data for parallel coordinates graph
with open('../data/totaleemissie.csv', 'r') as emissie_infile:
	emissie_reader = csv.reader(emissie_infile, delimiter=',')
	for row in emissie_reader:
		emissions.append(row)

with open('../data/waste.csv', 'r') as waste_infile:
	waste_reader = csv.reader(waste_infile, delimiter=';')
	for row in waste_reader:
		waste.append(row)

with open('../data/energy.csv', 'r') as energy_infile:
	energy_reader = csv.reader(energy_infile, delimiter=';')
	for row in energy_reader:
		energy.append(row)

with open('../data/parallelgraph.csv', 'wb') as outfile:
	writer = csv.writer(outfile)
	writer.writerow(['TIME', 'GEO', 'ENERGY', 'EMISSIONS', 'WASTE'])


	for element in energy:
		writethis = []
		for thing in emissions:
			if thing[0] ==  element[0] and thing[1] == element[1]:
				element.append(thing[3])

		for thang in waste:
			if thang[0] ==  element[0] and thang[1] == element[1]:
				element.append(thang[2])

		writer.writerow(element)
