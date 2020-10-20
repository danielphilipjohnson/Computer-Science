n = 100
numbers = range(2, n)
results = []

while numbers != []:
    results.append(numbers[0])
    numbers = [n for n in numbers if n % numbers[0] != 0]

# print(len(results))

print(range(2, 16, 3))
print(range(15, 2, -3))
print(range(2, 18, 3))

## 168