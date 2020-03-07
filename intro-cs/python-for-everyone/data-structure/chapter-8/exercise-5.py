#filepath = input("Enter a file name: ")
#file = open(filepath)
file = open("mbox-short.txt")

words_found =[]

count_of_from = 0

for line in file:
    # ﬁnd line that starts with “From”
    #print(line.startswith(line))
    if "From " in line:
        # split the line into words
        words = line.split()
        # who sent the message
        # words = [0]From [1] stephen.marquard@uct.ac.za Sat Jan 5 09:14:16 2008
        message_sender = words[1]
        # print out the sender
        print(message_sender)
        # count the number of From
        count_of_from =  count_of_from + 1
  
print("There were {} lines in the file with From as the first word"
.format(count_of_from ))
