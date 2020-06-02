import socket
import time

HOST = 'data.pr4e.org'
PORT = 80

mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mysock.connect((HOST, PORT))
mysock.sendall(b'GET http://data.pr4e.org/cover3.jpg HTTP/1.0\r\n\r\n')

count = 0
picture = b""

download_txt = open("socketinfo/downloadrates.txt", "w")
download_txt.write("Data  Count \n")

while True:
    data = mysock.recv(5120)
    if len(data) < 1: break

    time.sleep(0.25)

    count = count + len(data)

    print(len(data), count)

    download_txt.write("{} {} \n".format(len(data), count))

    picture = picture + data

mysock.close()
download_txt.close()

# Look for the end of the header (2 CRLF)
pos = picture.find(b"\r\n\r\n")
print('Header length', pos)
print(picture[:pos].decode())

header = open("socketinfo/header.txt", 'w')
header.write(picture[:pos].decode())

# Skip past the header and save the picture data
picture = picture[pos+4:]
print(picture)

pic_txt = open("socketinfo/picture.txt", 'w')
pic_txt.write(str(picture))
pic_txt.close()

fhand = open("stuff.jpg", "wb")
fhand.write(picture)
fhand.close()