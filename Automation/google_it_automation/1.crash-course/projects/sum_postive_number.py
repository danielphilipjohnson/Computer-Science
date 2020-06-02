def sum_positive_numbers(n):
  if n == 0:
    return 0
    
  else:
    return n + sum_positive_numbers(n-1)


print(sum_positive_numbers(3)) # Should be 6
print(sum_positive_numbers(5)) # Should be 15