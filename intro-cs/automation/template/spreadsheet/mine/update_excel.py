import csv
FILENAME = 'movies.csv'


with open(FILENAME, newline='') as file:
    data = [row for row in csv.DictReader(file)]
    data[1]['Year']
    data[1]['Year'] = '1977'

HEADER = data[0].keys()
with open(FILENAME, 'w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=HEADER)
    writer.writeheader()
    writer.writerows(data)


