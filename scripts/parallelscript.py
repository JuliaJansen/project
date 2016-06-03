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
	waste_reader = csv.reader(waste_infile, delimiter=',')
	for row in waste_reader:
		waste.append(row)

with open('../data/energy.csv', 'r') as energy_infile:
	energy_reader = csv.reader(energy_infile, delimiter=',')
	for row in energy_reader:
		energy.append(row)

for element in waste:
	for thing in energy:
		if thing[0] ==  element[0] and thing[1] == element[1]:
			print thing[3]

	for thang in energy:
		if thang[0] ==  element[0] and thang[1] == element[1]:
			print thang[3]


	# with open('../data/totaleemissie.csv', 'wb') as outfile:
	# 	writer = csv.writer(outfile)
	# 	for i, row in enumerate(reader):
	# 		if i % 3 == 0:
	# 			writer.writerow(row)
