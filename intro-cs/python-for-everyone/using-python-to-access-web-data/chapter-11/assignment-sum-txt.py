"""
In this assignment you will read through and parse a file 
with text and numbers. You will extract all the numbers in the 
file and compute the sum of the numbers.
"""

import re
values = []
total = 0
with open('regex_sum_383947.txt') as f:
    for line in f:
        numbers = re.findall('[0-9]+',line)
        if len(numbers) > 0:
            for num in numbers:
                total = total + int(num)
                values.append(int(num))
            # convert to int
            # sum

print("Sum: ", total)

