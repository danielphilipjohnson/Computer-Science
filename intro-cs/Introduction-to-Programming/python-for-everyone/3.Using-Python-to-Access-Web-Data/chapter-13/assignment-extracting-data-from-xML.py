"""
In this assignment you will write a Python program somewhat similar to 
https://py4e.com/code3/geoxml.py. The program will prompt for a URL, read the 
XML data from that URL using urllib and then parse and extract the comment 
counts from the XML data, compute the sum of the numbers in the file and enter 
the sum,
"""


import urllib.request, urllib.parse, urllib.error
import xml.etree.ElementTree as ET
import ssl


# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

total = 0


address = input('Enter location: ')

if len(address) < 1: address = 'http://py4e-data.dr-chuck.net/comments_383951.xml'

print('Retrieving', address)
uh = urllib.request.urlopen(address, context=ctx)

data = uh.read()
print('Retrieved', len(data), 'characters')

tree = ET.fromstring(data)

comments = tree.findall('comments/comment')

for comment in comments:
    count  = comment.find('count').text
    total = total + int(count)

print("Count: ", len(comments))
print("Sum: ", total)
