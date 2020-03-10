import re


reg_express = input('Enter a regular expression: ')


fh = open("mbox.txt")

count = 0

for line in fh:
    x = re.findall('^Author.+', line)
    if len(x) > 0:
        count = count + 1


print("mbox.txt had {} lines that matched {}".format(count, reg_express))