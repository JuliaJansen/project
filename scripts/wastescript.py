# Julia Jansen
# project

import csv

'''
This script reformats data to a useful csv with year, country, value
'''

# open infile
with open('../data/WSECTOR_02062016152910695.csv', 'r') as infile:
	reader = csv.reader(infile, delimiter=',')

	with open('../data/wastesectordata.csv', 'wb') as outfile:
		writer = csv.writer(outfile)

		# read and write
		for row in reader:
			if len(row) > 2:
				if row[3] == "Agriculture forestry and fishing " or row[3] == "Mining and Quarrying" or row[3] == "Manufacturing industries: Total" or row[3] == "Energy Production " or row[3] == "Water supply sewerage waste management " or row[3] == "Construction" or row[3] == "Other":
					print row[4], row[1], row[3], row[12]
					writer.writerow([row[4], row[1], row[3], row[12]])

				