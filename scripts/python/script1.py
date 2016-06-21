# Julia Jansen
# python script
# project

import csv

'''
This script reformats data from csv file
into a useful json file that contains country, 
'''

# transform file to municipal waste only
with open ('../data/totalemissions.csv', 'r') as infile:
	reader = csv.reader(infile, delimiter=';')
	with open('../data/totaleemissie.csv', 'wb') as outfile:
		writer = csv.writer(outfile)
		for i, row in enumerate(reader):
			if i % 3 == 0:
				writer.writerow(row)
