# template for "Guess the number" mini-project
# input will come from buttons and an input field
# all output for the game will be printed in the console
import simplegui
import random 
import math

# GLOBALS
secret_number = 0
guesses_remaining = 0
game_range = 0

# helper function to start and restart the game
def new_game():
    # initialize global variables used in your code here
    
    global secret_number
    global guesses_remaining
    global game_range
    
    game_range = 100
    guesses_remaining = num_of_guesses(100)
    secret_number = random.randrange(0,100)
    
    print "New game. Range is from [0 to 100)"
    print_num_guesses()

def print_num_guesses():
    print "Number of remaining guesses is " +  str(guesses_remaining) + "\n"
    
# define event handlers for control panel
def range100():
    """ button that changes the range to [0,100) and starts a new game """
    
    # GLOBAL
    global secret_number
    global guesses_remaining
    global game_range
    
    game_range = 100
    
    
    guesses_remaining = num_of_guesses(100)
    
    secret_number = random.randrange(0,100)
    
    print "New game. Range is from [0 to 100)"
    
    print_num_guesses()


def range1000():
    """ button that changes the range to [0,1000) and starts a new game """
    # GLOBAL
    global secret_number
    global guesses_remaining
    global game_range
    
    
    game_range = 1000
    
    guesses_remaining = num_of_guesses(1000)
    
    secret_number = random.randrange(0,1000)
    
    print "New game. Range is from [0 to 1000)"
    
    print_num_guesses()   
    

def num_of_guesses(range):
        
    rem_guess = int(math.ceil(math.log(range, 2)))
    
    return rem_guess

    
def input_guess(guess):
    # main game logic goes here	
    global guesses_remaining
    global secret_number
    global game_range
    
    
    guess_int = int(guess)

    # Case user has enough guesses left
    if guesses_remaining > 1:
        
        print "Guess was " + str(guess_int)
    
        guesses_remaining = guesses_remaining - 1
    
        print "Number of remaining guesses is " +  str(guesses_remaining)
        
        # Correct Case
        if guess_int == secret_number:
            
        	print "Correct!\n"
                
        # Case: user guessed too high indicate go lower
        elif guess_int > secret_number:
            
        	print "Lower!\n"

        # Case: user guessed too low indicate go higher
        elif guess_int < secret_number:
            
        	print "Higher!\n"
                
    elif guesses_remaining > 0:

        if guess_int == secret_number:
        	print "Correct!\n"
                
        else:
            
            guesses_remaining = guesses_remaining - 1
            
            print "Guess was " + str(guess_int)
            
            print "Number of remaining guesses is " +  str(guesses_remaining)
            
            print "You ran out of guesses.  The number was " + str(secret_number) + "\n"
            
    else:
        if game_range == 100:
            range100()
        elif game_range == 1000:
            range1000()
            

        
    
# 1. create frame
frame = simplegui.create_frame('Testing', 400, 400)
# 2. register event handlers for control elements and start frame
frame.start()
inp = frame.add_input('My label', input_guess, 50)
frame.add_button('Range is [0,100)', range100)
frame.add_button('Range is [0,1000)', range1000)
# call new_game 
new_game()


# always remember to check your completed program against the grading rubric
