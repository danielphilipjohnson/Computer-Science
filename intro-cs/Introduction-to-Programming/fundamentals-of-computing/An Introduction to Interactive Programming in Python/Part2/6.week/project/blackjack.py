# Mini-project #6 - Blackjack

import simplegui
import random

# load card sprite - 936x384 - source: jfitz.com
CARD_SIZE = (72, 96)
CARD_CENTER = (36, 48)
card_images = simplegui.load_image("http://storage.googleapis.com/codeskulptor-assets/cards_jfitz.png")

CARD_BACK_SIZE = (72, 96)
CARD_BACK_CENTER = (36, 48)
card_back = simplegui.load_image("http://storage.googleapis.com/codeskulptor-assets/card_jfitz_back.png")    

# initialize some useful global variables
in_play = False
outcome = ""
score = 0

# define globals for cards
SUITS = ('C', 'S', 'H', 'D')
RANKS = ('A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K')
VALUES = {'A':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, 'T':10, 'J':10, 'Q':10, 'K':10}


# define card class
class Card:
    def __init__(self, suit, rank):
        if (suit in SUITS) and (rank in RANKS):
            self.suit = suit
            self.rank = rank
        else:
            self.suit = None
            self.rank = None
            print "Invalid card: ", suit, rank

    def __str__(self):
        return self.suit + self.rank

    def get_suit(self):
        return self.suit

    def get_rank(self):
        return self.rank

    def draw(self, canvas, pos):
        card_loc = (CARD_CENTER[0] + CARD_SIZE[0] * RANKS.index(self.rank), 
                    CARD_CENTER[1] + CARD_SIZE[1] * SUITS.index(self.suit))
        canvas.draw_image(card_images, card_loc, CARD_SIZE, [pos[0] + CARD_CENTER[0], pos[1] + CARD_CENTER[1]], CARD_SIZE)
        
# define hand class
class Hand:
    def __init__(self):
        self.cards = []
        self.current_result = ""

    def __str__(self):
        self.current_result = ""
        for card in self.cards:
            self.current_result += " " + card.__str__()
        return "Hand contains" + self.current_result

        # return a string representation of a hand

    def add_card(self, card):
        self.cards.append(card)  # add a card object to a hand
    
    # Convert to lambda
    def _is_rank_ace(self, rank):
        if rank == 'A':
            return True
        else:
            return False

        
    def get_value(self):
        # count aces as 1, if the hand has an ace, then add 10 to hand value if it doesn't bust
        value = 0
        
        contains_ace = False
        
        for card in self.cards:
            
            rank = card.get_rank()
            
            value += VALUES[rank]
            
            contains_ace = self._is_rank_ace(rank)
            
        if(value < 11 and contains_ace):
            value += 10
        
        return value  # compute the value of the hand, see Blackjack video
   
    def draw(self, canvas, pos):
        """ draw a hand on the canvas, use the draw method for cards """
        for card in self.cards:
            card.draw(canvas, pos)
            pos[0] += 80
 
        
# define deck class 
class Deck:
    def __init__(self):
        """ Create a Deck object 
            Creates an array of Card with suits and Ranks
        """
        self.cards = [Card(suit, rank)for suit in SUITS for rank in RANKS]
        self.display_deck = ""

    def shuffle(self):
        """ Shuffle the deck """
        random.shuffle(self.cards)

    def deal_card(self):
        """ Deal a card object from the deck """
        return self.cards.pop(0)
    
    def __str__(self):
        """ return a string representing the deck """
        for card in self.cards:
            self.display_deck += " " + card.__str__()
        return self.display_deck
    
    
def deal():
    """ Logic follows two paths
        If player hits deal when in a game
            1. Display player lost the round 
            2. Update the score appropriately
            3. Set inplay to False
        
        else 
            1. Create a deck
            2. Shuffle the deck
            3. 
                a. Make a players hand
                b. Make a dealers hand
            4. Loop twice and add cards to players hand and dealers hand
            5. Display, Players and Dealers hand
            6. Set game into play
    """
    global outcome, in_play, score, deck, player_hand, dealer_hand, game_ended

    game_ended = False
    
    if(in_play == True):
        
        outcome = "Player loses because of re dealing! New deal?"
        score -= 1
        in_play = False
        
    else:
        # create a deck and shuffle it
        deck = Deck()
        deck.shuffle()
    
        # make player and dealer hand
        player_hand = Hand()
        dealer_hand = Hand()
    
        # deal two cards to each the player and dealer
        for i in range(2):
            player_hand.add_card(deck.deal_card())
            dealer_hand.add_card(deck.deal_card())
    
        print "Player: %s" % player_hand
        print "Dealer: %s" % dealer_hand
        
        in_play = True

def hit():
    """ 
    Check the button can be hit:
    
    LOGIC: Game is in play and the game hasn't ended
    
    Follow Two Logical Paths
    
    1. If the players hand is less than 21 
        a. Add another card to the deck
        b. Print players new hand value
    2. If players hand is over 21 
        a. Display bust
        b. Detract score
        c. Game is over so set in_play to False
        d. Set game ended to True
   
    """
    global outcome, in_play, game_ended, score

 
    # if the hand is in play, hit the player
    if in_play and not game_ended:
        if player_hand.get_value() <= 21:      
            player_hand.add_card(deck.deal_card())
            print "Player: %s" % player_hand.get_value()
    
        # if busted, assign a message to outcome, update in_play and score
        if player_hand.get_value() > 21:
            outcome = "Bust. Deal new cards?"
            score -= 1
            in_play = False
            game_ended = True   
               
def stand():
    """ If the game hasn't ended 
        LOOP:
            while the dealer hand is less than 17
            Add a card to the dealers hand
        Print the dealers hand value
        2. Check if the dealers hand is greater than 21
            a. add message dealer bust
            b. Increment player score
            c. Game ended is true
        3.If dealers value less than or equal to 21
            a. Compare if dealers hand is greater than players hand
                i. Add Dealer wins 
                ii. Decrement players score
                iii. Game ended is now true
            b. if players hand is greater than dealer 
                i. Add Player wins
                ii. Increment Players score
                iii. Game ended is now true
    """
    global outcome, score, in_play, game_ended
    
    in_play = False
    
    if not game_ended:
        while dealer_hand.get_value() < 17:
            dealer_hand.add_card(deck.deal_card())
 
        print "Dealer: %s" % dealer_hand.get_value()
    
        if dealer_hand.get_value() > 21:
            
            outcome = "Dealer busts. Player wins.!"
            score += 1
            game_ended = True
        
        else:
            if dealer_hand.get_value() >= player_hand.get_value() or player_hand.get_value() > 21:
                outcome = "Dealer wins. Deal new cards?"
                score -= 1
                game_ended = True
            
            else:
                outcome = "Player wins. Deal new cards"
                score += 1
                game_ended = True

# draw handler    
def draw(canvas):
    """ 
        Add a title BlackJack
        Draw players hand and draw to canvas
        Draw dealers card and draw to canvas
    """
    # test to make sure that card.draw works, replace with your code below
    global outcome, in_play, score
    
    canvas.draw_text("Blackjack", [220, 50], 50 ,"Black")  
 
    player_hand.draw(canvas, [100, 300])
    dealer_hand.draw(canvas, [100, 150])
    
    canvas.draw_text(outcome, [70, 130], 30 ,"black")
    
    canvas.draw_text("Player score: %s" % score, [250, 90], 20 ,"Black")
 
    if in_play:
        canvas.draw_image(card_back, CARD_BACK_CENTER, CARD_BACK_SIZE, (136,199), CARD_BACK_SIZE)

        
# initialization frame
frame = simplegui.create_frame("Blackjack", 600, 600)
frame.set_canvas_background("Green")

#create buttons and canvas callback
frame.add_button("Deal", deal, 200)
frame.add_button("Hit",  hit, 200)
frame.add_button("Stand", stand, 200)
frame.set_draw_handler(draw)


# get things rolling
deal()
frame.start()


# remember to review the gradic rubric