import csv


HEADER = ('Admissions', 'Name', 'Year')
DATA = [
(225.7, 'Gone With the Wind', 1939),
(194.4, 'Star Wars', 1977),
(161.0, 'ET: The Extra-Terrestrial', 1982)
]


with open('movies.csv', 'w', newline='') as csvfile:
    movies = csv.writer(csvfile)
    movies.writerow(HEADER)
    for row in DATA:
        movies.writerow(row)
