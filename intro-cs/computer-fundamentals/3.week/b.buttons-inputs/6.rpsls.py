# GUI-based version of RPSLS

###################################################
# Student should add code where relevant to the following.

import simplegui
import random

# Functions that compute RPSLS
def name_to_number(name):
    # delete the following pass statement and fill in your code below

    # convert name to number using if/elif/else
    # don't forget to return the result!
    if name == "rock":
        return 0
    elif name == "Spock":
        return 1
    elif name == "paper":
        return 2
    elif name == "lizard":
        return 3
    elif name == "scissors":
        return 4

# 2. build
def number_to_name(number):
    # delete the following pass statement and fill in your code below
    if number == 0:
        return "rock"
    elif number == 1:
        return "Spock"
    elif number == 2:
        return "paper"
    elif number == 3:
        return "lizard"
    elif number == 4:
        return "scissors"

    
    # convert number to a name using if/elif/else
    # don't forget to return the result!
    

def rpsls(player_choice): 
    # delete the following pass statement and fill in your code below
    
    # print a blank line to separate consecutive games
    print("\n")
    
    # print out the message for the player's choice
    print("Player Choose: " + player_choice)
    
    # convert the player's choice to player_number using the function name_to_number()
    player_number = name_to_number(player_choice)

    # compute random guess for comp_number using random.randrange()
    comp_number = random.randrange(0,5)

    # convert comp_number to comp_choice using the function number_to_name()
    comp_choice  =  number_to_name(comp_number)

    # print out the message for computer's choice
    print("Computer choose: " +  comp_choice)

    # compute difference of comp_number and player_number modulo five
    difference = (player_number - comp_number) % 5
    # use if/elif/else to determine winner, print winner message
    if player_number == comp_number:
        print("draw")
    elif(difference == 1) or (difference == 2):
        print("Player Wins")
    elif(difference == 3) or (difference == 4):
        print("Computer Wins")
     
    
# Handler for input field
def get_guess(guess):
     # validate input
    if not (guess == "rock" or guess == "Spock" or guess == "paper" or
            guess == "lizard" or guess == "scissors"):
        print()
        print('Error: Bad input "' + guess + '" to rpsls')
        return
    else:
        rpsls(guess)

# Create frame and assign callbacks to event handlers
frame = simplegui.create_frame("GUI-based RPSLS", 200, 200)
frame.add_input("Enter guess for RPSLS", get_guess, 200)


# Start the frame animation
frame.start()


###################################################
# Test

get_guess("Spock")
get_guess("dynamite")
get_guess("paper")
get_guess("lazer")

###################################################
# Sample expected output from test
# Note that computer's choices may vary from this sample.

#Player chose Spock
#Computer chose paper
#Computer wins!
#
#Error: Bad input "dynamite" to rpsls
#
#Player chose paper
#Computer chose scissors
#Computer wins!
#
#Error: Bad input "lazer" to rpsls
#
