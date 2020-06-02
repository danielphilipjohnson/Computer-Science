# Functions to manipulate global variable count

###################################################
# Student should enter function on the next lines.
# Reset global count to zero.
# Increment global count.
# Decrement global count.
# Print global count.

counter = 5

def reset():
    global counter 
    counter = 0
    
def increment():
    global counter 
    counter = counter + 1

def decrement():
    global counter 
    counter = counter - 1

def print_count():
    print(counter)

###################################################
# Test

# note that the GLOBAL count is defined inside a function
reset()		
increment()
print_count()
increment()
print_count()
reset()
decrement()
decrement()
print_count()

####################################################
# Output
#1
#2
#-2