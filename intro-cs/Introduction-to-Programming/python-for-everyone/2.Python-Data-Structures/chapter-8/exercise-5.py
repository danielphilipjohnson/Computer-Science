fname = input("Enter file name: ")
if len(fname) < 1 : fname = "mbox-short.txt"

fh = open(fname)

count = 0

for line in fh:
    if "From " in line:
        # split the line into words
        words = line.split()
        # who sent the message
        # words = [0]From [1] stephen.marquard@uct.ac.za Sat Jan 5 09:14:16 2008
        message_sender = words[1]
        # print out the sender
        print(message_sender)
        # count the number of From
        count =  count + 1
print("There were {} lines in the file with From as the first word"
.format(count))
