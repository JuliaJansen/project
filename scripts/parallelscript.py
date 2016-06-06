import csv

'''
This script reformats data to data per capita.
'''

# merge data for parallel coordinates graph
with open('../data/totaleemissie.csv', 'r') as emissie_infile:
	emissie_reader = csv.reader(emissie_infile, delimiter=';')
	for row in emissie_reader:
		emissions.append(row)

with open('../data/parallelgraph_capita.csv', 'wb') as outfile:
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
