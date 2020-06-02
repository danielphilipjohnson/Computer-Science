# hour
name = input("Enter file:")
if len(name) < 1 : name = "mbox-short.txt"


fh = open(name)

distribution_of_hours = {}

for line in fh:
    # ﬁnd line that starts with “From”
    if line.startswith("From "):
        # split the line into words
        words = line.split()
        #  ﬁnding the time string
        # words = [0]From [1] stephen.marquard@uct.ac.za [2]Sat [3]Jan [4]5 09:14:16 2008
        hour = words[5].split(":")[0]
        if hour not in distribution_of_hours:
            distribution_of_hours[hour]= 1
        else:
            distribution_of_hours[hour] = distribution_of_hours[hour] + 1
  # print out the sender
 
t = list(distribution_of_hours.items())

t.sort()
for item in t:
    print(item[0], item[1])