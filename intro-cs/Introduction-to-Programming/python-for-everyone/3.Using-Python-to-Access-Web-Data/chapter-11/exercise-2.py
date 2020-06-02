import re
fh = open("mbox.txt")

count = 0

for line in fh:
    x = re.findall('^New Revision: [0-9.]+', line)
    if len(x) > 0:
        count = count + 1
        print(x)


print("mbox.txt had {} lines that matched".format(count))