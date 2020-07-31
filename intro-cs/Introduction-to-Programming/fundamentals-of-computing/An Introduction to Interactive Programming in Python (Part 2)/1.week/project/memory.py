# implementation of card game - Memory
# Daniel Philip Johnson
import simplegui
import random

CANVAS_WIDTH = 800
CANVAS_HEIGHT = 100
amount_of_cards_to_matches = 8

amount_of_cards_after_paired = amount_of_cards_to_matches * 2

tile_width = CANVAS_WIDTH / amount_of_cards_after_paired


# confusing variables
def _make_deck(value_range, amount_to_match):
    """  """
    deck= [i for i in range(1, value_range+1)] * amount_to_match
    random.shuffle(deck)
    return deck
    
def __create_exposed(value_range, amount_to_match):
    is_card_exposed = [False for i in range(1, value_range+1)] * amount_to_match 
    return is_card_exposed


# helper function to initialize globals
def new_game():
    global deck, cards_exposed, state, n_turns, card1, card2
    
    state, n_turns = 0, 0
    card1_loc, card2_loc = -1, -1
    label.set_text("Turns = " + str(n_turns))
    deck = _make_deck(amount_of_cards_to_matches, 2)
    cards_exposed = __create_exposed(amount_of_cards_to_matches, 2)
     
        
# define event handlers
def mouseclick(pos):
    global state, n_turns, deck, card1_loc, card2_loc
    # add game state logic here
  
    # pos[0] = x coord
    calculated_index = pos[0] // tile_width
    
    # check if this card is exposed
    if not cards_exposed[calculated_index]:
        
        if state == 0:
            # expose the card
            cards_exposed[calculated_index] = True
            # store its location
            card1_loc = calculated_index
            # advance state
            state = 1
            
        elif(state == 1):
            # increase turns 
            n_turns += 1
            # expose the card
            cards_exposed[calculated_index] = True
            # store its location
            card2_loc = calculated_index
            
            # advance state
            state = 2
            # set label 
            label.set_text("Turns = " + str(n_turns))
        else:
            # not a match
            if deck[card1_loc] != deck[card2_loc]:
                # hide cards
                cards_exposed[card1_loc], cards_exposed[card2_loc] = False, False 
                # reset locations
                card1_loc, card2_loc = -1, -1
                
            card1_loc = calculated_index
            cards_exposed[calculated_index] = True
            
            state = 1
    

def __draw_card(canvas, i, background_color):
    """ Helper function to draw card 
        Takes the tile width and multiples by current tile for example
        canvas width 800 / 16 cards = 50 tile width
        i = 1 * tile width 50
        loop for 16 cards
        |  50 | 100 | 150 | .... | 800 |
        
    """
    card_point_list = [i*tile_width, 0],[(i+1)*tile_width, 0],[(i+1) *tile_width, CANVAS_HEIGHT],[i*tile_width, CANVAS_HEIGHT]
    canvas.draw_polygon(card_point_list, 1, "Black", background_color)
    
    
    
def draw_card_exposed(canvas, deck_value, i):
    """   Draws a card and then draws the value to the card 
          The way the value is drawn is by the following. 
          The width: 
                    Take the tile width and push it away by 12
          The  Height:
                    Take the canvas height subject 48 to center
    """
    
    __draw_card(canvas, i, "White")
    
    card_value = str(deck_value)
    
    value_points = (i*tile_width+12, CANVAS_HEIGHT - 48)
    value_font_size = 25

    canvas.draw_text(card_value, value_points, value_font_size, "Black")

def draw_card_hidden(canvas, i):

    __draw_card(canvas, i, "Green")
    

def draw(canvas):
    """ cards are logically 50x100 pixels in size   """
    global deck
    
    for i in range(amount_of_cards_after_paired):
        if cards_exposed[i]:
            draw_card_exposed(canvas, deck[i], i)
        else:
            draw_card_hidden(canvas, i)

# create frame and add a button and labels
frame = simplegui.create_frame("Memory", CANVAS_WIDTH, CANVAS_HEIGHT)
frame.add_button("Reset", new_game)
label = frame.add_label("Turns = 0")

# register event handlers
frame.set_mouseclick_handler(mouseclick)
frame.set_draw_handler(draw)

# get things rolling
new_game()
frame.start()


# Always remember to review the grading rubric
