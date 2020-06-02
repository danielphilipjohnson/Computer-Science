"""
Exercise 1: Change the socket program socket1.py to prompt the user
for the URL so it can read any web page. You can use split('/') to
break the URL into its component parts so you can extract the host
name for the socket connect call. Add error checking using try and
except to handle the condition where the user enters an improperly
formatted or non-existent URL.
"""

import socket
import re

mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


web_address = input('Enter - ')

if len(web_address) < 1 : web_address = 'http://data.pr4e.org/romeo.txt'

HOST = re.findall('^https?://(.+)/', web_address)

#print(HOST)

mysock.connect((HOST[0], 80))
GET_REQUEST= 'GET {} HTTP/1.0\r\n\r\n'.format(web_address)
cmd = GET_REQUEST.encode()


mysock.send(cmd)

while True:
    data = mysock.recv(512)
    if len(data) < 1:
        break
    print(data.decode(),end='')

mysock.close()