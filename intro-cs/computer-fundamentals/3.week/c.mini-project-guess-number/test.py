# Testing template for "Guess the number"

###################################################
# Student should add code for "Guess the number" here


# template for "Guess the number" mini-project
# input will come from buttons and an input field
# all output for the game will be printed in the console
guesses_remaining = 0
print("New game. Range is [0,100)")




def range1000():
    # button that changes the range to [0,1000) and starts a new game     
    global secret_number
    global guesses_remaining
    
    guesses_remaining = num_of_guesses(0, 1000)
    secret_number = random.randrange(0,1000)
        
def range100():
    # button that changes the range to [0,100) and starts a new game 
    global secret_number
    global guesses_remaining
    
    guesses_remaining = num_of_guesses(0, 100)
    secret_number = random.randrange(0,100)





def num_of_guesses(low, high):
    amount_of_guesses = 0
    while True:
        f = 2 ** amount_of_guesses >= high - low+1
        if(not f):
            amount_of_guesses = amount_of_guesses + 1
        else:
            break
    return amount_of_guesses
    
def input_guess(guess):
    # main game logic goes here	
    global guesses_remaining
    global secret_number

    guess_int = int(guess)

    
    print "Guess was " + str(guess_int)
    
    guesses_remaining = guesses_remaining - 1
    print "Number of remaining guesses is " +  str(guesses_remaining)
    
    # Case user has enough guesses left
    if guesses_remaining > 0:
        # Correct Case
        if guess_int == secret_number:
                print "Correct!\n"
                
        # Case: user guessed too high indicate go lower
        elif guess_int > secret_number:
                print "Lower!\n"

        # Case: user guessed too low indicate go higher
        elif guess_int < secret_number:
                print "Higher!\n"
                
    else:
        if guess_int == secret_number:
                print "Correct!\n"         
        else:
            print "You ran out of guesses.  The number was " + str(secret_number)

        
guesses_remaining = num_of_guesses(0, 100)

import simplegui
import random
import math




###################################################
# Start our test #1 - assume global variable secret_number
# is the the "secret number" - change name if necessary


#secret_number = 74	
#input_guess("50")
#input_guess("75")
#input_guess("62")
#input_guess("68")
#input_guess("71")
#input_guess("73")
#input_guess("74")

###################################################
# Output from test #1
#New game. Range is [0,100)
#Number of remaining guesses is 7
#
#Guess was 50
#Number of remaining guesses is 6
#Higher!
#
#Guess was 75
#Number of remaining guesses is 5
#Lower!
#
#Guess was 62
#Number of remaining guesses is 4
#Higher!
#
#Guess was 68
#Number of remaining guesses is 3
#Higher!
#
#Guess was 71
#Number of remaining guesses is 2
#Higher!
#
#Guess was 73
#Number of remaining guesses is 1
#Higher!
#
#Guess was 74
#Number of remaining guesses is 0
#Correct!
#
#New game. Range is [0,100)
#Number of remaining guesses is 7

###################################################
# Start our test #2 - assume global variable secret_number
# is the the "secret number" - change name if necessary

#range1000()
#secret_number = 375	
#input_guess("500")
#input_guess("250")
#input_guess("375")

###################################################
# Output from test #2
#New game. Range is [0,100)
#Number of remaining guesses is 7
#
#New game. Range is [0,1000)
#Number of remaining guesses is 10
#
#Guess was 500
#Number of remaining guesses is 9
#Lower!
#
#Guess was 250
#Number of remaining guesses is 8
#Higher!
#
#Guess was 375
#Number of remaining guesses is 7
#Correct!
#
#New game. Range is [0,1000)
#Number of remaining guesses is 10



###################################################
# Start our test #3 - assume global variable secret_number
# is the the "secret number" - change name if necessary

range100()
secret_number = 28	
input_guess("50")
input_guess("50")
input_guess("50")
input_guess("50")
input_guess("50")
input_guess("50")
input_guess("50")

###################################################
# Output from test #3
#New game. Range is [0,100)
#Number of remaining guesses is 7
#
#Guess was 50
#Number of remaining guesses is 6
#Lower!
#
#Guess was 50
#Number of remaining guesses is 5
#Lower!
#
#Guess was 50
#Number of remaining guesses is 4
#Lower!
#
#Guess was 50
#Number of remaining guesses is 3
#Lower!
#
#Guess was 50
#Number of remaining guesses is 2
#Lower!
#
#Guess was 50
#Number of remaining guesses is 1
#Lower!
#
#Guess was 50
#Number of remaining guesses is 0
#You ran out of guesses.  The number was 28
#
#New game. Range is [0,100)
#Number of remaining guesses is 7
