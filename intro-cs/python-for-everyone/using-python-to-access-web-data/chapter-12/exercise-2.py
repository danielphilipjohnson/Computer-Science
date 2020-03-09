"""
Exercise 2: Change your socket program so that it counts the number
of characters it has received and stops displaying any text after it has
shown 3000 characters. The program should retrieve the entire docu-
ment and count the total number of characters and display the count
of the number of characters at the end of the document.
"""
import socket
import re


web_address = input('Enter - ')

if len(web_address) < 1 : web_address = 'http://data.pr4e.org/mbox.txt'

mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


HOST = re.findall('^https?://(.+)/', web_address)

mysock.connect((HOST[0], 80))
GET_REQUEST= 'GET {} HTTP/1.0\r\n\r\n'.format(web_address)
cmd = GET_REQUEST.encode()
mysock.send(cmd)

character_len = 0 

while True:
    data = mysock.recv(512)
    if len(data) < 1:
        break
    for line in data.decode():
        character_len= character_len + 1
        if character_len <= 3000:
            print(line,end='')
        elif character_len > 3000 and character_len <3002:
            print('\n[......]')


print("Count length", character_len)
mysock.close()
