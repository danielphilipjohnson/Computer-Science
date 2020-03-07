#filepath = input("Enter a file name: ")
#file = open(filepath)
file = open("mbox-short.txt")
day_histogram = {}

for line in file:
 # ﬁnd line that starts with “From”
 if "From " in line:
   # split the line into words
  words = line.split(" ")
  # words = [0]From [1] stephen.marquard@uct.ac.za [2] Sat Jan 5 09:14:16 2008
  message_day = words[2]
  if message_day not in day_histogram:
      day_histogram[message_day] = 1
  else:
      day_histogram[message_day] = day_histogram[message_day] + 1
# print out the sender
print(day_histogram)

