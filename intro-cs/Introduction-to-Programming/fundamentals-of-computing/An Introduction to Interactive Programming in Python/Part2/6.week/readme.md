Phase one

    Download the program template for this mini-project and review the class definition for the \color{red}{\verb|Card|} class. This class is already implemented so your task is to familiarize yourself with the code. Start by pasting the \color{red}{\verb|Card|} class definition into the provided testing template and verifying that our implementation works as expected.

    Implement the methods __init__, __str__,  add_card for the Hand class. We suggest modeling a hand as a list of Card objects that are stored in a field in the Hand object. The __init__ method should initialize the Hand object to have an empty list of Card objects. The add_card should append a Card object to this list of cards. The __str__ method should return a string representation of a Hand object in a human-readable form.For help in implementing the __str__ method, refer back to the solution to question four in the Practice Exercises for week 5a. Remember to use the string method for Card objects to convert each card in the hand's list of cards into a string. (Don't convert a Card object into a string in add_card to make your string method work.) Once you have implemented the Hand class, test it using the provided testing template.

    Implement the methods for the Deck class listed in the mini-project template. We suggest modeling a deck of cards as list of cards. You can generate this list using a pair of nested for loops or a list comprehension. Remember to use the Card initializer to create your cards. Use random.shuffle() to shuffle this deck of cards. Once you have implemented the Deck class, test your Deck class using the provided testing template. Remember that the deck is randomized after shuffling, so the output of the testing template should match the output in the comments in form but not in exact value.

    Implement the handler for a "Deal" button that shuffles the deck and deals the two cards to both the dealer and the player. The event handler deal for this button should shuffle the deck (stored as a global variable), create new player and dealer hands (stored as global variables), and add two cards to each hand. To transfer a card from the deck to a hand, you should use the deal_card method of the Deck class and the add_card method of Hand class in combination. The resulting hands should be printed to the console with an appropriate message indicating which hand is which.

    Implement the get_value method for the Hand class. You should use the provided VALUE dictionary to look up the value of a single card in conjunction with the logic explained in the video lecture for this project to compute the value of a hand. Once you have implemented the get_value method, test it using the provided testing template .
    Implement the handler for a "Hit" button. If the value of the hand is less than or equal to 21, clicking this button adds an extra card to player's hand. If the value exceeds 21 after being hit, print "You have busted".

    Implement the handler for a "Stand" button. If the player has busted, remind the player that they have busted. Otherwise, repeatedly hit the dealer until his hand has value 17 or more (using a while loop). If the dealer busts, let the player know. Otherwise, compare the value of the player's and dealer's hands. If the value of the player's hand is less than or equal to the dealer's hand, the dealer wins. Otherwise the player has won. Remember the dealer wins ties in our version.



Phase two

In the second phase of your implementation, you will add five features. For those involving drawing with global variables, remember to initialize these variables to appropriate values (like creating empty hands for the player and dealer) just before starting the frame.

    Implement your own draw method for the Hand class using the draw method of the Card class. We suggest drawing a hand as a horizontal sequence of cards where the parameter pos is the position of the upper left corner of the leftmost card. To simplify your code, you may assume that only the first five cards of a player's hand need to be visible on the canvas.
    Replace printing in the console by drawing text messages on the canvas. We suggest adding a global outcome string that is drawn in the draw handler using draw_text. These messages should prompt the player to take some require action and have a form similar to "Hit or stand?" and "New deal?". Also, draw the title of the game, "Blackjack", somewhere on the canvas.
    Add logic using the global variable   in_play that keeps track of whether the player's hand is still being played. If the round is still in play, you should draw an image of the back of a card (provided in the template) over the dealer's first (hole) card to hide it. Once the round is over, the dealer's hole card should be displayed.
    Add a score counter that keeps track of wins and losses for your Blackjack session. In the simplest case (see our demo), the program displays wins minus losses. However, you are welcome to implement a more sophisticated betting/scoring system.
    Modify the logic for the "Deal" button to create and shuffle a new deck (or restock and shuffle an existing deck) each time the "Deal" button is clicked. This change avoids the situation where the deck becomes empty during play.
    Finally, modify the deal\color{red}{\verb|deal|}deal function such that, if the "Deal" button is clicked during the middle of a round, the program reports that the player lost the round and updates the score appropriately.


Grading rubric - 18 pts total (scaled to 100)
- 1 pt - The program displays the title "Blackjack" on the canvas.
- 1 pt - The program displays 3 buttons ("Deal", "Hit" and "Stand") in the control area.
- 2 pts - The program graphically displays the player's hand using card images. (1 pt if text is displayed in the console instead)
- 2 pts - The program graphically displays the dealer's hand using card images. Displaying both of the dealer's cards face up is allowable when evaluating this bullet. (1 pt if text displayed in the console instead)
- 1 pt - The dealer's hole card is hidden until the current round is over. After the round is over, it is displayed.
- 2 pts - Pressing the "Deal" button deals out two cards each to the player and dealer. (1 pt per player)
- 1 pt - Pressing the "Deal" button in the middle of the round causes the player to lose the current round.
- 1 pt - Pressing the "Hit" button deals another card to the player.
- 1 pt - Pressing the "Stand" button deals cards to the dealer as necessary.
- 1 pt - The program correctly recognizes the player busting.
- 1 pt - The program correctly recognizes the dealer busting.
- 1 pt - The program correctly computes hand values and declares a winner. Evaluate based on messages.
- 2 pts - The program accurately prompts the player for an action with messages similar to "Hit or stand?" and "New deal?". (1 pt per message)
- 1 pt - The program implements a scoring system that correctly reflects wins and losses. Please be generous in evaluating this item.

