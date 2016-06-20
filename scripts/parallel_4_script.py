# Julia Jansen
# project

import csv

'''
This script reformats data to data per capita.
'''

production = []

with open('../data/primaryproduction.csv', 'r') as production_infile:
	production_reader = csv.reader(production_infile, delimiter=',')

	for row in production_reader:
		production.append(row)

	# print production
		
# open parallelgraph as infile
with open('../data/parallelgraph_capita.csv', 'r') as infile:
	reader = csv.reader(infile, delimiter=',')

	# open outfile
	with open('../data/parallelgraph_4_capita.csv', 'wb') as outfile:
		writer = csv.writer(outfile)
	
		# read and write
		for i, element in enumerate(reader):
			if i == 0:
				writer.writerow(['TIME', 'GEO', 'PRODUCTION', 'ENERGY', 'EMISSIONS', 'WASTE'])
			else:
				# calculate index in population array
				for country in production:
					emission = ''
					waste = ''
					if element[0] == country[0] and element[1] == country[1]:
						# print element[0], element[1], country[2], element[2], element[3]
						line = element[0], element[1], country[2], element[2], element[3], element[4]
						# write row
						writer.writerow(line)