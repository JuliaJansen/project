# Julia Jansen
# project

import csv

'''
This script reformats data to a useful csv with year, country, value
'''

# open infile
with open('../data/emissions_what_industries.csv', 'r') as infile:
	reader = csv.reader(infile, delimiter=',')

	# open outfile
	with open('../data/emissionindustriesdata.csv', 'wb') as outfile:
		writer = csv.writer(outfile)
	
		# read and write
		for i, row in enumerate(reader):
			if i == 0:
				writer.writerow(['TIME', 'GEO', 'INDUSTRY', 'EMISSION'])
			else:
				if row[2] == "Carbon dioxide":
					writer.writerow([row[0], row[1], row[3], row[5]])

