# Julia Jansen
# project

import csv

'''
This script reformats data to a useful csv with year, country, values for all variables
'''

# open infile
with open('../data/wastesectordata.csv', 'r') as infile:
	reader = csv.reader(infile, delimiter=',')

	with open('../data/waste_sector_data.csv', 'wb') as outfile:
		writer = csv.writer(outfile)

		alldata = []
		agriculture = []
		mining = []
		manufacturing = []
		energyprod = []
		water = []
		construction = []
		other = []

		writer.writerow(["TIME", "GEO", "Agriculture", "Mining", "Manufacturing", "Energyprod", "Water", "Construction", "Other"])

		# read and write
		for row in reader:
			if row[2] == "Agriculture forestry and fishing ":
				agriculture.append(row)
			if row[2] == "Mining and Quarrying":
				mining.append(row)
			if row[2] == "Manufacturing industries: Total":
				manufacturing.append(row)
			if row[2] == "Energy Production ":
				energyprod.append(row)
			if row[2] == "Water supply sewerage waste management ":
				water.append(row)
			if row[2] == "Construction":
				construction.append(row)
			if row[2] == "Other":
				other.append(row)
		
		for element in agriculture:
			# make element to write
			element = [element[0], element[1], element[3]]

			for thing in mining:
				if thing[0] == element[0] and thing[1] == element[1]:
					element.append(thing[3])

			for thing in manufacturing:
				if thing[0] == element[0] and thing[1] == element[1]:
					element.append(thing[3])

			for thing in energyprod:
				if thing[0] == element[0] and thing[1] == element[1]:
					element.append(thing[3])

			for thing in water:
				if thing[0] == element[0] and thing[1] == element[1]:
					element.append(thing[3])

			for thing in construction:
				if thing[0] == element[0] and thing[1] == element[1]:
					element.append(thing[3])

			for thing in other:
				if thing[0] == element[0] and thing[1] == element[1]:
					element.append(thing[3])

			writer.writerow(element)

				