# Julia Jansen
# project

import csv

'''
This script reformats renewable energy data to data per capita.
'''

emission = []

# calculate data / capita
with open('../data/parallelgraph_capita.csv', 'r') as emission_infile:
	emission_reader = csv.reader(emission_infile, delimiter=',')

	# save emission data in list
	for row in emission_reader:
		emission.append(row)

# open parallelgraph as infile
with open('../data/renewable_capita.csv', 'r') as energy_infile:
	energy_reader = csv.reader(energy_infile, delimiter=',')

	with open('../data/renenergy_emission.csv', 'wb') as outfile:
		writer = csv.writer(outfile)

		writer.writerow(['TIME', 'GEO', 'EMISSION', 'REN_ENERGY'])

		# read and write
		for line in energy_reader:
			for row in emission:
				if row[0] == line[0] and row[1] == line[1]:
					element = [row[0], row[1], row[3], line[2]]
					writer.writerow(element)			 

