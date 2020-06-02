"""
In this assignment you will write a Python program 
that expands on http://www.py4e.com/code3/urllinks.py. 
The program will use urllib to read the HTML from 
the data files below, extract the href= vaues 
from the anchor tags, scan for a tag that is in a 
particular position relative to the first name in the 
list, follow that link and repeat the process a number 
of times and report the last name you find. 
"""

import urllib.request, urllib.parse, urllib.error
from bs4 import BeautifulSoup
import ssl

# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = input('Enter URL: ')
count = input('Enter count: ')
position = input('Enter position: ')

if len(url) < 1 : url = 'http://py4e-data.dr-chuck.net/known_by_Colvin.html'
if len(count) < 1 : count = 7
if len(position) < 1 : position = 18

html = urllib.request.urlopen(url, context=ctx).read()
soup = BeautifulSoup(html, 'html.parser')

tags = soup('a')

# Retrieve all of the anchor tags
for i in range(int(count)):
    url = tags[int(position-1)].get('href', None)
    print(url)
    html = urllib.request.urlopen(url, context=ctx).read()
    soup = BeautifulSoup(html, 'html.parser')
    tags = soup('a')
 
