# GUI with buttons to manipulate global variable count

###################################################
# Student should enter their code below


import simplegui

# Define event handlers for four buttons
counter = 0

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


    
# Create frame and assign callbacks to event handlers
frame = simplegui.create_frame('Global Variables', 200, 400)
frame.add_button("Reset", reset)
frame.add_button("Increment", increment)
frame.add_button("Decrement", decrement)
frame.add_button("Print count", print_count)
    
    


# Start the frame animation
frame.start()

    
###################################################
# Test

# Note that the GLOBAL count is defined inside a function
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
# Expected output from test

#1
#2
#-2
