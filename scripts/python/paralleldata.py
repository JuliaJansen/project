# Julia Jansen
# python script
# project

import csv

'''
This script reformats data from csv file
into a useful csv file that contains country, 
'''

# transform waste file to municipal waste only
with open ('../data/total_emissions.csv', 'r') as infile:
	reader = csv.reader(infile, delimiter=';')
	with open('../data/energy.csv', 'wb') as outfile:
		writer = csv.writer(outfile)
		for row in reader:
			if row[2] == "Thousand TOE (tonnes of oil equivalent)":
				writer.writerow(row)

# for row in firstreader:
# 	if row[2] == "MUNICIPAL":
# 		firstwriter.writerow(row)


# energyreader = csv.reader(open('../data/totalenergy.csv'), delimiter=';')
# emissionreader = csv.reader(open('../data/totalemissions.csv'), delimiter=';')
# wastereader = csv.reader(open('../data/waste.csv'), delimiter=';')

# writer = csv.writer(open('../data/paralleldata.csv', 'w'))

# for row in energyreader:
# 	if row[2] == "Thousand TOE (tonnes of oil equivalent)":
# 		writer.writerow(row)

# for i, row in enumerate(emissionreader):
# 	if i % 3 == 0:
# 		writer.writerow(row)

# for row in wastereader:
# 	if row[2] == "MUNICIPAL":
# 		writer.writerow(row)