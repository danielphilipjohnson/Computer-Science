filepath = input("Enter a file name: ")
file = open(filepath)
#file = open("mbox-short.txt")
line = file.read()
print(line.upper())

file.close()

