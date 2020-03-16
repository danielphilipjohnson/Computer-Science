"""
In this assignment you will write a Python program similar to 
http://www.py4e.com/code3/urllink2.py. The program will use urllib to read 
the HTML from the data files below, and parse the data, extracting numbers 
and compute the sum of the numbers in the file. 
"""



from urllib.request import urlopen
from bs4 import BeautifulSoup
import ssl

# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE


url = input('Enter - ')
if len(url) < 1: url = 'http://py4e-data.dr-chuck.net/comments_383949.html'
html = urlopen(url, context=ctx).read()
soup = BeautifulSoup(html, "html.parser")

total = 0

# Retrieve all of the span tags
tags = soup('span')
for tag in tags:

    total = total + int(tag.contents[0])
    #print('Attrs:', tag.attrs)

print("Count", len(tags))
print("Sum", total)
