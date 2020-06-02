# Prime number lists

###################################################
# Student should enter code below
start = 1
end = 13

prime_list = []

for val in range(start, end + 1): 
      
   # If num is divisible by any number   
   # between 2 and val, it is not prime  
   if val > 1: 
       for n in range(2, val): 
           if (val % n) == 0: 
               break
       else: 
           prime_list.append(val)

print(prime_list[1], prime_list[3], prime_list[5])
###################################################
# Expected output

#3 7 13

