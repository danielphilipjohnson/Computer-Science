"""
Exercise 3: Use urllib to replicate the previous exercise of (1) retrieving
the document from a URL, (2) displaying up to 3000 characters, and
(3) counting the overall number of characters in the document. Don’t
worry about the headers for this exercise, simply show the first 3000
characters of the document contents.
"""

import re

import urllib.request, urllib.parse, urllib.error

web_address = input('Enter - ')

if len(web_address) < 1 : web_address = 'http://data.pr4e.org/mbox.txt'

ADDRESS = re.findall('^https?://.+', web_address)

print(ADDRESS)

count = 0

response = urllib.request.urlopen(ADDRESS[0])

#with urllib.request.urlopen(ADDRESS[0]) as f:
#    print(f.read(3000).decode('utf-8'))
#    

for line in response:
    for letter in line:
        if count <= 3000:
            print(chr(letter), end="")
        count = count + 1

print("Count length", count)