list = [0, 1]
i = 40
while i > 0:
    list.append(list[-1] + list[-2])
    i -= 1
print(list.pop())