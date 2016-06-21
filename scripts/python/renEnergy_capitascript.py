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
	energy_reader = csv.reader(energy_infile, delimiter=',')

	# open outfile
	with open('../data/renewable_capita.csv', 'wb') as outfile:
		writer = csv.writer(outfile)
	
		writer.writerow(['TIME', 'GEO', 'REN_ENERGY', 'EMISSION'])
		# read and write
		for i, element in enumerate(energy_reader):
			
			# skip first line
			if i > 0:

				# calculate index in population array for year
				index = int(element[0]) - 2003
				for country in population:
					renEnergy = ''

					if element[1] == country[0]:
						pop = float(country[index])

						# missing values
						if pop == 1:
							print country[0]
							continue

						# calculate renewable energy / capita
						if element[2] != '':
							renEnergy = float(element[2]) * 1000 / pop

						# write row
						line = [element[0], element[1], renEnergy]
						writer.writerow(line)

# # open infile
# with open('../data/renewable_energydata.csv', 'r') as energy_infile:
# 	energyreader = csv.reader(energy_infile, delimiter=',')

# 	with open('../data/wastesectordata.csv', 'r') as outfile:
# 		writer = csv.writer(outfile)

# 		# read and write
# 		for row in reader:
# 			if len(row) > 2:
# 				if row[3] == "Agriculture forestry and fishing " or row[3] == "Mining and Quarrying" or row[3] == "Manufacturing industries: Total" or row[3] == "Energy Production " or row[3] == "Water supply sewerage waste management " or row[3] == "Construction" or row[3] == "Other":
# 					print row[4], row[1], row[3], row[12]
# 					writer.writerow([row[4], row[1], row[3], row[12]])

# 				