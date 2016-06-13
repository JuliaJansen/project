# Julia Jansen
# project

import csv

'''
This script reformats data to a useful csv with year, country, value
'''

# open infile
with open('../data/emissionindustriesdata.csv', 'r') as infile:
	reader = csv.reader(infile, delimiter=',')

	with open('../data/emission_industries_data.csv', 'wb') as outfile:
		writer = csv.writer(outfile)

		i = 0
		writer.writerow(["TIME", "GEO", "Agriculture", "Mining", "Manufacturing", "Electricity_Gas_Steam", "Water_management", "Transportation_Storage", "Accomodation_Food", "Information_Communication", "Financial_Insurance", "RealEstate", "Professional_Scientific_Technical", "Administration_Defence_SocialSecurity", "Education", "Health_SocialWork", "Arts_Entertainment", "OtherService", "Households_Employers", "Extraterritorial_Org"])
		# read and write
		for row in reader:
			i += 1
			if row[2] == "Total - All NACE activities":
				i = 0
			if row[2] == "Agriculture_ forestry and fishing":
				v1 = row[3]
			if row[2] == "Mining and quarrying":
				v2 = row[3]
			if row[2] == "Manufacturing":
				v3 = row[3] 
			if row[2] == "Electricity_ gas_ steam and air conditioning supply":
				v4 = row[3]
			if row[2] == "Water supply_ sewerage_ waste management and remediation activities":
				v5 = row[3]
			if row[2] == "Wholesale and retail trade_ repair of motor vehicles and motorcycles":
				v6 = row[3]
			if row[2] == "Transportation and storage":
				v7 = row[3]
			if row[2] == "Accommodation and food service activities":
				v8 = row[3]
			if row[2] == "Information and communication":
				v9 = row[3]
			if row[2] == "Financial and insurance activities":
				v10 = row[3]
			if row[2] == "Real estate activities":
				v11 = row[3]
			if row[2] == "Professional_ scientific and technical activities":
				v12 = row[3]
			if row[2] == "Administrative and support service activities":
				v13 = row[3]
			if row[2] == "Public administration and defence_ compulsory social security":
				v14 = row[3]
			if row[2] == "Education":
				v15 = row[3]
			if row[2] == "Human health and social work activities":
				v16 = row[3]
			if row[2] == "Arts_ entertainment and recreation":
				v17 = row[3]
			if row[2] == "Other service activities":
				v18 = row[3]
			if row[2] == "Activities of households as employers_ undifferentiated goods- and services-producing activities of households for own use":
				v19 = row[3]
			if row[2] == "Activities of extraterritorial organisations and bodies":
				v20 = row[3]

			if i == 20:
				writer.writerow([row[0], row[1], v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20])
