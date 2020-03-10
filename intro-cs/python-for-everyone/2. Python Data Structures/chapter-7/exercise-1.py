fname = input("Enter file name: ")
fh = open(fname)
line = fh.read()
print(line.upper().strip())

fh.close()
