"""
Exercise 5: (Advanced) Change the socket program so that it only shows
data after the headers and a blank line have been received. Remember
that recv receives characters (newlines and all), not lines.
"""

import socket
import re

web_address = input('Enter - ')

if len(web_address) < 1 : web_address = 'http://data.pr4e.org/romeo.txt'

HOST = re.findall('^https?://(.+)/', web_address)

mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

mysock.connect((HOST[0], 80))

GET_REQUEST= 'GET {} HTTP/1.0\r\n\r\n'.format(web_address)
cmd = GET_REQUEST.encode()

mysock.send(cmd)

text = b""

while True:
    data = mysock.recv(512)
    if len(data) < 1:
        break
    text = text + data
  
mysock.close()


# Look for the end of the header (2 CRLF)
pos = text.find(b"\r\n\r\n")
#print(text[:pos].decode())
text = text[pos+4:].decode()
print(text)