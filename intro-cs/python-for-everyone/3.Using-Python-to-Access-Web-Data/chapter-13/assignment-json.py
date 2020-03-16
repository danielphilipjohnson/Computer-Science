"""
The program will prompt for a URL, read the JSON data from that URL using 
urllib and then parse and extract the comment counts from the JSON data, 
compute the sum of the numbers in the file.
"""


import json
import urllib.request, urllib.parse, urllib.error
import ssl

# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE



url = input('Enter URL: ')
if len(url) < 1 : url = 'http://py4e-data.dr-chuck.net/comments_383952.json'

total= 0
print('Retrieving', url)

json_data = urllib.request.urlopen(url, context=ctx).read()
print('Retrieved', len(json_data), 'characters')


info = json.loads(json_data)
comments = info['comments']

for comment in comments:
    count = int(comment['count'])
    total = total + count

print('Count:', len(comments))
print("Sum: ", total)
