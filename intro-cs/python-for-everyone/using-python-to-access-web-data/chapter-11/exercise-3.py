import re
fh = open("mbox.txt")

count = 0
total = 0
wh = open("avg.txt", 'w')

for line in fh:
    x = re.findall('^New Revision: ([0-9.]+)', line)
    if len(x) > 0:
        count = count + 1
        total =  total + int(x[0]) 
        wh.write(str(total) + "\n")

avg = total // count

print("AVG: {}".format(avg))
