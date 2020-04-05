# Echo an input field

###################################################
# Student should add code where relevant to the following.

import simplegui 

# Handlers for input field
def get_input(text_input):
    print(text_input)
    
# Create frame and assign callbacks to event handlers
frame = simplegui.create_frame("Echo input", 200, 200)
inp = frame.add_input('My label', get_input, 50)

# Start the frame animation
frame.start()


###################################################
# Test

get_input("First test input")
get_input("Second test input")
get_input("Third test input")

###################################################
# Expected output from test

#First test input
#Second test input
#Third test input
