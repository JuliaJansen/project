# Julia Jansen
# project

import csv

'''
This script reformats renewable energy data to data per capita.
'''

population = []

# calculate data / capita
with open('../data/population.csv', 'r') as population_infile:
	population_reader = csv.reader(population_infile, delimiter=';')
	for row in population_reader:
		population.append(row)
		
# open parallelgraph as infile
with open('../data/renewable_energydata.csv', 'r') as energy_infile:
	energy_reader = csv.reader(infile, delimiter=';')

	# open outfile
	with open('../data/parallelgraph_capita.csv', 'wb') as outfile:
		writer = csv.writer(outfile)
	
		# read and write
		for i, element in enumerate(reader):
			if i == 0:
				writer.writerow(['TIME', 'GEO', 'ENERGY', 'EMISSIONS', 'WASTE'])
			else:
				# calculate index in population array
				index = int(element[0]) - 2003
				for country in population:
					emission = ''
					waste = ''
					if element[1] == country[0]:
						pop = float(country[index])
						if pop == 1:
							print country[0]
							continue
						if element[2] != '':
							energy = float(element[2]) * 1000 / pop
						if element[3] != '':
							print country[0]
							print element[3]
							emission = float(element[3]) * 1000 / pop
						if element[4] != '':
							waste = float(element[4]) * 1000 / pop

						# write row
						line = [element[0], element[1], energy, emission, waste]
						writer.writerow(line)

# open infile
with open('../data/renewable_energydata.csv', 'r') as energy_infile:
	energyreader = csv.reader(energy_infile, delimiter=',')

	with open('../data/wastesectordata.csv', 'r') as outfile:
		writer = csv.writer(outfile)

		# read and write
		for row in reader:
			if len(row) > 2:
				if row[3] == "Agriculture forestry and fishing " or row[3] == "Mining and Quarrying" or row[3] == "Manufacturing industries: Total" or row[3] == "Energy Production " or row[3] == "Water supply sewerage waste management " or row[3] == "Construction" or row[3] == "Other":
					print row[4], row[1], row[3], row[12]
					writer.writerow([row[4], row[1], row[3], row[12]])

				